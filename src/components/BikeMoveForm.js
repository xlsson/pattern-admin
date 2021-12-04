import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function BikeMoveForm(props) {
    const bike = props.bike;
    const chargingStations = props.chargingStations;

    const [selectedId, setSelectedId] = useState("");

    useEffect(() => { setSelectedId(0); }, [props]);

    function moveBike() {
        const selectedStation = chargingStations[selectedId];
        api.moveBike(bike._id, selectedStation, afterMoveBike);
    }

    function afterMoveBike(data) {
        console.log(data);
    }

    function stationSelection(event) {
        setSelectedId(event.target.value);
    }

    return (
        <div>
            <select
                onBlur={stationSelection}
                defaultValue={selectedId}>
                {chargingStations.map((station, i) => (
                    <option key={i} value={i}>
                        {station._id}
                    </option>
                ))}
            </select>
            <button type="button" onClick={moveBike}>Boka hämtning</button>
        </div>
    )
}

export default BikeMoveForm;
