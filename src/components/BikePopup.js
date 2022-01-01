import React from 'react';
import PropTypes from "prop-types";
import BikeEndMaintenance from './BikeEndMaintenance';
import BikePopupMoveForm from './BikePopupMoveForm';

BikePopup.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    bike: PropTypes.object,
    cities: PropTypes.object,
    getBikes: PropTypes.func
};

function BikePopup(props) {

    const bike = props.bike;
    const chargeStations = props.cities[bike.city_id].charge_stations;

    function renderEndMaintenance() {
        return ( <BikeEndMaintenance
                    api={props.api}
                    getBikes={props.getBikes}
                    bike={bike} /> );
    }

    function renderBikePopupMoveForm() {
        return ( <BikePopupMoveForm
                    api={props.api}
                    utils={props.utils}
                    cities={props.cities}
                    getBikes={props.getBikes}
                    bike={bike}
                    chargeStations={chargeStations} /> );
    }

    return (
        <div className="bike-popup">
            <div>
                <span className="material-icons" data-testid="scooter-icon">electric_scooter</span>
                {(bike.bike_status === "available") ? "Ledig" : "Upptagen" }
            </div>
            <div data-testid="chargeStation">{(bike.charge_id) && "På laddningsstation"}</div>
            <div data-testid="status">Status: {bike.bike_status}</div>
            <div data-testid="batteryStatus">Batterinivå: {bike.battery_status}</div>
            <div data-testid="maintenance">{(bike.maintenance) && "Genomgår underhåll"}</div>
            {(bike.bike_status === "available") && renderBikePopupMoveForm()}
            {(bike.maintenance && (bike.battery_status === 100)) && renderEndMaintenance()}
        </div>
    );
}

export default BikePopup;
