import React, { useState } from 'react';
import PropTypes from "prop-types";

LoginModal.propTypes = {
    api: PropTypes.object,
    switchView: PropTypes.func,
    setLoggedInUser: PropTypes.func
};

/**
 * Table showing all bikes in the database
 *
 * API calls: login()
 *
 * @component
 */
function LoginModal(props) {
    const msg = {
        welcome: "Administratörsinloggning",
        fail: "Fel användarnamn eller lösenord"
    };
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(msg.welcome);

    function handleInput(value, property) {
        if (property === "username") { return setUsername(value); }

        setPassword(value);
    }

    async function attemptLogin() {
        const data = await props.api.login(username, password);
        if (!data.token) { return setMessage(msg.fail); }

        props.setLoggedInUser(username);
        props.switchView("overviewMap");
    }

    return (
        <div className="login-modal-background">
            <div className="modal-box">
                <div className="logo" data-testid="logo">seab.</div>
                <div className="message-wrapper">
                    <span className="material-icons">
                        {(message === msg.welcome) ? "" : "error"}
                    </span>
                    <div>{message}</div>
                </div>
                <table className="column-table">
                    <tbody>
                        <tr>
                            <th>Användarnamn</th>
                            <td>
                                <input
                                    data-testid="fieldUsername"
                                    type="text"
                                    onChange={e => handleInput(e.target.value, "username")}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <th>Lösenord</th>
                            <td>
                                <input
                                    data-testid="fieldPassword"
                                    type="text"
                                    onChange={e => handleInput(e.target.value, "password")}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="text-align-right">
                                <button type="button" onClick={attemptLogin}>Logga in</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LoginModal;
