import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import BikeEndMaintenance from './BikeEndMaintenance';

BikePopup.propTypes = {
    api: PropTypes.object,
    bike: PropTypes.object,
    mapInstance: PropTypes.object,
    cities: PropTypes.object,
    redrawBikes: PropTypes.func
};

function BikePopup(props) {

    const bike = props.bike;
    const chargeStations = props.cities[bike.city_id].charge_stations;

    const [selectedId, setSelectedId] = useState("");
    const [maintenance, setMaintenance] = useState(false);

    useEffect(() => { setSelectedId(0); }, [props]);

    function moveBike() {
        const selectedStation = chargeStations[selectedId];
        props.api.moveBike(bike._id, selectedStation, afterMoveBike);
        props.mapInstance.closePopup();
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

    function stationSelection(event) {
        setSelectedId(event.target.value);
    }

    function renderEndMaintenance(bike) {
        return ( <BikeEndMaintenance
                    api={props.api}
                    redrawBikes={props.redrawBikes}
                    bike={bike} /> )
    }

    function drawMoveBikeForm() {
        return (
            <div className="bike-popup-form">
                <strong>Boka hämtning till:</strong>
                <select onBlur={stationSelection}>
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

    return (
        <div className="bike-popup">
            <div>
                <span className="material-icons">electric_scooter</span>
                {(bike.bike_status === "available") ? "Ledig" : "Upptagen" }
            </div>
            <div>{(bike.charge_id) && "På laddningsstation"}</div>
            <div>Status: {bike.bike_status}</div>
            <div>Batterinivå: {bike.battery_status}</div>
            <div>{(bike.mainenance) && "Genomgår underhåll"}</div>
            {(bike.bike_status === "available") && drawMoveBikeForm(bike)}
            {(bike.maintenance && (bike.battery_status === 100)) && renderEndMaintenance(bike)}
        </div>
    );
}

export default BikePopup;
