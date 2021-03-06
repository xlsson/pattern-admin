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
    city: PropTypes.object,
    cities: PropTypes.object,
    citiesArray: PropTypes.array,
    autoFetchIsOn: PropTypes.bool,
    chargeStations: PropTypes.array,
    parkingStations: PropTypes.array,
    setMessage: PropTypes.func
};

/**
 * Component holding Leaflet map component 
 *
 * API calls: getBikes()
 *
 * @component
 */
function Map(props) {
    const [bikes, setBikes] = useState([]);
    const [chargeStations, setChargeStations] = useState([]);
    const [parkingStations, setParkingStations] = useState([]);
    const [citiesArray, setCitiesArray] = useState([]);

    useEffect(() => {
        getBikes();
        setChargeStations(props.chargeStations);
        setParkingStations(props.parkingStations);
        setCitiesArray(props.citiesArray);
        toggleInterval(props.autoFetchIsOn);
    }, [props]);

    async function getBikes() {
        const data = await props.api.getBikes(props.city._id);
        setBikes(data.bikes);
    }

    function toggleInterval(toggle) {
        if (toggle === false) { return props.utils.stopInterval(); }

        props.utils.autoFetch = true;
        props.utils.currentInterval = setInterval(getBikes, 1000);
    }

    function closeAnyOpenPopup(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            props.utils.mapInstance.closePopup();
        }
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
                getBikes={getBikes}
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

    function drawCityLimits(c) {
        return ( <MapCityLimits
                    city={c}
                    utils={props.utils}
                    selectedId={props.city._id} /> );
    }

    return (
        <div id="map-wrapper-main" onBlur={closeAnyOpenPopup}>
            <MapContainer
                data-testid="map"
                id="map"
                center={props.utils.mapCenter}
                zoom={props.utils.mapZoom}
                scrollWheelZoom={true}>
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
                {citiesArray.map((c, i) => {
                    return (<div key={i}>{drawCityLimits(c)}</div>);
                })}
            </MapContainer>
        </div>
    );
}

export default Map;
