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
import FlashMessage from './components/FlashMessage';

import api from './functions/api.js';
import utils from './functions/utils.js';

function App() {
    const defaultView = (api.token.length === 0) ? "loginModal" : "overviewMap";

    const [view, setView] = useState(defaultView);
    const [params, setParams] = useState({});
    const [loggedInUser, setLoggedInUser] = useState();
    const [message, setMessage] = useState(null);

    const [cities, setCities] = useState({});
    const [citiesArray, setCitiesArray] = useState([]);
    const [monoCity, setMonoCity] = useState(utils.monoCity);
    const [currentCity, setCurrentCity] = useState(monoCity);

    useEffect(() => { setCurrentCity(monoCity); }, [monoCity]);

    useEffect(() => { if (api.token.length > 0) { getCities(); } }, [loggedInUser]);

    async function getCities() {
        const data = await api.getCities();

        setCitiesArray(data.cities);

        const monoCityUpdated = utils.addStations(data.cities, utils.monoCity);
        setMonoCity(monoCityUpdated);

        let citiesObject = {};
        data.cities.forEach((city) => { citiesObject[city._id] = city; });
        setCities(citiesObject);
    }

    function chooseCity(selectedId) {
        if (selectedId === "all") { return setCurrentCity(monoCity); }
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

    function renderMenu() {
        return ( <Menu
                    api={api}
                    switchView={switchView}
                    utils={utils}
                    view={view}
                    cities={cities}
                    monoCity={monoCity}
                    chooseCity={chooseCity}
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser} /> );
    }

    function renderFlashMessage() {
        return ( <FlashMessage
                    setMessage={setMessage}
                    message={message} /> );
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
                    utils={utils}
                    cities={cities}
                    citiesArray={citiesArray}
                    user={params}
                    setMessage={setMessage} /> );
    }

    function renderBikesTable() {
        return ( <BikesTable
                    api={api}
                    utils={utils}
                    switchView={switchView}
                    setMessage={setMessage}
                    currentCity={currentCity}
                    cities={cities} /> );
    }

    function renderBike() {
        return ( <Bike
                    api={api}
                    utils={utils}
                    bike={params}
                    switchView={switchView}
                    currentCity={currentCity}
                    cities={cities}
                    citiesArray={citiesArray}
                    setMessage={setMessage} /> );
    }

    function renderStationsTable(type) {
        return ( <StationsTable
                    api={api}
                    utils={utils}
                    switchView={switchView}
                    type={type}
                    currentCity={currentCity}
                    cities={cities}
                    setMessage={setMessage} /> );
    }

    function renderStation(type) {
        return ( <Station
                    api={api}
                    utils={utils}
                    switchView={switchView}
                    station={params}
                    type={type}
                    currentCity={currentCity}
                    cities={cities}
                    citiesArray={citiesArray}
                    setMessage={setMessage} /> );
    }

    function renderOverviewMap() {
        return ( <OverviewMap
                    api={api}
                    utils={utils}
                    currentCity={currentCity}
                    cities={cities}
                    citiesArray={citiesArray}
                    setMessage={setMessage} /> );
    }

    function renderPrice() {
        return ( <Price
                    api={api}
                    utils={utils}
                    currentCity={currentCity}
                    setMessage={setMessage} /> );
    }

    return (
        <div className="page-wrapper">
                {api.token && renderMenu()}
            <div className="content">
                {renderView()}
                {message && renderFlashMessage(message)}
            </div>
        </div>
    );
}

export default App;
