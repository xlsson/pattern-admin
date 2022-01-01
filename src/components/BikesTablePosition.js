import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

BikesTablePosition.propTypes = {
    bike: PropTypes.object,
    cities: PropTypes.object
};

function BikesTablePosition(props) {
    const bike = props.bike;
    let icon;
    let text;

    if (bike.charge_id) {
        icon = "battery_charging_full";
        text = getStationName("charge", bike.charge_id);
    } else if (bike.parking_id) {
        icon = "local_parking";
        text = getStationName("parking", bike.charge_id);
    } else {
        icon = "wrong_location";
        text = "Ej på station";
    }

    function getStationName(type, id) {
        const stationType = `${type}_stations`;
        const stations = props.cities[bike.city_id][stationType];
        let stationName;
        stations.forEach((station) => {
            if (station._id === id) {
                console.log("match", station.name);
                stationName = station.name;
            }
        });
        return stationName;
    }

    return (
        <div className="bikes-table-position-wrapper">
            <span className="material-icons">{icon}</span>
            <div>{text}</div>
        </div>
    );
}

export default BikesTablePosition;
