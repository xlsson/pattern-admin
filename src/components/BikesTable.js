import React, { useState, useEffect } from 'react';
import BikeMoveForm from './BikeMoveForm';
import BikeEndMaintenance from './BikeEndMaintenance';

import api from '../functions/api.js';

function BikesTable(props) {
    let [bikes, setBikes] = useState([]);

    let currentCity = props.currentCity;
    let cities = props.cities;

    useEffect(() => { getBikes(); }, [props]);

    function getBikes() { api.getBikes(currentCity._id, afterGetBikes); }

    function afterGetBikes(data) { setBikes(data.bikes); }

    function handleClick(bike) {
        props.switchView(`bike`, bike);
    }

    function renderEndMaintenance(bike) {
        return ( <BikeEndMaintenance bike={bike} /> )
    }

    function renderMoveForm(bike) {
        let chargeStations = cities[bike.city_id].charge_stations;

        return (
            <BikeMoveForm
                bike={bike}
                redrawBikes={getBikes}
                chargeStations={chargeStations} />
        )
    }

    return (
        <div>
            <h1>Cyklar ({currentCity.name})</h1>
            <table>
                <>
                <thead>
                    <tr>
                        <th>Stad</th>
                        <th>Placering</th>
                        <th>Status</th>
                        <th>Batterinivå</th>
                        <th>maintenance</th>
                        <th>Koordinater</th>
                        <th>Boka hämtning</th>
                    </tr>
                </thead>
                <tbody>
                {bikes.map((bike, i) => (
                    <tr key={i}>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>{cities[bike.city_id].name}</td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {(bike.charge_id) ? `Laddningsstation` : ""}
                            {(bike.parking_id) ? `Parkeringsstation` : ""}
                        </td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {bike.bike_status}</td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {bike.battery_status}</td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {(bike.maintenance) && "Genomgår underhåll"}</td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {bike.coordinates.lat}, {bike.coordinates.long}
                        </td>
                        <td>
                            {(bike.bike_status === "available") && renderMoveForm(bike)}
                            {((bike.bike_status === "unavailable") && (bike.maintenance)) && renderEndMaintenance(bike)}
                        </td>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default BikesTable;
