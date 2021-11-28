import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function User(props) {
    const emptyUser = { name: "", surname: "", email: "", password: "",
        balance: 0, account_status: "" };

    const userId = props.params._id;

    let [user, setUser] = useState(emptyUser);

    async function getUser() {
        user = await api.getUsers(userId);
        setUser(user[0]);
        console.log(user);
    };

    useEffect(() => { getUser(); }, [userId]);

    return (
        <div>
            <h1>{user.name} {user.surname}</h1>
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
                    <tr>
                        <>
                        <td>{userId}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>{user.balance}</td>
                        <td>{user.account_status}</td>
                        </>
                    </tr>
                </tbody>
                </>
            </table>
        </div>
    );
}

export default User;
