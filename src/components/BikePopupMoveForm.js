import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

BikePopupMoveForm.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    cities: PropTypes.object,
    getBikes: PropTypes.func,
    bike: PropTypes.object,
    chargeStations: PropTypes.array,
    setMessage: PropTypes.func
};

/**
 * Form for Popup for bike in map, to move bike to a station
 *
 * API calls: moveBike(), orderMaintenance()
 *
 * @component
 */
function BikePopupMoveForm(props) {
    const bike = props.bike;

    const [selectedId, setSelectedId] = useState("");
    const [maintenance, setMaintenance] = useState(false);

    useEffect(() => { setSelectedId(0); }, [props]);

    async function moveBike() {
        const selectedStation = props.chargeStations[selectedId];
        const data = await props.api.moveBike(bike._id, selectedStation);
        let message = props.utils.createFlashMessage(data, "move");

        if (maintenance) {
            const maintenanceData = await props.api.orderMaintenance(bike._id, true);
            message = props.utils.createFlashMessage(maintenanceData, "moveMaintenance");

            setMaintenance(false);
        }
        props.setMessage(message);
        props.getBikes();
        props.utils.mapInstance.closePopup();
    }

    function selectStation(event) {
        setSelectedId(event.target.value);
    }

    return (
        <div className="bike-popup-form">
            <strong>Hämta till:</strong>
            <select
                data-testid="moveBikeDropdown"
                onBlur={selectStation}>
                {props.chargeStations.map((station, i) => (
                    <option key={i} value={i}>
                        {station.name}
                    </option>
                ))}
            </select>
            <div className="maintenance-checkbox">
                <label htmlFor="maintenance">Med underhåll</label>
                <input
                    name="maintenance"
                    type="checkbox"
                    onClick={() => setMaintenance(!maintenance)}>
                </input>
            </div>
            <button type="button" onClick={moveBike}>Hämta</button>
        </div>
    );
}

export default BikePopupMoveForm;
