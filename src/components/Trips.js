import React from 'react';
import PropTypes from "prop-types";

Trips.propTypes = {
    utils: PropTypes.object,
    trips: PropTypes.array
};

function Trips(props) {
    // const trips = require("../tests/mockdata/trips.json");
    const trips = props.trips;
    // console.log("MOCKDATA");

    return (
        <div>
            <h2>Reslogg</h2>
            <table>
                <>
                <thead>
                    <tr>
                        <th>Res-Id</th>
                        <th>Starttid</th>
                        <th>Sluttid</th>
                        <th>Cykel-Id</th>
                        <th>Medelhastighet</th>
                        <th>Sträcka</th>
                        <th>Pris</th>
                    </tr>
                </thead>
                <tbody>
                {trips.map((trip, i) => (
                    <tr key={i}>
                        <>
                        <td>{trip._id}</td>
                        <td>{props.utils.getDateTimeString(trip.start_time)}</td>
                        <td>{props.utils.getDateTimeString(trip.stop_time)}</td>
                        <td>{trip.bike_id}</td>
                        <td>{trip.average_speed} km/h</td>
                        <td>{trip.distance} m</td>
                        <td>{trip.price} kr</td>
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
