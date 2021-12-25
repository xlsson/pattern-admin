import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Map from './Map';

OverviewMap.propTypes = {
    api: PropTypes.object,
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
        const data = await props.api.getBikes(city._id);
        setBikes(data.bikes);
    }

    useEffect(() => { getBikes(); }, [props]);

    return (
        <>
        <h1>Översiktskarta ({city.name})</h1>
        <div className="map-legend">
            <p><span className="material-icons">electric_scooter</span> = elsparkcykel</p>
            <p><span className="material-icons">bolt</span> = laddningsstation</p>
            <p><span className="material-icons">local_parking</span> = parkeringsstation</p>
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
        </>
    );
}

export default OverviewMap;
