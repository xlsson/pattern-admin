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

    const title = (props.type === "charge") ? "Laddningsstationer" : "Parkeringsstationer";

    useEffect(() => {
        const _stations = props.utils.createStationsArray(props.type, props.currentCity, props.cities);
        setStations(_stations);
        createBikesPerStation(_stations);
    }, [props]);

    async function createBikesPerStation(_stations) {
        const _bikes = await getBikes();
        const _bikesPerStation = countBikes(_bikes, _stations);
        setBikesPerStation(_bikesPerStation);
    }

    async function getBikes() {
        const data = await props.api.getBikes(props.currentCity._id);
        return data.bikes;
    }

    function countBikes(_bikes, _stations) {
        const _bikesPerStation = {};

        _stations.forEach((station) => { _bikesPerStation[station._id] = 0; });

        let stationId;
        _bikes.forEach((_bike) => {
            stationId = _bike[`${props.type}_id`];
            if (stationId) { _bikesPerStation[stationId] += 1; }
        });

        return _bikesPerStation;
    }

    function handleClick(i) {
        props.switchView(`${props.type}Station`, stations[i]);
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
                            {(props.type === "charge") ? "battery_charging_full" : "local_parking"}
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
