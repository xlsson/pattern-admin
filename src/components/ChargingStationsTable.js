import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function ChargingStationsTable(props) {
    let [chargingStations, setChargingStations] = useState([]);

    async function getChargingStations() {
        chargingStations = await api.getChargingStations(props.city._id);
        setChargingStations(chargingStations);
    };

    function handleClick(i) {
        props.switchView("chargingStation", chargingStations[i]);
    }

    useEffect(() => { getChargingStations(); }, [props.city._id]);

    return (
        <div>
            <h1>Laddningsstationer för {props.city.name}</h1>
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
                    <tr
                        className="pointer-cursor"
                        key={i}
                        onClick={() => handleClick(i)}>
                        <>
                        <td>{chargingStation._id}</td>
                        <td>{chargingStation.city_id}</td>
                        <td>
                            {chargingStation.coordinates.northwest.lat}, {chargingStation.coordinates.northwest.long},
                            {chargingStation.coordinates.southeast.lat}, {chargingStation.coordinates.southeast.long}
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

export default ChargingStationsTable;
