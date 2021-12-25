import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import BikeEndMaintenance from './BikeEndMaintenance';
import BikePopupMoveForm from './BikePopupMoveForm';

BikePopup.propTypes = {
    api: PropTypes.object,
    bike: PropTypes.object,
    mapInstance: PropTypes.object,
    cities: PropTypes.object,
    redrawBikes: PropTypes.func
};

function BikePopup(props) {

    const bike = props.bike;
    const chargeStations = props.cities[bike.city_id].charge_stations;

    function renderEndMaintenance() {
        return ( <BikeEndMaintenance
                    api={props.api}
                    redrawBikes={props.redrawBikes}
                    bike={bike} /> )
    }

    function renderBikePopupMoveForm() {
        return ( <BikePopupMoveForm
                    api={props.api}
                    cities={props.cities}
                    redrawBikes={props.redrawBikes}
                    mapInstance={props.mapInstance}
                    bike={bike}
                    chargeStations={chargeStations} /> )
    }

    return (
        <div className="bike-popup">
            <div>
                <span className="material-icons">electric_scooter</span>
                {(bike.bike_status === "available") ? "Ledig" : "Upptagen" }
            </div>
            <div>{(bike.charge_id) && "På laddningsstation"}</div>
            <div>Status: {bike.bike_status}</div>
            <div>Batterinivå: {bike.battery_status}</div>
            <div>{(bike.mainenance) && "Genomgår underhåll"}</div>
            {(bike.bike_status === "available") && renderBikePopupMoveForm()}
            {(bike.maintenance && (bike.battery_status === 100)) && renderEndMaintenance()}
        </div>
    );
}

export default BikePopup;
