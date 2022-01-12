import React from 'react';
import PropTypes from "prop-types";
import BikeEndMaintenance from './BikeEndMaintenance';
import BikePopupMoveForm from './BikePopupMoveForm';

BikePopup.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    bike: PropTypes.object,
    cities: PropTypes.object,
    getBikes: PropTypes.func,
    setMessage: PropTypes.func
};

/**
 * Popup for bike in map
 *
 * @component
 */
function BikePopup(props) {

    const bike = props.bike;
    const chargeStations = props.cities[bike.city_id].charge_stations;

    function renderEndMaintenance() {
        return ( <BikeEndMaintenance
                    api={props.api}
                    utils={props.utils}
                    getBikes={props.getBikes}
                    bike={bike}
                    setMessage={props.setMessage} /> );
    }

    function renderBikePopupMoveForm() {
        return ( <BikePopupMoveForm
                    api={props.api}
                    utils={props.utils}
                    cities={props.cities}
                    getBikes={props.getBikes}
                    bike={bike}
                    chargeStations={chargeStations}
                    setMessage={props.setMessage} /> );
    }

    function renderStatusInfo() {
        if (!bike.charge_id) { return "Uthyrd"; }

        let status;
        if (bike.battery_status < 50) { status = `laddning`; }
        if (bike.maintenance) { status = `underhåll`; }
        if (bike.maintenance && (bike.battery_status < 50)) {
            status = `laddning, underhåll`;
        }

        return ( <>
                <span className="bike-info-label">Service pågår:</span>
                <span>{status}</span>
            </> );
    }

    function showPositionInfo() {
        let position = "ej på station";
        if (bike.charge_id) { position = `Laddningsstation`; }
        if (bike.parking_id) { position = `Parkeringsstation`; }
        return position;
    }

    return (
        <div className="bike-popup">
            <div className="bike-icon-wrapper">
                <span className="material-icons" data-testid="scooter-icon">
                    electric_scooter
                </span>
                <div className="bike-icon-text" data-testid="status">
                    {(bike.bike_status === "available") ? "Ledig" : "Upptagen"}
                </div>
            </div>
            <div className="bike-info" data-testid="maintenance">
                {(bike.bike_status !== "available") && renderStatusInfo()}
            </div>
            <div className="bike-info">
                <span className="bike-info-label">Id:</span>
                <span>{bike._id}</span>
            </div>
            <div className="bike-info" data-testid="position">
                <span className="bike-info-label">Position:</span>
                <span>{showPositionInfo()}</span>
            </div>
            <div className="bike-info" data-testid="batteryStatus">
                <span className="bike-info-label">Batterinivå:</span>
                <span>{parseInt(bike.battery_status)}</span>
            </div>
            {(bike.bike_status === "available") && renderBikePopupMoveForm()}
            {((bike.maintenance) && (bike.battery_status > 50)) && renderEndMaintenance()}
        </div>
    );
}

export default BikePopup;
