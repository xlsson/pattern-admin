import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

UsersTable.propTypes = {
    api: PropTypes.object,
    cities: PropTypes.object,
    switchView: PropTypes.func
};

/**
 * View showing all users
 *
 * API calls: getUsers()
 *
 * @component
 */
function UsersTable(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => { getUsers(); }, []);

    async function getUsers() {
        const data = await props.api.getUsers("all");
        setUsers(data.users);
    }

    function handleClick(i) {
        props.switchView("user", { user: users[i] });
    }

    function getPaymentIcon(value) {
        if (value === "monthly") { return ["event", "Abonnemang"]; }
        if (value === "refill") { return ["payments", "Refill"]; }
        return ["not_interested", "Ej valt"];
    }

    return (
        <div>
            <h1>Kunder</h1>
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
                    <tr data-testid="user-row"
                        className="pointer-cursor" key={i}
                        onClick={() => handleClick(i)}>
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
                        <td>{parseInt(user.balance)} kr</td>
                        <td>
                            <div className="icon-and-label-wrapper">
                                <span className="material-icons">
                                    {getPaymentIcon(user.payment_method)[0]}
                                </span>
                                <div>{getPaymentIcon(user.payment_method)[1]}</div>
                            </div>
                        </td>
                        <td>{(user.city) ? props.cities[user.city].name : "Ingen vald"}</td>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default UsersTable;
