import React, { useState, useEffect } from 'react';
import Trips from './Trips.js';

import api from '../functions/api.js';

function User(props) {
    const userId = props.params._id;

    let [user, setUser] = useState({});
    let [trips, setTrips] = useState([]);

    useEffect(() => {
        api.getUsers(userId, afterGetUsers);
        api.getTrips(userId, afterGetTrips);
    }, [userId]);

    function afterGetUsers(data) { setUser(data.user); }
    function afterGetTrips(data) { setTrips(data.trips); }

    function handleInput(value, prop) {
        let updatedUser = { ...user };
        updatedUser[prop] = value;

        if (prop === "balance") {
            updatedUser.balance = (value.length > 0) ? parseInt(value) : 0;
        }
        setUser(updatedUser);
    }

    function toggleAccount() {
        let newStatus = (user.account_status === "active") ? "deleted" : "active";
        let updatedUser = { ...user };
        updatedUser.account_status = newStatus;
        setUser(updatedUser);
    }

    function saveChanges() {
        setUser(user);
        api.updateUser(user);
    }



    return (
        <div>
            <h1>Administrera kund: {user.firstname} {user.lastname}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>_id</td>
                        <td>{userId}</td>
                    </tr>
                    <tr>
                        <td>firstname</td>
                        <td>
                            <input
                                type="text"
                                value={user.firstname}
                                onChange={e => handleInput(e.target.value, "firstname")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>lastname</td>
                        <td>
                            <input
                                type="text"
                                value={user.lastname}
                                onChange={e => handleInput(e.target.value, "lastname")}>
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
                                value={user.phone}
                                onChange={e => handleInput(e.target.value, "phone")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>payment_method</td>
                        <td>
                            <input
                                type="text"
                                value={user.payment_method}
                                onChange={e => handleInput(e.target.value, "payment_method")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>card_information</td>
                        <td>
                            <input
                                type="text"
                                value={user.card_information}
                                onChange={e => handleInput(e.target.value, "card_information")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>balance</td>
                        <td>
                            <input
                                type="number"
                                value={user.balance}
                                onChange={e => handleInput(e.target.value, "balance")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>account_status</td>
                        <td>{user.account_status}
                            <input
                                type="checkbox"
                                defaultChecked={(user.account_status === "active") ? true : false}
                                onClick={toggleAccount}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button type="button" onClick={saveChanges}>Spara ändringar</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Trips
                user={user}
                trips={trips} />
        </div>
    );
}

export default User;
