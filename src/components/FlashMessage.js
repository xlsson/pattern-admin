import React from 'react';
import PropTypes from "prop-types";

FlashMessage.propTypes = {
    message: PropTypes.string
};

function FlashMessage(props) {
    const message = props.message;

    return (
        <div className="flash-modal-background">
            <div className="modal-box">
                <div className="flash-wrapper">
                    <p>{message}</p>
                    <button type="button" onClick={() => props.setMessage(null)}>Stäng</button>
                </div>
            </div>
        </div>
    );
}

export default FlashMessage;
