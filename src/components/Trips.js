import React, { useState, useEffect } from 'react';

function Trips(props) {
    const user = props.user;
    const trips = props.trips;

    return (
        <div>
            <h2>Reslogg</h2>
            <table>
                <>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>bike_id</th>
                        <th>start_time</th>
                        <th>stop_time</th>
                        <th>start_coordinates</th>
                        <th>stop_coordinates</th>
                        <th>average_speed</th>
                        <th>distance</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                {trips.map((trip, i) => (
                    <tr key={i}>
                        <>
                        <td>{trip._id}</td>
                        <td>{trip.bike_id}</td>
                        <td>{trip.start_time}</td>
                        <td>{trip.stop_time}</td>
                        <td>{trip.start_coordinates.lat}, {trip.start_coordinates.long}</td>
                        <td>{trip.stop_coordinates.lat}, {trip.stop_coordinates.long}</td>
                        <td>{trip.average_speed}</td>
                        <td>{trip.distance}</td>
                        <td>{trip.price}</td>
                        </>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default Trips;
