import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Trips from './Trips.js';

import api from '../functions/api.js';

User.propTypes = {
  user: PropTypes.object
};

function User(props) {
    const userId = props.user._id;

    let [user, setUser] = useState({});
    let [name, setName] = useState("")
    let [changes, setChanges] = useState({});
    let [trips, setTrips] = useState([]);

    useEffect(() => {
        api.getUsers(userId, afterGetUsers);
        api.getTrips(userId, afterGetTrips);
    }, [userId]);

    function updateName(userData) {
        let fullname = userData.firstname + " " + userData.lastname;
        setName(fullname);
    }

    function afterGetUsers(data) {
        setUser(data.user);
        updateName(data.user);
    }

    function afterGetTrips(data) { setTrips(data.trips); }

    function handleInput(value, prop) {
        let updatedUser = { ...user };
        updatedUser[prop] = value;

        let updatedChanges = { ...changes };
        updatedChanges[prop] = value;

        if (prop === "balance") {
            updatedUser.balance = (value.length > 0) ? parseInt(value) : 0;
            updatedChanges.balance = (value.length > 0) ? parseInt(value) : 0;
        }

        setChanges(updatedChanges);
        setUser(updatedUser);
    }

    function toggleAccount(event) {
        let newStatus = event.target.value;
        let updatedUser = { ...user };
        updatedUser.account_status = newStatus;
        setUser(updatedUser);
    }

    function saveChanges() {
        api.updateUser(userId, changes, afterSaveChanges);
    }

    function afterSaveChanges(data) {
        updateName(user);
        console.log(data);
    }

    return (
        <div>
            <h1>Administrera kund: {name}</h1>
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
                        <td>defaultstad</td>
                        <td>{user.city}</td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td>{user.email}</td>
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
                        <td>
                            <select
                                onBlur={(e) => toggleAccount(e)}
                                defaultValue={user.account_status}>
                                <option value={"active"}>Active</option>
                                <option value={"deleted"}>Deleted</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
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
