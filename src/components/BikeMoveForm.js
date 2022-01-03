import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

BikeMoveForm.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    bike: PropTypes.object,
    getBikes: PropTypes.func,
    chargeStations: PropTypes.array,
    setMessage: PropTypes.func
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
        let message = props.utils.createFlashMessage(data, "move");

        if (maintenance) {
            const maintenanceData = await props.api.orderMaintenance(bike._id, true);
            message = props.utils.createFlashMessage(maintenanceData, "moveMaintenance");

            setMaintenance(false);
        }
        props.setMessage(message);
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
