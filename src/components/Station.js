import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Map from './Map';

Station.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    switchView: PropTypes.func,
    station: PropTypes.object,
    type: PropTypes.string,
    currentCity: PropTypes.object,
    cities: PropTypes.object,
    setMessage: PropTypes.array
};

function Station(props) {
    let [bikes, setBikes] = useState([]);

    useEffect(() => { getBikesAtStation(); }, [props]);

    let chargeStation = [];
    let parkingStation = [];
    let title = "";
    if (props.type === "charge") {
        chargeStation = [props.station];
        title = "Laddningsstation";
    }
    if (props.type === "parking") {
        parkingStation = [props.station];
        title = "Parkeringsstation";
    }

    const station = props.station;
    const coords = station.coordinates;
    const cityName = props.cities[station.city_id].name;

    const lat = (coords.northwest.lat + coords.southeast.lat)/2;
    const long = (coords.northwest.long + coords.southeast.long)/2;
    const focusCoords = [lat, long];

    async function getBikesAtStation() {
        const data = await props.api.getBikes(station.city_id);
        let allBikes = data.bikes;
        let filteredBikes = allBikes.filter(function(bike) {
          return bike[`${props.type}_id`] === station._id;
        });

        setBikes(filteredBikes);
    }

    function handleClick(bike) {
        props.switchView(`bike`, bike);
    }

    return (
        <>
        <h1>{title} {station.name}</h1>
        <table>
            <>
            <thead>
                <tr>
                    <th>Stad</th>
                    <th>Namn</th>
                    <th>Cyklar på stationen ({bikes.length} st)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-testid="city">{cityName}</td>

                    <td data-testid="name">
                        <div className="icon-and-label-wrapper">
                            <span className="material-icons">
                            {(props.type === "charge") ? "battery_charging_full" : "local_parking"}
                            </span>
                            <div>{station.name}</div>
                        </div>
                    </td>
                    <td data-testid="bikes">
                        {bikes.map((bike, i) => (
                            <div
                                onClick={() => handleClick(bike)}
                                className="icon-and-label-wrapper pointer-cursor"
                                data-testid="bike"
                                key={i}>
                                <span className="material-icons">electric_scooter</span>
                                <div>{bike._id}</div>
                            </div>
                        ))}
                    </td>
                </tr>
            </tbody>
            </>
        </table>
        <Map
            api={props.api}
            utils={props.utils}
            zoom={20}
            focusCoords={focusCoords}
            bikes={bikes}
            city={props.currentCity}
            cities={props.cities}
            chargeStations={chargeStation}
            parkingStations={parkingStation}
            getBikes={getBikesAtStation}
            setMessage={props.setMessage}/>
        </>
    );
}

export default Station;
