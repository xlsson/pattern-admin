import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import BikesTable from './components/BikesTable';
import StationsTable from './components/StationsTable';
import ParkingStationsTable from './components/ParkingStationsTable';
import Station from './components/Station';
import UsersTable from './components/UsersTable';
import User from './components/User';
import OverviewMap from './components/OverviewMap';
import Price from './components/Price';

import api from './functions/api.js';

function App() {
    const [view, setView] = useState("overviewMap");
    const [params, setParams] = useState({});

    const swedenData = {
         _id: "all",
        name: "Sverige",
        coordinates: {
            northwest: { lat: 58.195259, long: 14.221258 },
            southeast: { lat: 58.195259, long: 14.221258 }
        },
        parking_stations: [],
        charge_stations: []
    };
    const [allCities, setAllCities] = useState(swedenData);

    const [cityId, setCityId] = useState("all");
    const [cities, setCities] = useState({});
    const [currentCity, setCurrentCity] = useState(allCities);

    useEffect(() => { api.getCities(afterGetCities); }, []);
    useEffect(() => { setCurrentCity(allCities); }, [allCities]);


    function afterGetCities(data) {
        addStationsToDefault(data.cities);

        let citiesObject = {};
        data.cities.forEach((city) => {
            citiesObject[city._id] = city;
        });
        console.log(citiesObject);

        setCities(citiesObject);
    }

    function addStationsToDefault(allCities) {
        let park = [];
        let charge = [];
        let swedenData_ = { ...swedenData };

        allCities.forEach((city) => {
            park = park.concat(city.parking_stations);
            charge = charge.concat(city.charge_stations);
        });

        swedenData_.parking_stations = park;
        swedenData_.charge_stations = charge;

        setAllCities(swedenData_);
    }

    function chooseCity(selectedId) {
        setCityId(selectedId);
        if (selectedId === "all") {
            setCurrentCity(allCities);
            return;
        }

        setCurrentCity(cities[selectedId]);
    }

    function switchView(view, params={}) {
        setParams(params);
        setView(view);
    }

    function renderUsersTable() {
        return ( <UsersTable switchView={switchView} /> ); }

    function renderUser() {
        return ( <User params={params} /> ); }

    function renderBikesTable() {
        return ( <BikesTable currentCity={currentCity} cities={cities} /> ); }

    function renderStationsTable(type) {
        return ( <StationsTable switchView={switchView} type={type} currentCity={currentCity} cities={cities} /> ); }

    function renderStation(type) {
        return ( <Station station={params} type={type} cities={cities} /> ); }

    function renderOverviewMap() {
        return ( <OverviewMap currentCity={currentCity} cities={cities} /> ); }

    function renderPrice() {
        return ( <Price city={currentCity} /> ); }

    return (
        <div className="page-wrapper">
            <header>
                <Menu
                    switchView={switchView}
                    view={view}
                    cities={cities}
                    allCities={allCities}
                    chooseCity={chooseCity}
                    />
            </header>
            <div className="content">
                {(view === "users") && renderUsersTable()}
                {(view === "user") && renderUser()}
                {(view === "bikes") && renderBikesTable()}
                {(view === "chargeStations") && renderStationsTable("charge")}
                {(view === "chargeStation") && renderStation("charge")}
                {(view === "parkingStations") && renderStationsTable("parking")}
                {(view === "parkingStation") && renderStation("parking")}
                {(view === "overviewMap") && renderOverviewMap()}
                {(view === "price") && renderPrice()}
            </div>
        </div>
    );
}

export default App;
