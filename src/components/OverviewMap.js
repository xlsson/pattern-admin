import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Map from './Map';

OverviewMap.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    currentCity: PropTypes.object,
    cities: PropTypes.object,
    setMessage: PropTypes.func
};

function OverviewMap(props) {
    const city = props.currentCity;

    const chargeStations = city.charge_stations;
    const parkingStations = city.parking_stations;

    const coords = city.coordinates;
    const lat = (coords.northwest.lat + coords.southeast.lat)/2;
    const long = (coords.northwest.long + coords.southeast.long)/2;

    const initialZoom = (city._id !== "all") ? 13 : 6;

    const [bikes, setBikes] = useState([]);
    const [focusCoords, setFocusCoords] = useState([lat, long]);
    const [zoom, setZoom] = useState(initialZoom);
    const [autoFetchIsOn, setAutoFetchIsOn] = useState(props.utils.autoFetch);

    function setZoomGetBikes() {
        const center = props.utils.mapInstance.getCenter();
        setZoom(props.utils.mapInstance.getZoom());
        setFocusCoords([center.lat, center.lng]);
        getBikes();
    }

    async function getBikes() {
        console.log("hämtar cyklar");
        const data = await props.api.getBikes(city._id);
        setBikes(data.bikes);
    }

    function toggleInterval(toggle) {
        if (toggle === false) {
            setAutoFetchIsOn(false);
            return props.utils.stopInterval();
        }
        setAutoFetchIsOn(true);
        props.utils.autoFetch = true;
        props.utils.currentInterval = setInterval(setZoomGetBikes, 1000);
    }

    useEffect(() => {
        setZoom(initialZoom);
        setFocusCoords([lat, long]);
        getBikes();
    }, [props]);

    return (
        <>
        <div className="title-wrapper">
            <h1>Översiktskarta</h1>
            <button type="button" onClick={() => toggleInterval(!props.utils.autoFetch)}>
                {!autoFetchIsOn ? "Starta " : "Avbryt "} automatisk kartuppdatering
            </button>
        </div>
        <Map
            api={props.api}
            utils={props.utils}
            zoom={zoom}
            focusCoords={focusCoords}
            bikes={bikes}
            city={city}
            cities={props.cities}
            chargeStations={chargeStations}
            parkingStations={parkingStations}
            getBikes={setZoomGetBikes}
            setMessage={props.setMessage}/>
        <div className="map-legend">
            <div className="icon-and-label-wrapper">
                <span className="material-icons">electric_scooter</span>
                <div>Elsparkcykel</div>
            </div>
            <div className="icon-and-label-wrapper">
                <span className="material-icons">battery_charging_full</span>
                <div>Laddningsstation</div>
            </div>
            <div className="icon-and-label-wrapper">
                <span className="material-icons">local_parking</span>
                <div>Parkeringsstation</div>
            </div>
        </div>
        </>
    );
}

export default OverviewMap;
