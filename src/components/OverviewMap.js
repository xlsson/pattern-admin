import React, { useState, useEffect } from 'react';
import Map from './Map';

import api from '../functions/api.js';

function OverviewMap(props) {
    let [bikes, setBikes] = useState([]);

    const city = props.currentCity;

    const chargeStations = city.charge_stations;
    const parkingStations = city.parking_stations;

    const coords = city.coordinates;
    const lat = (coords.northwest.lat + coords.southeast.lat)/2;
    const long = (coords.northwest.long + coords.southeast.long)/2;
    const focusCoords = [lat, long];

    const zoom = (city._id !== "all") ? 13 : 6;

    function getBikes() { api.getBikes(city._id, afterGetBikes); }

    function afterGetBikes(data) { setBikes(data.bikes); }

    useEffect(() => { getBikes(); }, [props]);

    return (
        <>
        <h1>Översiktskarta ({city.name})</h1>
        <div className="map-legend">
            <p className="bike">Cyklar</p>
            <p className="chargeStation">Laddningsstationer</p>
            <p className="parkingStation">Parkeringsstationer</p>
        </div>
        <Map
            zoom={zoom}
            focusCoords={focusCoords}
            bikes={bikes}
            city={city}
            cities={props.cities}
            chargeStations={chargeStations}
            parkingStations={parkingStations}
            redrawBikes={getBikes} />
        </>
    );
}

export default OverviewMap;
