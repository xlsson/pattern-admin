import React from 'react';
import PropTypes from "prop-types";

LoggedInBox.propTypes = {
    api: PropTypes.object,
    loggedInUser: PropTypes.string,
    setLoggedInUser: PropTypes.func,
    switchView: PropTypes.func
};

function LoggedInBox(props) {

    function logOut() {
        props.api.token = "";
        props.setLoggedInUser("");
        props.switchView("loginModal");
    }

    return (
        <div className="logged-in-box">
            <p data-testid="loggedInUserLabel">
                {(props.api.token.length > 0) && "Inloggad som "} <strong>{props.loggedInUser}</strong>
            </p>
            <a onClick={logOut} className="pointer-cursor" data-testid="logoutLink">
            <span className="material-icons">exit_to_app</span>
            </a>
        </div>
    );
}

export default LoggedInBox;
