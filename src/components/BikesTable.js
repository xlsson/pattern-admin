import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import BikeMoveForm from './BikeMoveForm';
import BikeEndMaintenance from './BikeEndMaintenance';

BikesTable.propTypes = {
    api: PropTypes.object,
    switchView: PropTypes.func,
    currentCity: PropTypes.object,
    cities: PropTypes.object
};

function BikesTable(props) {
    let [bikes, setBikes] = useState([]);

    let currentCity = props.currentCity;
    let cities = props.cities;

    useEffect(() => { getBikes(); }, [props]);

    async function getBikes() {
        const data = await props.api.getBikes(currentCity._id);
        setBikes(data.bikes);
    }

    function handleClick(bike) {
        props.switchView(`bike`, bike);
    }

    function renderEndMaintenance(bike) {
        return ( <BikeEndMaintenance
                    api={props.api}
                    getBikes={getBikes}
                    bike={bike} />
        )
    }

    function renderMoveForm(bike) {
        let chargeStations = cities[bike.city_id].charge_stations;

        return (
            <BikeMoveForm
                api={props.api}
                bike={bike}
                getBikes={getBikes}
                chargeStations={chargeStations} />
        )
    }

    return (
        <div>
            <h1>Cyklar</h1>
            <table>
                <>
                <thead>
                    <tr>
                        <th>Stad</th>
                        <th className="text-align-center">Position</th>
                        <th>Ledig</th>
                        <th className="text-align-center">Batterinivå</th>
                        <th>Underhåll</th>
                        <th>Boka hämtning</th>
                    </tr>
                </thead>
                <tbody>
                {bikes.map((bike, i) => (
                    <tr key={i}>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>{cities[bike.city_id].name}</td>
                        <td className="pointer-cursor text-align-center"
                            onClick={() => handleClick(bike)}>
                            <span className="material-icons">
                                {(bike.charge_id) && "battery_charging_full"}
                                {(bike.parking_id) && "local_parking"}
                                {(!bike.parking_id && !bike.charge_id) && "wrong_location"}
                            </span>
                        </td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {bike.bike_status}
                        </td>
                        <td className="pointer-cursor text-align-center"
                            onClick={() => handleClick(bike)}>
                            {parseInt(bike.battery_status)}
                        </td>
                        <td>
                            <span className="material-icons">
                            {(bike.maintenance) && "build"}
                            </span>
                            {(bike.maintenance && (bike.battery_status === 100)) && renderEndMaintenance(bike)}
                        </td>
                        <td>
                            {(bike.bike_status === "available") && renderMoveForm(bike)}
                        </td>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default BikesTable;
