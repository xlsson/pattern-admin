import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import BikePosition from './BikePosition';
import BikesTableMaintenance from './BikesTableMaintenance';

BikesTable.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    switchView: PropTypes.func,
    setMessage: PropTypes.func,
    currentCity: PropTypes.object,
    cities: PropTypes.object
};

/**
 * Table showing all bikes in the database
 *
 * API calls: getBikes()
 *
 * @component
 */
function BikesTable(props) {
    const [bikes, setBikes] = useState([]);

    const currentCity = props.currentCity;
    const cities = props.cities;

    useEffect(() => { getBikes(); }, [props]);

    async function getBikes(button=false) {
        const data = await props.api.getBikes(currentCity._id);
        setBikes(data.bikes);
        if (button) {
            const message = props.utils.createFlashMessage(data, "getDataButton");
            props.setMessage(message);
        }
    }

    function handleClick(bike) {
        props.switchView(`bike`, bike);
    }

    function renderPosition(bike) {
        return (
            <BikePosition
                utils={props.utils}
                bike={bike}
                cities={props.cities} />
        )
    }

    function renderMaintenance(bike) {
        return (
            <BikesTableMaintenance
                api={props.api}
                utils={props.utils}
                bike={bike}
                getBikes={getBikes}
                cities={cities}
                setMessage={props.setMessage} />
        )
    }

    return (
        <div>
            <div className="title-wrapper">
                <h1 data-testid="bikes-title">Cyklar</h1>
                <button type="button" data-testid="fetch-data-button" onClick={() => getBikes(true)}>
                    Uppdatera
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
                        <th className="text-align-center">Batteriniv??</th>
                        <th>H??mtning och underh??ll</th>
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
                            <div className="icon-and-label-wrapper">
                                <span className="material-icons">
                                    {(bike.bike_status === "available") ? "check" : "close"}
                                </span>
                                <div>{(bike.bike_status === "available") ? "Ja" : "Nej"}</div>
                            </div>
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
