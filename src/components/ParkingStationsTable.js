import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function ParkingStationsTable(props) {
    let [parkingStations, setParkingStations] = useState([]);

    async function getParkingStations() {
        parkingStations = await api.getParkingStations(props.city._id);
        setParkingStations(parkingStations);
    };

    function handleClick(i) {
        props.switchView("parkingStation", parkingStations[i]);
    }

    useEffect(() => { getParkingStations(); }, [props.city._id]);

    return (
        <div>
            <h1>Parkeringsstationer för {props.city.name}</h1>
            <table>
                <>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>city_id</th>
                        <th>coordinates</th>
                    </tr>
                </thead>
                <tbody>
                {parkingStations.map((parkingStation, i) => (
                    <tr
                        className="pointer-cursor"
                        key={i}
                        onClick={() => handleClick(i)}>
                        <>
                        <td>{parkingStation._id}</td>
                        <td>{parkingStation.city_id}</td>
                        <td>
                            {parkingStation.coordinates.northwest.lat}, {parkingStation.coordinates.northwest.long},
                            {parkingStation.coordinates.southeast.lat}, {parkingStation.coordinates.southeast.long}
                        </td>
                        </>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default ParkingStationsTable;
