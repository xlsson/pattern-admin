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
        <div>
            <p data-testid="loggedInUserLabel">Inloggad som: {props.loggedInUser}</p>
            <a onClick={logOut} className="pointer-cursor" data-testid="logoutLink">Logga ut</a>
        </div>
    );
}

export default LoggedInBox;
