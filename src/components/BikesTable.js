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
            <h1>Cyklar ({currentCity.name})</h1>
            <table>
                <>
                <thead>
                    <tr>
                        <th>Stad</th>
                        <th>Placering</th>
                        <th>Status</th>
                        <th>Batterinivå</th>
                        <th>Koordinater</th>
                        <th>Boka hämtning till:</th>
                    </tr>
                </thead>
                <tbody>
                {bikes.map((bike, i) => (
                    <tr key={i}>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>{cities[bike.city_id].name}</td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {(bike.charge_id) && "Laddningsstation"}
                            {(bike.parking_id) && "Parkeringsstation"}
                            {(!bike.parking_id && !bike.charge_id) && "Utanför station"}
                        </td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {bike.bike_status}
                            {(bike.maintenance) && ", Genomgår underhåll"}</td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {bike.battery_status}</td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {bike.coordinates.lat}, {bike.coordinates.long}
                        </td>
                        <td>
                            {(bike.bike_status === "available") && renderMoveForm(bike)}
                            {(bike.maintenance && (bike.battery_status === 100)) && renderEndMaintenance(bike)}
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
