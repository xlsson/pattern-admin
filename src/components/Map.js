import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, MapConsumer, Marker, Popup, Rectangle } from 'react-leaflet';

import api from '../functions/api.js';

function Map(props) {
    let [zoom, setZoom] = useState(6);
    let [bikes, setBikes] = useState([]);
    let [chargingStations, setChargingStations] = useState([]);
    let [parkingStations, setParkingStations] = useState([]);

    const lat = (props.city.coordinates[0] + props.city.coordinates[2])/2;
    const long = (props.city.coordinates[1] + props.city.coordinates[3])/2;
    const cityCoords = [lat, long];

    async function getMapData() {
        const bikes = await api.getBikes(props.city._id);
        const chargingStations = await api.getChargingStations(props.city._id);
        const parkingStations = await api.getParkingStations(props.city._id);

        setChargingStations(chargingStations);
        setParkingStations(parkingStations);
        setBikes(bikes);

        if (props.city._id === "all") {
            setZoom(6);
            return;
        }
        setZoom(13);
    };

    function displayStation(type, station, i) {
        let color = "green";
        if (type === "parking") { color = "blue"; }

        let coords = station.coordinates;
        let northWest = [coords[0], coords[1]];
        let southEast = [coords[2], coords[3]];
        let center = [
            ((northWest[0] + southEast[0])/2),
            ((northWest[1] + southEast[1])/2)
        ];
        let bounds = [northWest, southEast];
        let options = { color: color };

        return (
            <>
            <Rectangle bounds={bounds} pathOptions={options} />
            <Marker position={center}>
                <Popup>
                    <span key={i}>{type}Station id: {station._id}</span>
                </Popup>
            </Marker>
            </>
        );
    }

    useEffect(() => { getMapData(); }, [props.city._id]);

    return (
        <>
        <h1>Karta över {props.city.name}</h1>
        <div id="map-wrapper-main">
            <MapContainer
                id="map"
                center={cityCoords}
                zoom={zoom}
                scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapConsumer>
                    {(map) => {
                        map.setView(cityCoords, zoom);
                        return null;
                    }}
                </MapConsumer>
                {bikes.map((bike, i) => (
                    <Marker position={bike.coordinates}>
                        <Popup>
                            <span key={i}>Bike id: {bike._id}</span>
                        </Popup>
                    </Marker>
                ))}
                {chargingStations.map(function(station, i) {
                    return displayStation("charging", station, i);
                })}
                {parkingStations.map(function(station, i) {
                    return displayStation("parking", station, i);
                })}
            </MapContainer>
        </div>
        </>
    );
}

export default Map;
