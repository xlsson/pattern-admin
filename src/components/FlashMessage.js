import React from 'react';
import PropTypes from "prop-types";

FlashMessage.propTypes = {
    message: PropTypes.object
};

function FlashMessage(props) {
    const text = props.message.text;
    const warning = props.message.warning;
    const borderColor = ((warning) ? "warning-border" : "");
    const iconColor = ((warning) ? "warning-color" : "");

    return (
        <div className="flash-modal-background">
            <div className="modal-box">
                <div className={"flash-wrapper " + borderColor}>
                    <div className="symbol-text-wrapper">
                        <span className={"material-icons " + iconColor}>
                            {(warning) ? "error" : "check"}
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
