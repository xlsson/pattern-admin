import React, { useState, useEffect } from 'react';
import L from "leaflet";
import { MapContainer, TileLayer, MapConsumer, Marker, Popup, Rectangle } from 'react-leaflet';


import api from '../functions/api.js';

function Map(props) {
    let zoom = 6;

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
    };

    function getIcon(color) {
        return L.icon({
            iconUrl: require(`../img/mapmarkers/marker_${color}.png`).default,
            iconAnchor: [12, 12],
            popupAnchor: [12, 12]
        });
    }

    function drawBike(bike, i) {
        return (
            <Marker position={bike.coordinates} icon={getIcon("pink")}>
                <Popup>
                    <span key={i}>Bike id: {bike._id}</span>
                </Popup>
            </Marker>
        )
    }

    function drawStation(type, station, i) {
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
            <Marker position={center} icon={getIcon(color)}>
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
        <div className="map-legend">
            <p className="bike">Cyklar</p>
            <p className="chargingStation">Laddningsstationer</p>
            <p className="parkingStation">Parkeringsstationer</p>
        </div>
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
                        zoom = (props.city._id != "all") ? 13 : 6;
                        map.setView(cityCoords, zoom);
                        return null;
                    }}
                </MapConsumer>
                {bikes.map((bike, i) => { return drawBike(bike, i); })}
                {chargingStations.map((station, i) => { return drawStation("charging", station, i); })}
                {parkingStations.map((station, i) => { return drawStation("parking", station, i); })}
            </MapContainer>
        </div>
        </>
    );
}

export default Map;
