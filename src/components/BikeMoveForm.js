import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

BikeMoveForm.propTypes = {
    api: PropTypes.object,
    bike: PropTypes.object,
    redrawBikes: PropTypes.func,
    chargeStations: PropTypes.array
};

function BikeMoveForm(props) {
    const bike = props.bike;
    const chargeStations = props.chargeStations;

    const [selectedId, setSelectedId] = useState("");
    const [maintenance, setMaintenance] = useState(false);

    useEffect(() => { setSelectedId(0); }, [props]);

    function moveBike() {
        const selectedStation = chargeStations[selectedId];
        props.api.moveBike(bike._id, selectedStation, afterMoveBike);
    }

    function afterMoveBike(data) {
        console.log(data);
        if (maintenance) {
            props.api.orderMaintenance(bike._id, true, afterOrderMaintenance);
            return;
        }
        props.redrawBikes();
    }

    function afterOrderMaintenance(data) {
        console.log(data);
        setMaintenance(false);
        props.redrawBikes();
    }

    function stationSelection(event) { setSelectedId(event.target.value); }

    return (
        <div>
            <select
                data-testid="stationsDropdown"
                onBlur={stationSelection}
                defaultValue={selectedId}>
                {chargeStations.map((station, i) => (
                    <option key={i} value={i}>
                        {station.name}
                    </option>
                ))}
            </select>
            <div>
                <label htmlFor="maintenance">Med underhåll</label>
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
