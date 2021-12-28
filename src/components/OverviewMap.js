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
    let [bikes, setBikes] = useState([]);

    const city = props.currentCity;

    const chargeStations = city.charge_stations;
    const parkingStations = city.parking_stations;

    const coords = city.coordinates;
    const lat = (coords.northwest.lat + coords.southeast.lat)/2;
    const long = (coords.northwest.long + coords.southeast.long)/2;
    const focusCoords = [lat, long];

    const zoom = (city._id !== "all") ? 13 : 6;

    async function getBikes() {
        console.log("hämtar cyklar");
        const data = await props.api.getBikes(city._id);
        setBikes(data.bikes);
    }

    function toggleInterval(toggle) {
        if (toggle === false) { return props.utils.stopInterval(); }

        props.utils.autoFetch = true;
        props.utils.currentInterval = setInterval(getBikes, 1000);
    }

    useEffect(() => { getBikes(); }, [props]);

    return (
        <>
        <div className="title-wrapper">
            <h1>Översiktskarta ({city.name})</h1>
            <div>
                <p>Autohämtning varje sekund: {props.utils.autoFetch.toString()}</p>
                <button type="button" onClick={() => toggleInterval(!props.utils.autoFetch)}>toggle</button>
            </div>
        </div>
        <Map
            api={props.api}
            zoom={zoom}
            focusCoords={focusCoords}
            bikes={bikes}
            city={city}
            cities={props.cities}
            chargeStations={chargeStations}
            parkingStations={parkingStations}
            redrawBikes={getBikes} />
        <div className="map-legend">
            <p><span className="material-icons">electric_scooter</span> = elsparkcykel</p>
            <p><span className="material-icons">bolt</span> = laddningsstation</p>
            <p><span className="material-icons">local_parking</span> = parkeringsstation</p>
        </div>
        </>
    );
}

export default OverviewMap;
