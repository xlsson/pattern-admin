import React, { useState, useEffect } from 'react';
import api from '../functions/api.js';

function BikePopup(props) {
    const bike = props.bike;

    const [chargingStations, setChargingStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState("");

    useEffect(() => { getData(); }, [props]);

    async function getData() {
        const stations = await api.getChargingStations(bike.city_id);
        setChargingStations(stations);
        setSelectedStation(stations[0]._id);
    };

    async function moveBike() {
        await api.moveBike(bike._id, selectedStation);
        props.getNewMapData();
    }

    function stationSelection(event) {
        setSelectedStation(event.target.value);
    }

    function drawMoveBikeForm(bikeId) {
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
                <button type="button" onClick={moveBike}>Boka hämtning</button>
            </div>
            </>
        )
    }

    return (
        <div className="bike-popup">
            <div>_id: {bike._id}, bike_status: {bike.bike_status}</div>
            {(bike.bike_status === "free") && drawMoveBikeForm(bike._id)}
        </div>
    );
}

export default BikePopup;
