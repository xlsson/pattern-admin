import React, { useState, useEffect } from 'react';
import Map from './Map';

import api from '../functions/api.js';

function Station(props) {
    let [bikes, setBikes] = useState([]);

    useEffect(() => { getBikes(); }, [props]);

    let chargingStation = [];
    let parkingStation = [];
    let title = "";
    if (props.type === "charge") {
        chargingStation = [props.station];
        title = "Laddningsstation";
    }
    if (props.type === "parking") {
        parkingStation = [props.station];
        title = "Parkeringsstation";
    }

    let station = props.station;
    let coords = station.coordinates;

    const lat = (coords.northwest.lat + coords.southeast.lat)/2;
    const long = (coords.northwest.long + coords.southeast.long)/2;
    const focusCoords = [lat, long];

    function getBikes() { api.getBikes(station.city_id, afterGetBikes); }

    function afterGetBikes(data) {
        let allBikes = data.bikes;

        let filteredBikes = allBikes.filter(function(bike) {
          return bike[`${props.type}_id`] === station._id;
        });

        setBikes(filteredBikes);
    }

    return (
        <>
        <h1>{title} {station._id} ({props.cities[station.city_id].name})</h1>
        <table>
            <tbody>
                <tr>
                    <td>_id:</td><td>{station._id}</td>
                </tr>
                <tr>
                    <td>Stad:</td><td>{props.cities[station.city_id].name}</td>
                </tr>
                <tr>
                    <td>coordinates:</td>
                    <td>
                    Nordväst: {coords.northwest.lat}, {coords.northwest.long},
                    Sydost: {coords.southeast.lat}, {coords.southeast.long}
                    </td>
                </tr>
                <tr>
                    <td>Just nu {bikes.length} cyklar här:</td>
                    <td>
                        {bikes.map((bike, i) => (
                            <span>bike._id: {bike._id} </span>
                        ))}
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
            chargingStations={chargingStation}
            parkingStations={parkingStation}/>
        </>
    );
}

export default Station;
