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

    const emptyUser = { firstname: "", lastname: "", city: "", email: "",
        phone: "", payment_method: "unknown", card_information: "", balance: 0, account_status: "deleted" };

    const [trips, setTrips] = useState([]);

    const [user, setUser] = useState(emptyUser);

    const [changes, setChanges] = useState({});
    const [name, setName] = useState("");


    useEffect(() => {
        getUser(userId);
        getTrips(userId);
    }, []);

    async function getUser(userId) {
        const data = await props.api.getUsers(userId);

        setUser(data.user);
        setName(`${data.user.firstname} ${data.user.lastname}`);
    }

    async function getTrips(userId) {
        const data = await props.api.getTrips(userId);
        setTrips(data.trips);
    }

    function updateUser(value, property) {
        const tempUser = { ...user };
        tempUser[property] = value;
        setUser(tempUser);

        const tempChanges = { ...changes };
        tempChanges[property] = value;
        setChanges(tempChanges);
    }

    async function saveChanges() {

        const card = changes.card_information;
        if (card && (card.length < 13 || card.length > 16)) {
            return props.setMessage({
                text: "Ej sparat. Kortnumret måste vara 13-16 siffror långt",
                error: true
            });
        }

        console.log("save", changes);
        const data = await props.api.updateUser(userId, changes);
        const message = props.utils.createFlashMessage(data, "updateUser");

        setName(`${user.firstname} ${user.lastname}`);
        props.setMessage(message);
        setChanges({});
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
                                value={user.firstname}
                                onChange={(e) => updateUser(e.target.value, "firstname")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Efternamn</strong></td>
                        <td>
                            <input
                                type="text"
                                value={user.lastname}
                                onChange={(e) => updateUser(e.target.value, "lastname")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Favoritstad</strong></td>
                        <td>
                            <select value={user.city}
                                onChange={(e) => updateUser(e.target.value, "city")}>
                                    {props.citiesArray.map((city, i) => (
                                        <option
                                            key={i}
                                            value={city._id}>
                                                {city.name}
                                            </option>
                                    ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>E-mail</strong></td>
                        <td>
                            <input
                                type="text"
                                value={user.email}
                                onChange={(e) => updateUser(e.target.value, "email")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Telefon</strong></td>
                        <td>
                            <input
                                type="text"
                                value={user.phone}
                                onChange={(e) => updateUser(e.target.value, "phone")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Betalmetod</strong></td>
                        <td>
                            <select
                                onChange={(e) => updateUser(e.target.value, "payment_method")}
                                value={user.payment_method}
                                disabled={isNaN(parseInt(user.card_information))}>
                                <option value="monthly">Abonnemang</option>
                                <option value="refill">Refill</option>
                                <option value="unknown">Ej vald</option>
                            </select>
                            {isNaN(parseInt(user.card_information)) && "För att ändra, ange först kortnummer"}
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Kortnummer</strong></td>
                        <td>
                            <input
                                type="number"
                                value={isNaN(parseInt(user.card_information)) ? "" : user.card_information}
                                onChange={(e) => updateUser(e.target.value, "card_information")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Saldo</strong></td>
                        <td>
                            <input
                                type="number"
                                value={user.balance}
                                onChange={(e) => updateUser(e.target.value, "balance")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Status</strong></td>
                        <td>
                            <select
                                onChange={(e) => updateUser(e.target.value, "account_status")}
                                value={user.account_status}>
                                <option value="active">Aktiv</option>
                                <option value="deleted">Inaktiv</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" className="text-align-right">
                            <button type="button" onClick={saveChanges}>Spara ändringar</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Trips utils={props.utils} trips={trips} />
        </div>
    );
}

export default User;
