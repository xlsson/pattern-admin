import React, { useState } from 'react';
import PropTypes from "prop-types";
import Map from './Map';
import BikePosition from './BikePosition';

Bike.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    bike: PropTypes.object,
    currentCity: PropTypes.object,
    cities: PropTypes.object,
    setMessage: PropTypes.func
};

function Bike(props) {
    const [bikes, setBikes] = useState([props.bike]);
    const cities = props.cities;
    const bike = props.bike;
    const chargeStations = cities[props.bike.city_id].charge_stations;
    const parkingStations = cities[props.bike.city_id].parking_stations;
    const center = [ props.bike.coordinates.lat, props.bike.coordinates.long ];

    props.utils.mapInstance.setView(center, 20);

    async function getThisBike() {
        const data = await props.api.getBikes(props.bike.city_id);
        const allBikes = data.bikes;

        const filteredBikes = allBikes.filter(function(bike) {
          return bike._id === props.bike._id;
        });

        setBikes(filteredBikes);
    }

    function renderPosition(bike) {
        return (
            <BikePosition
                utils={props.utils}
                bike={bike}
                cities={cities} />
        )
    }

    return (
        <>
        <h1>Cykel</h1>
        <table>
            <>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Stad</th>
                    <th>Position</th>
                    <th>Ledig</th>
                    <th className="text-align-center">Batterinivå</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{bike._id}</td>
                    <td data-testid="city">
                        {cities[bike.city_id].name}
                    </td>
                    <td className="text-align-center">
                        {renderPosition(bike)}
                    </td>
                    <td data-testid="status">
                        <div className="icon-and-label-wrapper">
                            <span className="material-icons">
                                {(bike.bike_status === "available") ? "check" : "close"}
                            </span>
                            <div>{(bike.bike_status === "available") ? "Ja" : "Nej"}</div>
                            <span className="material-icons">
                                {(bike.maintenance) && "build"}
                            </span>
                            <div>{(bike.maintenance) && "Underhåll pågår"}</div>
                        </div>
                    </td>
                    <td data-testid="batteryStatus"
                        className="text-align-center">
                        {parseInt(bike.battery_status)}
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
            cities={cities}
            chargeStations={chargeStations}
            parkingStations={parkingStations}
            getBikes={getThisBike}
            setMessage={props.setMessage}/>
        </>
    );
}

export default Bike;
