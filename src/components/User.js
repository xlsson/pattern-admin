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
    const _user = props.user.user;
    const userId = _user._id;

    const [trips, setTrips] = useState([]);
    const [user, setUser] = useState(_user);
    const [changes, setChanges] = useState({});
    const [name, setName] = useState("");

    useEffect(() => {
        setName(`${_user.firstname} ${_user.lastname}`);
        getTrips(userId);
    }, []);

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

        const data = await props.api.updateUser(userId, changes);
        const message = props.utils.createFlashMessage(data, "updateUser");

        setName(`${user.firstname} ${user.lastname}`);
        props.setMessage(message);
        setChanges({});
    }

    return (
        <div>
            <h1>{name}</h1>
            <table className="column-table">
                <tbody>
                    <tr>
                        <th scope="col">Id</th>
                        <td>{userId}</td>
                    </tr>
                    <tr>
                        <th scope="col">Förnamn</th>
                        <td>
                            <input
                                data-testid="firstname-input"
                                type="text"
                                value={user.firstname}
                                onChange={(e) => updateUser(e.target.value, "firstname")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Efternamn</th>
                        <td>
                            <input
                                type="text"
                                value={user.lastname}
                                onChange={(e) => updateUser(e.target.value, "lastname")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Favoritstad</th>
                        <td>
                            <select value={user.city}
                                onChange={(e) => updateUser(e.target.value, "city")}>
                                    {props.citiesArray.map((city, i) => (
                                        <option key={i} value={city._id}>{city.name}</option>
                                    ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">E-mail</th>
                        <td>
                            <input
                                type="text"
                                value={user.email}
                                onChange={(e) => updateUser(e.target.value, "email")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Telefon</th>
                        <td>
                            <input
                                type="text"
                                value={user.phone}
                                onChange={(e) => updateUser(e.target.value, "phone")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Betalmetod</th>
                        <td>
                            <select
                                data-testid="payment-dropdown"
                                onChange={(e) => updateUser(e.target.value, "payment_method")}
                                value={user.payment_method}
                                disabled={isNaN(parseInt(user.card_information))}>
                                <option value="monthly">Abonnemang</option>
                                <option value="refill">Refill</option>
                                <option value="unknown">{isNaN(parseInt(user.card_information)) ? "Ange kortnummer" : "Ej vald" }</option>
                            </select>

                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Kortnummer</th>
                        <td>
                            <input
                                type="number"
                                value={isNaN(parseInt(user.card_information)) ? "" : user.card_information}
                                onChange={(e) => updateUser(e.target.value, "card_information")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Saldo</th>
                        <td>
                            <input
                                type="number"
                                value={user.balance}
                                onChange={(e) => updateUser(e.target.value, "balance")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Status</th>
                        <td>
                            <select
                                onChange={(e) => updateUser(e.target.value, "account_status")}
                                value={user.account_status}>
                                <option value="active">Aktiv</option>
                                <option value="deleted">Inaktiv</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="text-align-right">
                <button type="button" onClick={saveChanges}>Spara ändringar</button>
            </div>

            <Trips utils={props.utils} trips={trips} />
        </div>
    );
}

export default User;
