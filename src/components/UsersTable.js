import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

UsersTable.propTypes = {
    api: PropTypes.object,
    cities: PropTypes.object,
    switchView: PropTypes.func
};

function UsersTable(props) {
    let [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const data = await props.api.getUsers("all");
        setUsers(data.users);
    }

    function handleClick(i) {
        props.switchView("user", { _id: users[i]._id });
    }

    return (
        <div>
            <h1>Kunder</h1>
            <p>(Ej stadsspecifikt)</p>
            <table>
                <>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Namn</th>
                        <th>Status</th>
                        <th>E-mail</th>
                        <th>Saldo</th>
                        <th>Betalmetod</th>
                        <th>Favoritstad</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, i) => (
                    <tr className="pointer-cursor" key={i} onClick={() => handleClick(i)}>
                        <>
                        <td>{user._id}</td>
                        <td>{user.firstname} {user.lastname}</td>
                        <td>
                            <div className="icon-and-label-wrapper">
                                <span className="material-icons">
                                    {(user.account_status === "active") ? "check" : "close"}
                                </span>
                                <div>{(user.account_status === "active") ? "Aktiv" : "Inaktiv"}</div>
                            </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.balance} kr</td>
                        <td>
                            <div className="icon-and-label-wrapper">
                                <span className="material-icons">
                                    {(user.payment_method === "monthly") ? "event" : "payments"}
                                </span>
                                <div>{(user.payment_method === "monthly") ? "Abonnemang" : "Refill"}</div>
                            </div>
                        </td>
                        <td>{props.cities[user.city].name}</td>
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
