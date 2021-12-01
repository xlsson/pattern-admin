import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function User(props) {
    const userId = props.params._id;

    let [user, setUser] = useState({});
    let [trips, setTrips] = useState([]);

    function handleInput(value, prop) {
        let updatedUser = { ...user };
        updatedUser[prop] = value;

        if (prop === "balance") {
            updatedUser.balance = (value.length > 0) ? parseInt(value) : 0;
        }

        setUser(updatedUser);
    }

    function toggleAccount() {
        let newStatus = (user.account_status === "active") ? "inactive" : "active";
        let updatedUser = { ...user };
        updatedUser.account_status = newStatus;
        setUser(updatedUser);
    }

    function saveChanges() {
        setUser(user);
        api.updateUser(user);
    }

    async function getData() {
        let userResult = await api.getUsers(userId);
        let tripsResult = await api.getTrips(userId);
        userResult = userResult[0];
        setUser(userResult);
        setTrips(tripsResult);
    };

    useEffect(() => { getData(); }, [userId]);

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
