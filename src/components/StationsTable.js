import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

StationsTable.propTypes = {
    api: PropTypes.object,
    switchView: PropTypes.func,
    type: PropTypes.string,
    currentCity: PropTypes.object,
    cities: PropTypes.object
};

function StationsTable(props) {
    const [stations, setStations] = useState([]);

    let title = (props.type === "charge") ? "Laddningsstationer" : "Parkeringsstationer";

    useEffect(() => { createData(); }, [props]);

    async function createData() {
        const _bikes = await getBikes();
        const _bikesPerStation = countBikes(_bikes);
        const _stations = createStationsArray(_bikesPerStation);
        setStations(_stations);
    }

    async function getBikes() {
        const data = await props.api.getBikes(props.currentCity._id);
        return data.bikes;
    }

    function countBikes(_bikes) {
        const _bikesPerStation = {};
        Object.keys(props.cities).forEach((key) => {
            if (key !== "all") {
                props.cities[key][`${props.type}_stations`].forEach((station) => {
                    _bikesPerStation[station._id] = 0;
                });
            }
        });

        let stationId;
        _bikes.forEach((_bike) => {
            stationId = _bike[`${props.type}_id`];
            if (stationId) { _bikesPerStation[stationId] += 1; }
        });

        return _bikesPerStation;
    }

    // Adds city_id to each station and, if "all" is selected, creates one
    // array for all stations
    function createStationsArray(_bikesPerStation) {
        let _stations = [];

        if (props.currentCity._id !== "all") {
            _stations = props.currentCity[`${props.type}_stations`];
            _stations.forEach((station) => {
                station.city_id = props.currentCity._id;
                station.nrOfBikes = _bikesPerStation[station._id];
            });
            return _stations;
        }

        Object.keys(props.cities).forEach((key) => {
            if (key !== "all") {
                props.cities[key][`${props.type}_stations`].forEach((station) => {
                    station.city_id = key;
                    station.nrOfBikes = _bikesPerStation[station._id];
                });
                _stations = _stations.concat(props.cities[key][`${props.type}_stations`]);
            }
        });

        return _stations;
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
                        <td>{props.cities[station.city_id].name}</td>
                        <td>
                        <div className="icon-and-label-wrapper">
                            <span className="material-icons">
                            {(props.type === "charge") ? "battery_charging_full" : "local_parking"}
                            </span>
                            <div>{station.name}</div>
                        </div>
                        </td>
                        <td className="text-align-center">{station.nrOfBikes}</td>
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
