import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

BikeMoveForm.propTypes = {
    api: PropTypes.object,
    bike: PropTypes.object,
    getBikes: PropTypes.func,
    chargeStations: PropTypes.array
};

function BikeMoveForm(props) {
    const bike = props.bike;
    const chargeStations = props.chargeStations;

    const [selectedId, setSelectedId] = useState("");
    const [maintenance, setMaintenance] = useState(false);

    useEffect(() => { setSelectedId(0); }, [props]);

    async function moveBike() {
        const selectedStation = chargeStations[selectedId];
        const data = await props.api.moveBike(bike._id, selectedStation);
        console.log(data);
        if (maintenance) {
            console.log("nu körs orderMaintenance");
            await props.api.orderMaintenance(bike._id, true);
            setMaintenance(false);
        }
        props.getBikes();
    }

    function stationSelection(event) { setSelectedId(event.target.value); }

    return (
        <div data-testid="bikeMoveForm" className="bike-move-form">
            <div>Till</div>
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
                <label htmlFor="maintenance">med underhåll</label>
                <input
                    name="maintenance"
                    type="checkbox"
                    onClick={() => setMaintenance(!maintenance)}>
                </input>
            </div>
            <button type="button" onClick={moveBike}>Hämta</button>
        </div>
    )
}

export default BikeMoveForm;
