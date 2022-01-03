import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Trips from './Trips.js';

User.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    cities: PropTypes.object,
    citiesArray: PropTypes.array,
    user: PropTypes.object,
    setMessage: PropTypes.func
};

function User(props) {
    const userId = props.user._id;

    let [user, setUser] = useState(props.user);
    let [name, setName] = useState("")
    let [changes, setChanges] = useState({});
    let [trips, setTrips] = useState([]);
    let [cityName, setCityName] = useState("");

    useEffect(() => {
        getUsers(userId);
        getTrips(userId);
    }, [userId]);

    function updateName(userData) {
        let fullname = userData.firstname + " " + userData.lastname;
        setName(fullname);
    }

    async function getUsers(userId) {
        const data = await props.api.getUsers(userId);
        setUser(data.user);
        updateName(data.user);
        setCityName(props.cities[data.user.city].name);
    }

    async function getTrips(userId) {
        const data = await props.api.getTrips(userId);
        setTrips(data.trips);
    }

    function handleInput(value, prop) {
        const updatedUser = { ...user };
        updatedUser[prop] = value;

        const updatedChanges = { ...changes };
        updatedChanges[prop] = value;

        if (prop === "balance") {
            updatedUser.balance = (value.length > 0) ? parseInt(value) : 0;
            updatedChanges.balance = (value.length > 0) ? parseInt(value) : 0;
        }

        setChanges(updatedChanges);
        setUser(updatedUser);
    }

    async function saveChanges() {
        const data = await props.api.updateUser(userId, changes);
        const message = props.utils.createFlashMessage(data, "updateUser");

        updateName(user);
        setChanges({});
        props.setMessage(message);
    }

    return (
        <div>
            <h1>{name}</h1>
            <table>
                <tbody>
                    <tr>
                        <td className="text-align-right"><strong>Id</strong></td>
                        <td>{userId}</td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Förnamn</strong></td>
                        <td>
                            <input
                                type="text"
                                value={user.firstname || ""}
                                onChange={e => handleInput(e.target.value, "firstname")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Efternamn</strong></td>
                        <td>
                            <input
                                type="text"
                                value={user.lastname || ""}
                                onChange={e => handleInput(e.target.value, "lastname")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Favoritstad</strong></td>
                        <td>
                            <div className="icon-and-label-wrapper">
                                <div>{cityName}</div>
                                <select
                                    onBlur={(e) => handleInput(e.target.value, "city")}
                                    defaultValue={props.user.city}>
                                        {props.citiesArray.map((city, i) => (
                                            <option
                                                key={i}
                                                value={city._id}>
                                                    {city.name}
                                                </option>
                                        ))}
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>E-mail</strong></td>
                        <td>
                            <input
                                type="text"
                                value={user.email || ""}
                                onChange={e => handleInput(e.target.value, "email")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Telefon</strong></td>
                        <td>
                            <input
                                type="text"
                                value={user.phone || ""}
                                onChange={e => handleInput(e.target.value, "phone")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Betalmetod</strong></td>
                        <td>
                            <div className="icon-and-label-wrapper">
                                <span className="material-icons">
                                    {(user.payment_method === "monthly") ? "event" : "payments"}
                                </span>
                                <div>{(user.payment_method === "monthly") ? "Abonnemang" : "Refill"}</div>
                                <select
                                    onBlur={(e) => handleInput(e.target.value, "payment_method")}
                                    defaultValue={user.payment_method || ""}>
                                    <option value={user.payment_method}></option>
                                    <option value="monthly">Abonnemang</option>
                                    <option value="refill">Refill</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Kortnummer</strong></td>
                        <td>
                            <input
                                type="text"
                                value={user.card_information || ""}
                                onChange={e => handleInput(e.target.value, "card_information")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Saldo</strong></td>
                        <td>
                            <input
                                type="number"
                                value={user.balance || 0}
                                onChange={e => handleInput(e.target.value, "balance")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Status</strong></td>
                        <td>
                            <div className="icon-and-label-wrapper">
                                <span className="material-icons">
                                    {(user.account_status === "active") ? "check" : "close"}
                                </span>
                                <div>{(user.account_status === "active") ? "Aktiv" : "Inaktiv"}</div>
                                <select
                                    onBlur={(e) => handleInput(e.target.value, "account_status")}
                                    defaultValue={user.account_status || ""}>
                                    <option value={user.account_status}></option>
                                    <option value="active">Aktiv</option>
                                    <option value="deleted">Inaktiv</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="text-align-right">
                            <button type="button" onClick={saveChanges}>Spara ändringar</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Trips trips={trips} />
        </div>
    );
}

export default User;
