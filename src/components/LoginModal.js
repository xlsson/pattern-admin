import React, { useState } from 'react';
import PropTypes from "prop-types";

import api from '../functions/api.js';

LoginModal.propTypes = {
    switchView: PropTypes.func
};

function LoginModal(props) {
    console.log("token length: ", api.token.length);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleInput(value, property) {
        if (property === "username") {
            setUsername(value);
            return;
        }
        setPassword(value);
    }

    function confirm() {
        api.login(doAfterConfirm, username, password);
    }

    function doAfterConfirm(data) {
        console.log("after login");
        console.log(data);
        // Add conditional for succesful/unsuccesful login
        props.switchView("overviewMap");
    }

    return (
        <div>
            <h1>Logga in</h1>
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
                            <button type="button" onClick={confirm}>Logga in</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default LoginModal;
