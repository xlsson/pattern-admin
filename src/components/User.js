import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function User(props) {
    const userId = props.params._id;

    let [user, setUser] = useState({});
    let [trips, setTrips] = useState([]);

    let [firstname, setFirstname] = useState("");
    let [lastname, setLastname] = useState("");
    let [phone, setPhone] = useState("");
    let [paymentMethod, setPaymentMethod] = useState("");
    let [cardInformation, setCardInformation] = useState("");
    let [balance, setBalance] = useState("");
    let [accountStatus, setAccountStatus] = useState("");

    function toggleAccount() {
        let newStatus = (accountStatus === "active") ? "inactive" : "active";
        setAccountStatus(newStatus);
    }

    function saveChanges() {
        let updatedUser = {
            _id: userId,
            firstname: firstname,
            lastname: lastname,
            email: user.email,
            password: user.password,
            phone: phone,
            payment_method: paymentMethod,
            card_information: cardInformation,
            balance: balance,
            account_status: accountStatus
        };
        setUser(updatedUser);
        api.updateUser(updatedUser);
    }

    async function getData() {
        user = await api.getUsers(userId);
        trips = await api.getTrips(userId);
        setUser(user[0]);
        setFirstname(user[0].firstname);
        setLastname(user[0].lastname);
        setPhone(user[0].phone);
        setPaymentMethod(user[0].payment_method);
        setCardInformation(user[0].card_information);
        setBalance(user[0].balance);
        setAccountStatus(user[0].account_status);
        setTrips(trips);
    };

    useEffect(() => { getData(); }, [userId]);

    return (
        <div>
            <h1>Administrera kund: {user.firstname} {user.lastname}</h1>
            <table>
                <tr>
                    <td>_id</td>
                    <td>{userId}</td>
                </tr>
                <tr>
                    <td>firstname</td>
                    <td>
                        <input
                            type="text"
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td>lastname</td>
                    <td>
                        <input
                            type="text"
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td>email</td>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <td>password</td>
                    <td>{user.password}</td>
                </tr>
                <tr>
                    <td>phone</td>
                    <td>
                        <input
                            type="text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td>payment_method</td>
                    <td>
                        <input
                            type="text"
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td>card_information</td>
                    <td>
                        <input
                            type="text"
                            value={cardInformation}
                            onChange={e => setCardInformation(e.target.value)}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td>balance</td>
                    <td>
                        <input
                            type="text"
                            value={balance}
                            onChange={e => setBalance(e.target.value)}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td>account_status</td>
                    <td>{accountStatus}
                        <input
                            type="checkbox"
                            checked={(accountStatus === "active") ? true : false}
                            onClick={toggleAccount}>
                        </input>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button type="button" onClick={saveChanges}>Spara ändringar</button>
                    </td>
                </tr>
            </table>

            <h2>{user.firstname} {user.lastname}s resor</h2>
            <table>
                <>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>user_id</th>
                        <th>bike_id</th>
                        <th>city</th>
                        <th>start_time</th>
                        <th>stop_time</th>
                        <th>start_coordinates</th>
                        <th>stop_coordinates</th>
                        <th>average_speed</th>
                        <th>distance</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                {trips.map((trip, i) => (
                    <tr key={i}>
                        <>
                        <td>{trip._id}</td>
                        <td>{trip.user_id}</td>
                        <td>{trip.bike_id}</td>
                        <td>{trip.city}</td>
                        <td>{trip.start_time}</td>
                        <td>{trip.stop_time}</td>
                        <td>{trip.start_coordinates.lat}, {trip.start_coordinates.long}</td>
                        <td>{trip.stop_coordinates.lat}, {trip.stop_coordinates.long}</td>
                        <td>{trip.average_speed}</td>
                        <td>{trip.distance}</td>
                        <td>{trip.price}</td>
                        </>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default User;
