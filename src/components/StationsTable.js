import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

StationsTable.propTypes = {
    switchView: PropTypes.func,
    type: PropTypes.string,
    currentCity: PropTypes.object,
    cities: PropTypes.object
};

function StationsTable(props) {
    const [stations, setStations] = useState([]);

    let title = (props.type === "charge") ? "Laddningsstationer" : "Parkeringsstationer";

    useEffect(() => {
        let _stations = createStationsArray();
        setStations(_stations);
    }, [props]);

    function createStationsArray() {
        let _stations = [];

        if (props.currentCity._id !== "all") {
            _stations = props.currentCity[`${props.type}_stations`];
            _stations.forEach((station) => { station.city_id = props.currentCity._id;  });
            return _stations;
        }

        Object.keys(props.cities).forEach((key) => {
            if (key !== "all") {
                props.cities[key][`${props.type}_stations`].forEach((station) => {
                    station.city_id = key;
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
            <h1>{title} ({props.currentCity.name})</h1>
            <table>
                <>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Stad</th>
                        <th>Koordinater</th>
                    </tr>
                </thead>
                <tbody>
                {stations.map((station, i) => (
                    <tr
                        className="pointer-cursor"
                        key={i}
                        onClick={() => handleClick(i)}>
                        <>
                        <td>{station.name}</td>
                        <td>{props.cities[station.city_id].name}</td>
                        <td>
                            {station.coordinates.northwest.lat}, {station.coordinates.northwest.long},
                            {station.coordinates.southeast.lat}, {station.coordinates.southeast.long}
                        </td>
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
