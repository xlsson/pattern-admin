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
    citiesArray: PropTypes.array,
    setMessage: PropTypes.func
};

function Station(props) {
    const [bikes, setBikes] = useState([]);

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

    const center = props.utils.getCenter(coords);

    props.utils.setView(center, 17);

    async function getBikesAtStation() {
        const data = await props.api.getBikes(station.city_id);
        const allBikes = data.bikes;
        const filteredBikes = allBikes.filter(function(bike) {
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
                    <th data-testid="nr-of-bikes">Cyklar på stationen ({bikes.length} st)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-testid="city">{station.city_name}</td>

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
            bikes={bikes}
            city={props.currentCity}
            cities={props.cities}
            citiesArray={props.citiesArray}
            autoFetchIsOn={false}
            chargeStations={chargeStation}
            parkingStations={parkingStation}
            getBikes={getBikesAtStation}
            setMessage={props.setMessage}/>
        </>
    );
}

export default Station;
