import React, { useState, useEffect } from 'react';
import Map from './Map';

import api from '../functions/api.js';

function Bike(props) {
    const [bikes, setBikes] = useState([props.bike]);

    let chargeStations = props.cities[props.bike.city_id].charge_stations;
    let parkingStations = props.cities[props.bike.city_id].parking_stations;
    let focusCoords = [
        props.bike.coordinates.lat,
        props.bike.coordinates.long
    ];

    function getBikes() { api.getBikes(props.bike.city_id, afterGetBikes); }

    function afterGetBikes(data) {
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
                <tr>
                    <td>Stad:</td><td>{props.cities[props.bike.city_id].name}</td>
                </tr>
                <tr>
                    <td>Batterinivå:</td>
                    <td>
                        {props.bike.battery_status}
                    </td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td>
                        {props.bike.bike_status}
                    </td>
                </tr>
            </tbody>
        </table>
        <Map
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
