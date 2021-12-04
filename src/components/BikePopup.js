import React, { useState, useEffect } from 'react';
import api from '../functions/api.js';

function BikePopup(props) {
    const bike = props.bike;
    const cities = props.cities;

    const [selectedStation, setSelectedStation] = useState("");

    async function moveBike() {
        await api.moveBike(bike._id, selectedStation);
        props.redrawBikes();
    }

    function stationSelection(event) {
        setSelectedStation(event.target.value);
    }

    function drawMoveBikeForm(bike) {
        let chargingStations = cities[bike.city_id].charge_stations;

        return (
            <>
            <strong>Boka hämtning till:</strong>
            <div>
                <select onBlur={stationSelection}>
                    {chargingStations.map((station, i) => (
                        <option key={i} value={station._id}>
                            {station._id}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={moveBike}>Boka hämtning</button>
            </div>
            </>
        )
    }

    return (
        <div className="bike-popup">
            <div>_id: {bike._id}, bike_status: {bike.bike_status}</div>
            {(bike.bike_status === "free") && drawMoveBikeForm(bike)}
        </div>
    );
}

export default BikePopup;
