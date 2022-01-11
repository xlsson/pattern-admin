import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Map from './Map';

OverviewMap.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    currentCity: PropTypes.object,
    cities: PropTypes.object,
    citiesArray: PropTypes.array,
    setMessage: PropTypes.func
};

function OverviewMap(props) {
    const city = props.currentCity;
    const center = props.utils.getCenter(city.coordinates);
    const zoom = (city._id !== "all") ? 13 : 6;

    const chargeStations = city.charge_stations;
    const parkingStations = city.parking_stations;

    const [autoFetchIsOn, setAutoFetchIsOn] = useState(false);

    props.utils.setView(center, zoom);

    useEffect(() => { props.utils.setView(center, zoom); }, [props]);

    return (
        <>
        <div className="title-wrapper">
            <h1>Översiktskarta</h1>
            <button
                type="button"
                data-testid="autofetch-button"
                onClick={() => setAutoFetchIsOn(!autoFetchIsOn)}>
                {!autoFetchIsOn ? "Starta " : "Avbryt "} löpande kartuppdatering
            </button>
        </div>
        <Map
            api={props.api}
            utils={props.utils}
            city={city}
            cities={props.cities}
            citiesArray={props.citiesArray}
            autoFetchIsOn={autoFetchIsOn}
            chargeStations={chargeStations}
            parkingStations={parkingStations}
            setMessage={props.setMessage}/>
        </>
    );
}

export default OverviewMap;
