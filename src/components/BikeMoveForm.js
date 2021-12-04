import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function BikeMoveForm(props) {
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        setSelectedId(props.chargingStations[0]._id);
    }, [props]);

    function moveBike(bikeId) {
        console.log(bikeId, selectedId);
        // await api.moveBike(bikeId, selectedStation);
    }

    function stationSelection(event) {
        setSelectedId(event.target.value);
    }

    return (
        <div>
            <select
                onBlur={stationSelection}
                defaultValue={selectedId}>
                {props.chargingStations.map((station, i) => (
                    <option key={i} value={station._id}>
                        {station._id}
                    </option>
                ))}
            </select>
            <button type="button" onClick={() => moveBike(props.bike._id)}>Boka hämtning</button>
        </div>
    )
}

export default BikeMoveForm;
