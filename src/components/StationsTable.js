import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

StationsTable.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    switchView: PropTypes.func,
    type: PropTypes.string,
    currentCity: PropTypes.object,
    cities: PropTypes.object
};

function StationsTable(props) {
    const [stations, setStations] = useState([]);
    const [bikesPerStation, setBikesPerStation] = useState({});

    const type = props.type;
    const currentCity = props.currentCity;
    const cities = props.cities;

    const title = (type === "charge") ? "Laddningsstationer" : "Parkeringsstationer";

    useEffect(() => {
        const _stations = props.utils.createStationsArray(type, currentCity, cities);
        setStations(_stations);
        countBikes(_stations);
    }, [props]);

    async function countBikes(_stations) {
        const result = await props.utils.countBikes(_stations, type, currentCity._id);
        setBikesPerStation(result);
    }


    function handleClick(i) {
        props.switchView(`${type}Station`, stations[i]);
    }

    return (
        <div>
            <h1>{title}</h1>
            <table>
                <>
                <thead>
                    <tr>
                        <th>Stad</th>
                        <th>Stationsnamn</th>
                        <th className="text-align-center">Antal cyklar</th>
                    </tr>
                </thead>
                <tbody>
                {stations.map((station, i) => (
                    <tr
                        className="pointer-cursor"
                        key={i}
                        onClick={() => handleClick(i)}>
                        <>
                        <td>{station.city_name}</td>
                        <td>
                        <div className="icon-and-label-wrapper">
                            <span className="material-icons">
                            {(type === "charge") ? "battery_charging_full" : "local_parking"}
                            </span>
                            <div>{station.name}</div>
                        </div>
                        </td>
                        <td className="text-align-center">{bikesPerStation[station._id] || 0}</td>
                        </>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default StationsTable;
