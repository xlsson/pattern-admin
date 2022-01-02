import React, { useState, useEffect } from 'react';
import LoginModal from './components/LoginModal';
import Menu from './components/Menu';
import BikesTable from './components/BikesTable';
import Bike from './components/Bike';
import StationsTable from './components/StationsTable';
import Station from './components/Station';
import UsersTable from './components/UsersTable';
import User from './components/User';
import OverviewMap from './components/OverviewMap';
import Price from './components/Price';

import api from './functions/api.js';
import utils from './functions/utils.js';

function App() {
    const _allCities = {
         _id: "all",
        name: "-- Alla städer --",
        coordinates: {
            northwest: { lat: 58.195259, long: 14.221258 },
            southeast: { lat: 58.195259, long: 14.221258 }
        },
        parking_stations: [],
        charge_stations: []
    };

    const defaultView = (api.token.length === 0) ? "loginModal" : "overviewMap";

    const [view, setView] = useState(defaultView);
    const [params, setParams] = useState({});
    const [loggedInUser, setLoggedInUser] = useState("");
    const [cities, setCities] = useState({});
    const [citiesArray, setCitiesArray] = useState([]);
    const [allCities, setAllCities] = useState(_allCities);
    const [currentCity, setCurrentCity] = useState(allCities);

    useEffect(() => { getCities(); }, []);
    useEffect(() => { setCurrentCity(allCities); }, [allCities]);

    async function getCities() {
        const data = await api.getCities();
        setCitiesArray(data.cities);
        addStationsToDefault(data.cities);
        let citiesObject = {};
        data.cities.forEach((city) => {
            citiesObject[city._id] = city;
        });
        setCities(citiesObject);
    }

    function addStationsToDefault(allCities) {
        let park = [];
        let charge = [];
        let allCitiesUpdated = { ..._allCities };

        allCities.forEach((city) => {
            park = park.concat(city.parking_stations);
            charge = charge.concat(city.charge_stations);
        });

        allCitiesUpdated.parking_stations = park;
        allCitiesUpdated.charge_stations = charge;

        setAllCities(allCitiesUpdated);
    }

    function chooseCity(selectedId) {
        if (selectedId === "all") { return setCurrentCity(allCities); }

        setCurrentCity(cities[selectedId]);
    }

    function switchView(view, params={}) {
        // Clears current interval, if active
        utils.stopInterval();

        // Displays chosen view, if token exists
        if (api.token.length > 0) {
            setParams(params);
            setView(view);
            return;
        }
        // Otherwise, show login modal
        setView("loginModal");
    }

    function renderView() {
        switch (view) {
            case "loginModal": return renderLoginModal();
            case "users": return renderUsersTable();
            case "user": return renderUser();
            case "bikes": return renderBikesTable();
            case "bike": return renderBike();
            case "chargeStations": return renderStationsTable("charge");
            case "chargeStation": return renderStation("charge");
            case "parkingStations": return renderStationsTable("parking");
            case "parkingStation": return renderStation("parking");
            case "overviewMap": return renderOverviewMap();
            case "price": return renderPrice();
        }
    }

    function renderLoginModal() {
        return ( <LoginModal
                    api={api}
                    switchView={switchView}
                    setLoggedInUser={setLoggedInUser} /> );
    }

    function renderUsersTable() {
        return ( <UsersTable
                    api={api}
                    cities={cities}
                    switchView={switchView} /> );
    }

    function renderUser() {
        return ( <User
                    api={api}
                    cities={cities}
                    citiesArray={citiesArray}
                    user={params} /> );
    }

    function renderBikesTable() {
        return ( <BikesTable
                    api={api}
                    switchView={switchView}
                    currentCity={currentCity}
                    cities={cities} /> );
    }

    function renderBike() {
        return ( <Bike
                    api={api}
                    utils={utils}
                    bike={params}
                    currentCity={currentCity}
                    cities={cities} /> );
    }

    function renderStationsTable(type) {
        return ( <StationsTable
                    api={api}
                    switchView={switchView}
                    type={type}
                    currentCity={currentCity}
                    cities={cities} /> );
    }

    function renderStation(type) {
        return ( <Station
                    api={api}
                    utils={utils}
                    switchView={switchView}
                    station={params}
                    type={type}
                    currentCity={currentCity}
                    cities={cities} /> );
    }

    function renderOverviewMap() {
        return ( <OverviewMap
                    api={api}
                    utils={utils}
                    currentCity={currentCity}
                    cities={cities} /> );
    }

    function renderPrice() {
        return ( <Price
                    api={api}
                    currentCity={currentCity} /> );
    }

    return (
        <div className="page-wrapper">
            <header>
                <Menu
                    api={api}
                    switchView={switchView}
                    utils={utils}
                    view={view}
                    cities={cities}
                    allCities={allCities}
                    chooseCity={chooseCity}
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser} />
            </header>
            <div className="content">
                {renderView()}
            </div>
        </div>
    );
}

export default App;
