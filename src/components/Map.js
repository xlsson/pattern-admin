import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import L from "leaflet";
import { MapContainer, TileLayer, MapConsumer } from 'react-leaflet';
import MapCityLimits from './MapCityLimits';
import MapStation from './MapStation';
import MapBike from './MapBike';

Map.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    zoom: PropTypes.number,
    focusCoords: PropTypes.array,
    bikes: PropTypes.array,
    city: PropTypes.object,
    cities: PropTypes.object,
    chargeStations: PropTypes.array,
    parkingStations: PropTypes.array,
    getBikes: PropTypes.func,
    setMessage: PropTypes.func
};

function Map(props) {
    const [zoom, setZoom] = useState(6);
    const [focusCoords, setFocusCoords] = useState([58.195259, 14.221258]);
    const [bikes, setBikes] = useState([]);
    const [chargeStations, setChargeStations] = useState([]);
    const [parkingStations, setParkingStations] = useState([]);
    const [cityLimits, setCityLimits] = useState([]);

    useEffect(() => {
        setZoom(props.zoom);
        setFocusCoords(props.focusCoords);
        setBikes(props.bikes);
        setChargeStations(props.chargeStations);
        setParkingStations(props.parkingStations);
        setCityLimits(props.utils.createCityLimits(props.city, props.cities));
    }, [props]);

    function closeAnyOpenPopup(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) { props.utils.mapInstance.closePopup(); }
    }

    function getIcon(markerImg, iconAnchor, popupAnchor) {
        return L.icon({
            iconUrl: require(`../img/mapmarkers/${markerImg}.png`).default,
            iconAnchor: iconAnchor,
            popupAnchor: popupAnchor
        });
    }

    function drawBike(bike) {
        return (
            <MapBike
                api={props.api}
                utils={props.utils}
                bike={bike}
                cities={props.cities}
                getBikes={props.getBikes}
                getIcon={getIcon}
                setMessage={props.setMessage} />
        )
    }

    function drawStation(type, station) {
        return (
            <MapStation
                type={type}
                station={station}
                getIcon={getIcon} />
        );
    }

    function drawCityLimits(coords) {
        return ( <MapCityLimits coords={coords} /> );
    }

    return (
        <div id="map-wrapper-main" onBlur={closeAnyOpenPopup}>
            <MapContainer
                data-testid="map"
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
                        useEffect(() => { props.utils.mapInstance = map; }, []);
                        return null;
                    }}
                </MapConsumer>
                {bikes.map((bike, i) => {
                    return (<div key={i}>{drawBike(bike)}</div>);
                })}
                {chargeStations.map((station, i) => {
                    return (<div key={i}>{drawStation("charge", station)}</div>);
                })}
                {parkingStations.map((station, i) => {
                    return (<div key={i}>{drawStation("parking", station)}</div>);
                })}
                {cityLimits.map((coords, i) => {
                    return (<div key={i}>{drawCityLimits(coords)}</div>);
                })}
            </MapContainer>
        </div>
    );
}

export default Map;
