import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function ChargingStationsTable(props) {
    let [chargingStations, setChargingStations] = useState([]);

    async function getChargingStations() {
        chargingStations = await api.getChargingStations(props.city);
        setChargingStations(chargingStations);
    };

    useEffect(() => { getChargingStations(); }, [props.city]);

    return (
        <div>
            <h1>Laddningsstationer för city_id: {props.city}</h1>
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
                        <td>{chargingStation.coordinates[0]}, {chargingStation.coordinates[1]}</td>
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
