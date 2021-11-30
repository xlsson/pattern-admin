import React, { useState, useEffect } from 'react';
import api from '../functions/api.js';

function BikePopup(props) {
    const bike = props.bike;

    const [chargingStations, setChargingStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState("");

    async function getData() {
        const stations = await api.getChargingStations(bike.city_id);
        setChargingStations(stations);
        setSelectedStation(stations[0]);
    };

    useEffect(() => { getData(); }, [props]);

    function moveBike(bikeId) {
        console.log("move", bikeId, selectedStation);
    }

    function stationSelection(event) {
        setSelectedStation(event.target.value);
    }

    function drawMoveBikeButton(bikeId) {
        return (
            <>
            <strong>Boka hämtning till:</strong>
            <div>
                <select onChange={stationSelection}>
                    {chargingStations.map((station, i) => (
                        <option key={i} value={station._id}>
                            stationsid {station._id}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={() => moveBike(bikeId)}>Boka hämtning</button>
            </div>
            </>
        )
    }

    return (
        <div className="bike-popup">
            <div>_id: {bike._id}, bike_status: {bike.bike_status}</div>
            {(bike.bike_status === "free") && drawMoveBikeButton(bike._id)}
        </div>
    );
}

export default BikePopup;
