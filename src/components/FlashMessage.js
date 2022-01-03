import React from 'react';
import PropTypes from "prop-types";

FlashMessage.propTypes = {
    message: PropTypes.object,
    setMessage: PropTypes.func
};

function FlashMessage(props) {
    const text = props.message.text;
    const error = props.message.error;
    const borderColor = ((error) ? "error-border" : "");
    const iconColor = ((error) ? "error-color" : "");

    return (
        <div className="flash-modal-background">
            <div className="modal-box">
                <div className={"flash-wrapper " + borderColor}>
                    <div className="symbol-text-wrapper">
                        <span className={"material-icons " + iconColor}>
                            {(error) ? "error" : "check"}
                        </span>
                        <div className="text">{text}</div>
                        <button type="button" onClick={() => props.setMessage(null)}>Stäng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlashMessage;
