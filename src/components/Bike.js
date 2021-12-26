import React, { useState } from 'react';
import PropTypes from "prop-types";
import Map from './Map';

Bike.propTypes = {
    api: PropTypes.object,
    bike: PropTypes.object,
    currentCity: PropTypes.object,
    cities: PropTypes.object
};

function Bike(props) {
    const [bikes, setBikes] = useState([props.bike]);

    let chargeStations = props.cities[props.bike.city_id].charge_stations;
    let parkingStations = props.cities[props.bike.city_id].parking_stations;
    let focusCoords = [
        props.bike.coordinates.lat,
        props.bike.coordinates.long
    ];

    async function getBikes() {
        const data = await props.api.getBikes(props.bike.city_id);
        let allBikes = data.bikes;

        let filteredBikes = allBikes.filter(function(bike) {
          return bike._id === props.bike._id;
        });

        setBikes(filteredBikes);
    }

    return (
        <>
        <h1>Cykel (id: {props.bike._id})</h1>
        <table>
            <tbody>
                <tr data-testid="city">
                    <td>Stad:</td><td>{props.cities[props.bike.city_id].name}</td>
                </tr>
                <tr data-testid="batteryStatus">
                    <td>Batterinivå:</td>
                    <td>
                        {props.bike.battery_status}
                    </td>
                </tr>
                <tr data-testid="status">
                    <td>Status:</td>
                    <td>
                        {props.bike.bike_status}
                    </td>
                </tr>
            </tbody>
        </table>
        <Map
            api={props.api}
            zoom={20}
            focusCoords={focusCoords}
            bikes={bikes}
            city={props.currentCity}
            cities={props.cities}
            chargeStations={chargeStations}
            parkingStations={parkingStations}
            redrawBikes={getBikes} />
        </>
    );
}

export default Bike;
