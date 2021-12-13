import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

import api from '../functions/api.js';

UsersTable.propTypes = {
    switchView: PropTypes.func
};

function UsersTable(props) {
    let [users, setUsers] = useState([]);

    useEffect(() => { api.getUsers("all", afterGetUsers); }, []);

    function afterGetUsers(data) { setUsers(data.users); }

    function handleClick(i) {
        props.switchView("user", { _id: users[i]._id });
    }

    return (
        <div>
            <h1>Alla kunder (stadsoberoende)</h1>
            <table>
                <>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>payment_method</th>
                        <th>card_information</th>
                        <th>balance</th>
                        <th>account_status</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, i) => (
                    <tr className="pointer-cursor" key={i} onClick={() => handleClick(i)}>
                        <>
                        <td>{user._id}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.payment_method}</td>
                        <td>{user.card_information}</td>
                        <td>{user.balance}</td>
                        <td>{user.account_status}</td>
                        </>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default UsersTable;
