import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function BikeMoveForm(props) {
    const bike = props.bike;
    const chargeStations = props.chargeStations;

    const [selectedId, setSelectedId] = useState("");
    const [maintenance, setMaintenance] = useState(false);

    useEffect(() => { setSelectedId(0); }, [props]);

    function moveBike() {
        const selectedStation = chargeStations[selectedId];
        api.moveBike(bike._id, selectedStation, maintenance, afterMoveBike);
    }

    function afterMoveBike(data) {
        setMaintenance(false);
        props.redrawBikes();
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

export default BikeMoveForm;
