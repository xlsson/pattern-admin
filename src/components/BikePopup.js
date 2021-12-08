import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function BikePopup(props) {
    const bike = props.bike;
    const chargeStations = props.cities[bike.city_id].charge_stations;

    const [selectedId, setSelectedId] = useState("");

    useEffect(() => { setSelectedId(0); }, [props]);

    function moveBike() {
        const selectedStation = chargeStations[selectedId];
        api.moveBike(bike._id, selectedStation, afterMoveBike);
    }

    function afterMoveBike(data) {
        console.log(data);
        props.redrawBikes();
    }

    function stationSelection(event) {
        setSelectedId(event.target.value);
    }

    function drawMoveBikeForm(bike) {
        return (
            <>
            <strong>Boka hämtning till:</strong>
            <div>
                <select onBlur={stationSelection}>
                    {chargeStations.map((station, i) => (
                        <option key={i} value={i}>
                            {station.name}
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
            {(bike.bike_status === "available") && drawMoveBikeForm(bike)}
        </div>
    );
}

export default BikePopup;
