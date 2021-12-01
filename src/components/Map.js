import React, { useState, useEffect } from 'react';
import L from "leaflet";
import { MapContainer, TileLayer, MapConsumer, Marker, Popup, Rectangle } from 'react-leaflet';
import BikePopup from './BikePopup';

function Map(props) {
    let [zoom, setZoom] = useState(6);
    let [focusCoords, setFocusCoords] = useState([58.195259, 14.221258]);
    let [bikes, setBikes] = useState([]);
    let [chargingStations, setChargingStations] = useState([]);
    let [parkingStations, setParkingStations] = useState([]);

    useEffect(() => {
        setZoom(props.zoom);
        setFocusCoords(props.focusCoords);
        setBikes(props.bikes);
        setChargingStations(props.chargingStations);
        setParkingStations(props.parkingStations);
    }, [props]);

    function getIcon(color) {
        return L.icon({
            iconUrl: require(`../img/mapmarkers/marker_${color}.png`).default,
            iconAnchor: [12, 12],
            popupAnchor: [0, 0]
        });
    }

    function drawBike(bike, i) {
        return (
            <Marker position={bike.coordinates} icon={getIcon("pink")}>
                <Popup>
                    <BikePopup key={i} bike={bike} getNewMapData={props.getNewMapData} />
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

    return (
        <div id="map-wrapper-main">
            <MapContainer
                id="map"
                center={focusCoords}
                zoom={zoom}
                scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapConsumer>
                    {(map) => {
                        map.setView(focusCoords, zoom);
                        return null;
                    }}
                </MapConsumer>
                {bikes.map((bike, i) => { return drawBike(bike, i); })}
                {chargingStations.map((station, i) => { return drawStation("charging", station, i); })}
                {parkingStations.map((station, i) => { return drawStation("parking", station, i); })}
            </MapContainer>
        </div>
    );
}

export default Map;
