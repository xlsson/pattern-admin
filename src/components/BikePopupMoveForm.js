import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

BikePopupMoveForm.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    cities: PropTypes.object,
    getBikes: PropTypes.func,
    bike: PropTypes.object,
    chargeStations: PropTypes.array
};

function BikePopupMoveForm(props) {
    const bike = props.bike;

    const [selectedId, setSelectedId] = useState("");
    const [maintenance, setMaintenance] = useState(false);

    useEffect(() => { setSelectedId(0); }, [props]);

    async function moveBike() {
        const selectedStation = props.chargeStations[selectedId];
        const data = await props.api.moveBike(bike._id, selectedStation);
        console.log(data);
        if (maintenance) {
            await props.api.orderMaintenance(bike._id, true);
            setMaintenance(false);
        }
        props.getBikes();
        props.utils.mapInstance.closePopup();
    }

    function stationSelection(event) {
        setSelectedId(event.target.value);
    }

    return (
        <div className="bike-popup-form">
            <strong>Boka hämtning till:</strong>
            <select
                data-testid="moveBikeDropdown"
                onBlur={stationSelection}>
                {props.chargeStations.map((station, i) => (
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
    );
}

export default BikePopupMoveForm;
