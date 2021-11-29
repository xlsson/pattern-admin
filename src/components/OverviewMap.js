import React, { useState, useEffect } from 'react';
import Map from './Map';

import api from '../functions/api.js';

function OverviewMap(props) {
    let [zoom, setZoom] = useState(6);
    let [bikes, setBikes] = useState([]);
    let [chargingStations, setChargingStations] = useState([]);
    let [parkingStations, setParkingStations] = useState([]);

    const lat = (props.city.coordinates[0] + props.city.coordinates[2])/2;
    const long = (props.city.coordinates[1] + props.city.coordinates[3])/2;
    const focusCoords = [lat, long];

    async function getMapData() {
        const bikes = await api.getBikes(props.city._id);
        const chargingStations = await api.getChargingStations(props.city._id);
        const parkingStations = await api.getParkingStations(props.city._id);
        const zoom = (props.city._id !== "all") ? 13 : 6;

        setZoom(zoom);
        setChargingStations(chargingStations);
        setParkingStations(parkingStations);
        setBikes(bikes);
    };

    useEffect(() => { getMapData(); }, [props.city._id]);

    return (
        <>
        <h1>Karta över {props.city.name}</h1>
        <div className="map-legend">
            <p className="bike">Cyklar</p>
            <p className="chargingStation">Laddningsstationer</p>
            <p className="parkingStation">Parkeringsstationer</p>
        </div>
        <Map
            zoom={zoom}
            focusCoords={focusCoords}
            bikes={bikes}
            chargingStations={chargingStations}
            parkingStations={parkingStations}/>
        </>
    );
}

export default OverviewMap;
