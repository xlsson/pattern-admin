import React, { useState } from 'react';
import PropTypes from "prop-types";

LoginModal.propTypes = {
    api: PropTypes.object,
    switchView: PropTypes.func,
    setLoggedInUser: PropTypes.func
};

function LoginModal(props) {
    const msg = {
        welcome: "Ange användarnamn och lösenord för att logga in",
        fail: "Fel användarnamn eller lösen. Försök igen."
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

        props.switchView("overviewMap");
        props.setLoggedInUser(username);
    }

    return (
        <div className="modal-background">
            <div className="modal-box">
                <h1>Administrativt gränssnitt</h1>
                <p>{message}</p>
                <table>
                    <tbody>
                        <tr>
                            <td>Användarnamn</td>
                            <td>
                                <input
                                    type="text"
                                    onChange={e => handleInput(e.target.value, "username")}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td>Lösenord</td>
                            <td>
                                <input
                                    type="text"
                                    onChange={e => handleInput(e.target.value, "password")}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
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
