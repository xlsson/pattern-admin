import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function ParkingStationsTable() {
    const [parkingStations, setParkingStations] = useState([]);

    useEffect(() => {
        setParkingStations(api.getParkingStations());
    }, [parkingStations]);

    return (
        <div>
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
                        <td>{parkingStation.coordinates}</td>
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
