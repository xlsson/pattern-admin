import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function BikesTable() {
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        setBikes(api.getBikes());
    }, [bikes]);

    return (
        <div>
            <table>
                <>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>city_id</th>
                        <th>charge_id</th>
                        <th>parking_id</th>
                        <th>bike_status</th>
                        <th>battery_status</th>
                        <th>maintenance</th>
                        <th>coordinates</th>
                    </tr>
                </thead>
                <tbody>
                {bikes.map((bike, i) => (
                    <tr key={i}>
                        <>
                        <td>{bike._id}</td>
                        <td>{bike.city_id}</td>
                        <td>{bike.charge_id}</td>
                        <td>{bike.parking_id}</td>
                        <td>{bike.bike_status}</td>
                        <td>{bike.battery_status}</td>
                        <td>{bike.maintenance}</td>
                        <td>{bike.coordinates}</td>
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
