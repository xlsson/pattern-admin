import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function UsersTable() {
    let [users, setUsers] = useState([]);

    async function getUsers() {
        users = await api.getUsers();
        setUsers(users);
    };

    useEffect(() => { getUsers(); }, []);

    return (
        <div>
            <h1>Alla kunder (stadsoberoende)</h1>
            <table>
                <>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>name</th>
                        <th>surname</th>
                        <th>email</th>
                        <th>balance</th>
                        <th>account_status</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, i) => (
                    <tr key={i}>
                        <>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
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
