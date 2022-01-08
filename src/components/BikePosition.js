import React from 'react';
import PropTypes from "prop-types";

BikePosition.propTypes = {
    utils: PropTypes.object,
    bike: PropTypes.object,
    cities: PropTypes.object
};

function BikePosition(props) {
    const bike = props.bike;
    let icon;
    let text;

    if (bike.charge_id) {
        icon = "battery_charging_full";
        text = props.utils.getStationName("charge", bike, props.cities);
    } else if (bike.parking_id) {
        icon = "local_parking";
        text = props.utils.getStationName("parking", bike, props.cities);
    } else {
        icon = "wrong_location";
        text = "Ej på station";
    }

    return (
        <div className="icon-and-label-wrapper">
            <span className="material-icons" data-testid="position-icon">{icon}</span>
            <div data-testid="position-text">{text}</div>
        </div>
    );
}

export default BikePosition;
