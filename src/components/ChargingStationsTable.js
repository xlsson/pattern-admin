import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function ChargingStationsTable() {
    const [chargingStations, setChargingStations] = useState([]);

    useEffect(() => {
        setChargingStations(api.getChargingStations());
    }, [chargingStations]);

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
                {chargingStations.map((chargingStation, i) => (
                    <tr key={i}>
                        <>
                        <td>{chargingStation._id}</td>
                        <td>{chargingStation.city_id}</td>
                        <td>{chargingStation.coordinates}</td>
                        </>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default ChargingStationsTable;
