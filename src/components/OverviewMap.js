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
    const center = props.utils.getCenter(city.coordinates);
    const zoom = (city._id !== "all") ? 13 : 6;

    const chargeStations = city.charge_stations;
    const parkingStations = city.parking_stations;

    const [bikes, setBikes] = useState([]);
    const [autoFetchIsOn, setAutoFetchIsOn] = useState(props.utils.autoFetch);

    async function getBikes() {
        console.log("getBikes, city:", city.name);
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
        props.utils.currentInterval = setInterval(getBikes, 1000);
    }

    useEffect(() => {
        props.utils.setView(center, zoom);
        getBikes();
    }, []);

    useEffect(() => {
        props.utils.setView(center, zoom);
        getBikes();
        // Called twice to reset current city, but not
        // toggle clear interval.
        toggleInterval(!props.utils.autoFetch);
        toggleInterval(!props.utils.autoFetch);
    }, [props]);

    return (
        <>
        <div className="title-wrapper">
            <h1>Översiktskarta</h1>
            <button
                type="button"
                data-testid="autofetch-button"
                onClick={() => toggleInterval(!props.utils.autoFetch)}>
                {!autoFetchIsOn ? "Starta " : "Avbryt "} automatisk kartuppdatering
            </button>
        </div>
        <Map
            api={props.api}
            utils={props.utils}
            bikes={bikes}
            city={city}
            cities={props.cities}
            chargeStations={chargeStations}
            parkingStations={parkingStations}
            getBikes={getBikes}
            setMessage={props.setMessage}/>
        </>
    );
}

export default OverviewMap;
