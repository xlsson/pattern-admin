import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Map from './Map';

OverviewMap.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    currentCity: PropTypes.object,
    cities: PropTypes.object
};

function OverviewMap(props) {
    const city = props.currentCity;

    const chargeStations = city.charge_stations;
    const parkingStations = city.parking_stations;

    const coords = city.coordinates;
    const lat = (coords.northwest.lat + coords.southeast.lat)/2;
    const long = (coords.northwest.long + coords.southeast.long)/2;

    const initialZoom = (city._id !== "all") ? 13 : 6;

    let [bikes, setBikes] = useState([]);
    let [focusCoords, setFocusCoords] = useState([lat, long]);
    let [zoom, setZoom] = useState(initialZoom);
    let [autoFetchIsOn, setAutoFetchIsOn] = useState(props.utils.autoFetch);

    function updateBikes() {
        console.log("hämtar cyklar och sätter rätt zoom och center");
        let center = props.utils.mapInstance.getCenter();
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
        props.utils.currentInterval = setInterval(updateBikes, 1000);
    }

    useEffect(() => {
        setZoom(initialZoom);
        setFocusCoords([lat, long]);
        getBikes();
    }, [props]);

    return (
        <>
        <div className="title-wrapper">
            <h1>Översiktskarta ({city.name})</h1>
            <button type="button" onClick={() => toggleInterval(!props.utils.autoFetch)}>
                {!autoFetchIsOn ? "Sätt på " : "Stäng av "} autohämtning av cykeldata
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
            getBikes={getBikes}
            updateBikes={updateBikes} />
        <div className="map-legend">
            <p><span className="material-icons">electric_scooter</span> = elsparkcykel</p>
            <p><span className="material-icons">bolt</span> = laddningsstation</p>
            <p><span className="material-icons">local_parking</span> = parkeringsstation</p>
        </div>
        </>
    );
}

export default OverviewMap;
