import React, { useState, useEffect } from 'react';
import BikeEndMaintenance from './BikeEndMaintenance';

import api from '../functions/api.js';

function BikePopup(props) {
    const bike = props.bike;
    const chargeStations = props.cities[bike.city_id].charge_stations;

    const [selectedId, setSelectedId] = useState("");
    const [maintenance, setMaintenance] = useState(false);

    useEffect(() => { setSelectedId(0); }, [props]);

    function moveBike() {
        const selectedStation = chargeStations[selectedId];
        api.moveBike(bike._id, selectedStation, maintenance, afterMoveBike);
    }

    function afterMoveBike(data) {
        console.log(data);
        setMaintenance(false);
        props.redrawBikes();
    }

    function stationSelection(event) {
        setSelectedId(event.target.value);
    }

    function renderEndMaintenance(bike) {
        return ( <BikeEndMaintenance bike={bike} /> )
    }

    function drawMoveBikeForm(bike) {
        return (
            <div className="bike-popup-form">
                <strong>Boka hämtning</strong>
                <select onBlur={stationSelection}>
                    {chargeStations.map((station, i) => (
                        <option key={i} value={i}>
                            {station.name}
                        </option>
                    ))}
                </select>
                <div>
                    <label htmlFor="maintenance">Boka underhåll</label>
                    <input
                        name="maintenance"
                        type="checkbox"
                        onClick={() => setMaintenance(!maintenance)}>
                    </input>
                </div>
                <button type="button" onClick={moveBike}>Boka</button>
            </div>
        )
    }

    return (
        <div className="bike-popup">
            <span className="material-icons">electric_scooter</span>
            <div>_id: {bike._id}</div>
            <div>Status: {bike.bike_status}</div>
            <div>Batterinivå: {bike.battery_status}</div>
            <div>Underhåll: {bike.mainenance}</div>
            {(bike.bike_status === "available") && drawMoveBikeForm(bike)}
            {((bike.bike_status === "unavailable") && (bike.maintenance)) && renderEndMaintenance(bike)}
        </div>
    );
}

export default BikePopup;
