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

    const defaultView = (api.token.length === 0) ? "loginModal" : "overviewMap";

    const [view, setView] = useState(defaultView);
    const [params, setParams] = useState({});
    const [loggedInUser, setLoggedInUser] = useState("");
    const [cities, setCities] = useState({});
    const [allCities, setAllCities] = useState(swedenData);
    const [currentCity, setCurrentCity] = useState(allCities);

    useEffect(() => { getCities(); }, []);
    useEffect(() => { setCurrentCity(allCities); }, [allCities]);

    async function getCities() {
        const data = await api.getCities();
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
        setView("loginModal");
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
                    switchView={switchView} /> );
    }

    function renderUser() {
        return ( <User
                    api={api}
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
                    bike={params}
                    currentCity={currentCity}
                    cities={cities} /> );
    }

    function renderStationsTable(type) {
        return ( <StationsTable
                    switchView={switchView}
                    type={type}
                    currentCity={currentCity}
                    cities={cities} /> );
    }

    function renderStation(type) {
        return ( <Station
                    api={api}
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
                {(view === "loginModal") && renderLoginModal()}
                {(view === "users") && renderUsersTable()}
                {(view === "user") && renderUser()}
                {(view === "bikes") && renderBikesTable()}
                {(view === "bike") && renderBike()}
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
