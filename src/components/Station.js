import React, { useState, useEffect } from 'react';
import Map from './Map';

import api from '../functions/api.js';

function Station(props) {
    let [bikes, setBikes] = useState([]);

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

    async function getData() {
        let allBikes = await api.getBikes(station.city_id);
        bikes = allBikes.filter(function(bike) {
          return bike[`${props.type}_id`] === station._id;
        });
        setBikes(bikes);
    };

    useEffect(() => { getData(); }, [props]);

    return (
        <>
        <h1>{title} {station._id} (city_id: {station.city_id})</h1>
        <table>
            <tbody>
                <tr>
                    <td>_id:</td><td>{station._id}</td>
                </tr>
                <tr>
                    <td>city_id:</td><td>{station.city_id}</td>
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
            chargingStations={chargingStation}
            parkingStations={parkingStation}/>
        </>
    );
}

export default Station;
