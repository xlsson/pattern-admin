import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function ParkingStationsTable(props) {
    let [parkingStations, setParkingStations] = useState([]);

    async function getParkingStations() {
        parkingStations = await api.getParkingStations(props.city._id);
        setParkingStations(parkingStations);
    };

    useEffect(() => { getParkingStations(); }, [props.city._id]);

    return (
        <div>
            <h1>Parkeringszoner för {props.city.name} (_id: {props.city._id})</h1>
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
                    <tr key={i}>
                        <>
                        <td>{parkingStation._id}</td>
                        <td>{parkingStation.city_id}</td>
                        <td>{parkingStation.coordinates[0]}, {parkingStation.coordinates[1]}</td>
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
