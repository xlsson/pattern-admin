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
                {(props.api.token.length > 0) && "Inloggad: "} <strong>{props.loggedInUser}</strong>
            </p>
            <button
                onClick={logOut}
                className="pointer-cursor">Logga ut</button>
        </div>
    );
}

export default LoggedInBox;
