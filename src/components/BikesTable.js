import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import BikePosition from './BikePosition';
import BikesTableMaintenance from './BikesTableMaintenance';

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

    function renderPosition(bike) {
        return (
            <BikePosition
                bike={bike}
                cities={props.cities} />
        )
    }

    function renderMaintenance(bike) {
        return (
            <BikesTableMaintenance
                api={props.api}
                bike={bike}
                getBikes={getBikes}
                cities={cities} />
        )
    }

    return (
        <div>
            <div className="title-wrapper">
                <h1>Cyklar</h1>
                <button type="button" onClick={getBikes}>
                    Hämta senaste cykeldata
                </button>
            </div>
            <table>
                <>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Stad</th>
                        <th>Position</th>
                        <th>Ledig</th>
                        <th className="text-align-center">Batterinivå</th>
                        <th>Hämtning och underhåll</th>
                    </tr>
                </thead>
                <tbody>
                {bikes.map((bike, i) => (
                    <tr key={i}>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>{bike._id}</td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>{cities[bike.city_id].name}</td>
                        <td className="pointer-cursor text-align-center"
                            onClick={() => handleClick(bike)}>
                            {renderPosition(bike)}
                        </td>
                        <td className="pointer-cursor"
                            onClick={() => handleClick(bike)}>
                            {(bike.bike_status === "available") ? "Ja" : "Nej"}
                        </td>
                        <td className="pointer-cursor text-align-center"
                            onClick={() => handleClick(bike)}>
                            {parseInt(bike.battery_status)}
                        </td>
                        <td>
                            {renderMaintenance(bike)}
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
