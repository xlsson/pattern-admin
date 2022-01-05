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

    const [trips, setTrips] = useState([]);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [payment, setPayment] = useState("");
    const [card, setCard] = useState("");
    const [balance, setBalance] = useState(0);
    const [status, setStatus] = useState("");

    const [changes, setChanges] = useState({});
    const [name, setName] = useState("");

    function updateFirstname(value) {
        setFirstname(value);
        setChanges(prevState => ({ ...prevState, firstname: value }));
    }

    function updateLastname(value) {
        setLastname(value);
        setChanges(prevState => ({ ...prevState, lastname: value }));
    }

    function updateCity(value) {
        setCity(value);
        setChanges(prevState => ({ ...prevState, city: value }));
    }

    function updateEmail(value) {
        setEmail(value);
        setChanges(prevState => ({ ...prevState, email: value }));
    }

    function updatePhone(value) {
        setPhone(value);
        setChanges(prevState => ({ ...prevState, phone: value }));
    }

    function updatePayment(value) {
        setPayment(value);
        setChanges(prevState => ({ ...prevState, payment_method: value }));
    }

    function updateCard(value) {
        setCard(value);
        setChanges(prevState => ({ ...prevState, card: value }));
    }

    function updateBalance(value) {
        setBalance(value);
        setChanges(prevState => ({ ...prevState, balance: value }));
    }

    function updateStatus(value) {
        setStatus(value);
        setChanges(prevState => ({ ...prevState, status: value }));
    }

    useEffect(() => {
        getUser(userId);
        getTrips(userId);
    }, []);

    async function getUser(userId) {
        const data = await props.api.getUsers(userId);

        setFirstname(data.user.firstname);
        setLastname(data.user.lastname);
        setCity(data.user.city);
        setEmail(data.user.email);
        setPhone(data.user.phone);
        setPayment((data.user.payment_method === "monthly") ? "monthly" : "refill");
        setCard(data.user.card_information);
        setBalance(data.user.balance);
        setStatus((data.user.account_status === "active") ? "active" : "deleted");

        setName(`${data.user.firstname} ${data.user.lastname}`);
    }

    async function getTrips(userId) {
        const data = await props.api.getTrips(userId);
        setTrips(data.trips);
    }

    async function saveChanges() {
        console.log("save", changes);
        const data = await props.api.updateUser(userId, changes);
        const message = props.utils.createFlashMessage(data, "updateUser");

        setName(`${firstname} ${lastname}`);
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
                                value={firstname}
                                onChange={(e) => updateFirstname(e.target.value)}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Efternamn</strong></td>
                        <td>
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => updateLastname(e.target.value)}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Favoritstad</strong></td>
                        <td>
                            <select value={city}
                                onChange={(e) => updateCity(e.target.value)}>
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
                                value={email}
                                onChange={(e) => updateEmail(e.target.value)}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Telefon</strong></td>
                        <td>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => updatePhone(e.target.value)}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Betalmetod</strong></td>
                        <td>
                            <select
                                onChange={(e) => updatePayment(e.target.value)}
                                value={payment}>
                                <option value="monthly">Abonnemang</option>
                                <option value="refill">Refill</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Kortnummer</strong></td>
                        <td>
                            <input
                                type="text"
                                value={card}
                                onChange={(e) => updateCard(e.target.value)}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Saldo</strong></td>
                        <td>
                            <input
                                type="number"
                                value={balance}
                                onChange={(e) => updateBalance(e.target.value)}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-align-right"><strong>Status</strong></td>
                        <td>
                            <select
                                onChange={(e) => updateStatus(e.target.value)}
                                value={status}>
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
