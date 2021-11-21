import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function UsersTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(api.getUsers());
    }, [users]);

    return (
        <div>
            <table>
                <>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>name</th>
                        <th>balance</th>
                        <th>deleted</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, i) => (
                    <tr key={i}>
                        <>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.balance}</td>
                        <td>{user.deleted}</td>
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
