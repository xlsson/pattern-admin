import React from 'react';
import PropTypes from "prop-types";

FlashMessage.propTypes = {
    message: PropTypes.object,
    setMessage: PropTypes.func
};

/**
 * Flash message modal
 *
 * @component
 */
function FlashMessage(props) {
    const text = props.message.text;
    const error = props.message.error;
    const borderColor = ((error) ? "error-border" : "");
    const iconColor = ((error) ? "error-color" : "");

    return (
        <div className="flash-modal-background">
            <div className="modal-box">
                <div className={"flash-wrapper " + borderColor} data-testid="flash-border">
                    <div className="symbol-text-wrapper">
                        <span className={"material-icons " + iconColor}>
                            {(error) ? "error" : "info"}
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
