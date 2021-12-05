import React, { useState, useEffect } from 'react';
import BikeMoveForm from './BikeMoveForm';

import api from '../functions/api.js';

function BikesTable(props) {
    let [bikes, setBikes] = useState([]);

    let currentCity = props.currentCity;
    let cities = props.cities;

    useEffect(() => { getBikes(); }, [props]);

    function getBikes() { api.getBikes(currentCity._id, afterGetBikes); }

    function afterGetBikes(data) { setBikes(data.bikes); }

    function renderMoveForm(bike) {
        let chargeStations = cities[bike.city_id].charge_stations;

        return (
            <BikeMoveForm
                bike={bike}
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
                        <th>_id</th>
                        <th>Stad</th>
                        <th>charge_id</th>
                        <th>parking_id</th>
                        <th>bike_status</th>
                        <th>battery_status</th>
                        <th>maintenance</th>
                        <th>coordinates</th>
                        <th>Boka hämtning</th>
                    </tr>
                </thead>
                <tbody>
                {bikes.map((bike, i) => (
                    <tr key={i}>
                        <>
                        <td>{bike._id}</td>
                        <td>{cities[bike.city_id].name}</td>
                        <td>{bike.charge_id}</td>
                        <td>{bike.parking_id}</td>
                        <td>{bike.bike_status}</td>
                        <td>{bike.battery_status}</td>
                        <td>{bike.maintenance}</td>
                        <td>
                            {bike.coordinates.lat}, {bike.coordinates.long}
                        </td>
                        <td>{(bike.bike_status === "free") && renderMoveForm(bike)}</td>
                        </>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default BikesTable;
