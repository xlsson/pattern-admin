import React from 'react';
import PropTypes from "prop-types";

// Trips.propTypes = {
//     trips: PropTypes.array
// };

function Trips(props) {
    const trips = require("../tests/mockdata/trips.json");
    // const trips = props.trips;
    console.log("MOCKDATA");


    function returnDateAndTime(mongoDate) {
        const startTime = new Date(mongoDate);

        const year = startTime.getFullYear();
        const month = leadingZero(startTime.getMonth());
        const date = leadingZero(startTime.getDate());
        const hours = leadingZero(startTime.getHours());
        const minutes = leadingZero(startTime.getMinutes());

        const time = `${year}-${month}-${date}, ${hours}:${minutes}`;
        return time;
    }

    function leadingZero(number) {
        number = number.toString();
        if (number.length === 1) { number = `0${number}`; }
        return number;
    }

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
                        <td>{returnDateAndTime(trip.start_time)}</td>
                        <td>{returnDateAndTime(trip.stop_time)}</td>
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
