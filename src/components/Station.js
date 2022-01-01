import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Map from './Map';

Station.propTypes = {
    api: PropTypes.object,
    station: PropTypes.object,
    type: PropTypes.string,
    currentCity: PropTypes.object,
    cities: PropTypes.object
};

function Station(props) {
    let [bikes, setBikes] = useState([]);

    useEffect(() => { getBikes(); }, [props]);

    let chargeStation = [];
    let parkingStation = [];
    let title = "";
    if (props.type === "charge") {
        chargeStation = [props.station];
        title = "Laddningsstation";
    }
    if (props.type === "parking") {
        parkingStation = [props.station];
        title = "Parkeringsstation";
    }

    const station = props.station;
    const coords = station.coordinates;
    const cityName = props.cities[station.city_id].name;

    const lat = (coords.northwest.lat + coords.southeast.lat)/2;
    const long = (coords.northwest.long + coords.southeast.long)/2;
    const focusCoords = [lat, long];

    async function getBikes() {
        const data = await props.api.getBikes(station.city_id);
        let allBikes = data.bikes;
        let filteredBikes = allBikes.filter(function(bike) {
          return bike[`${props.type}_id`] === station._id;
        });

        setBikes(filteredBikes);
    }

    return (
        <>
        <h1>{title} {station.name} ({cityName})</h1>
        <table>
            <tbody>
                <tr data-testid="name">
                    <td>name:</td><td>{station.name}</td>
                </tr>
                <tr data-testid="city">
                    <td>Stad:</td><td>{cityName}</td>
                </tr>
                <tr data-testid="coordinates">
                    <td>coordinates:</td>
                    <td>
                    Nordväst: {coords.northwest.lat}, {coords.northwest.long},
                    Sydost: {coords.southeast.lat}, {coords.southeast.long}
                    </td>
                </tr>
                <tr data-testid="bikes">
                    <td>Just nu {bikes.length} cyklar här:</td>
                    <td>
                        {bikes.map((bike, i) => (
                            <span data-testid="bike" key={i}>bike._id: {bike._id} </span>
                        ))}
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
            chargeStations={chargeStation}
            parkingStations={parkingStation}
            getBikes={getBikes} />
        </>
    );
}

export default Station;
