import React from 'react';
import PropTypes from "prop-types";

import api from '../functions/api.js';

LoggedInBox.propTypes = {
    loggedInUser: PropTypes.string,
    setLoggedInUser: PropTypes.func,
    switchView: PropTypes.func
};

function LoggedInBox(props) {

    function logOut() {
        api.token = "";
        props.setLoggedInUser("");
        props.switchView("loginModal");
    }

    return (
        <div>
        <p>Inloggad som: {props.loggedInUser}</p>
        <a onClick={logOut} className="pointer-cursor">Logga ut</a>
        </div>
    );
}

export default LoggedInBox;
