import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function BikesTable(props) {
    let [bikes, setBikes] = useState([]);
    let [chargingStations, setChargingStations] = useState([]);
    let [selectedStation, setSelectedStation] = useState("");

    async function getData() {
        bikes = await api.getBikes(props.city._id);
        chargingStations = await api.getChargingStations("all");
        setBikes(bikes);
        setChargingStations(chargingStations);
        setSelectedStation(chargingStations[0]._id);
    };

    useEffect(() => { getData(); }, [props.city._id]);

    async function moveBike(bikeId) {
        await api.moveBike(bikeId, selectedStation);
    }

    function stationSelection(event) {
        setSelectedStation(event.target.value);
    }

    function renderMoveForm(bike) {
        const cityStations = chargingStations.filter(
            (chargingStation) => chargingStation.city_id == bike.city_id);

        return (
            <div>
                <select onChange={stationSelection}>
                    {cityStations.map((station, i) => (
                        <option key={i} value={station._id}>
                            stationsid {station._id}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={() => moveBike(bike._id)}>Boka hämtning</button>
            </div>
        )
    }

    return (
        <div>
            <h1>Cyklar för {props.city.name}</h1>
            <table>
                <>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>city_id</th>
                        <th>charge_id</th>
                        <th>parking_id</th>
                        <th>bike_status</th>
                        <th>battery_status</th>
                        <th>maintenance</th>
                        <th>coordinates</th>
                        <th>Boka hämtning</th>
                    </tr>
                </thead>
                <tbody>
                {bikes.map((bike, i) => (
                    <tr key={i}>
                        <>
                        <td>{bike._id}</td>
                        <td>{bike.city_id}</td>
                        <td>{bike.charge_id}</td>
                        <td>{bike.parking_id}</td>
                        <td>{bike.bike_status}</td>
                        <td>{bike.battery_status}</td>
                        <td>{bike.maintenance}</td>
                        <td>{bike.coordinates[0]}, {bike.coordinates[1]}</td>
                        <td>{(bike.bike_status === "free") && renderMoveForm(bike)}</td>
                        </>
                    </tr>
                ))}
                </tbody>
                </>
            </table>
        </div>
    );
}

export default BikesTable;
