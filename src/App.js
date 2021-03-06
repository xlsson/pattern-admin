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

/**
 * Parent component for the SPA app. "Routes" to the different views, imports
 * the modules api.js and utils.js, fetches city data which gets trickled
 * down as props to child components.
 *
 * API calls: getCities()
 *
 * @component
 */
function App() {
    const views = {
        loginModal: function() { return renderLoginModal(); },
        users: function() { return renderUsersTable(); },
        user: function() { return renderUser(); },
        bikes: function() { return renderBikesTable(); },
        bike: function() { return renderBike(); },
        chargeStations: function() { return renderStationsTable("charge"); },
        chargeStation: function() { return renderStation("charge"); },
        parkingStations: function() { return renderStationsTable("parking"); },
        parkingStation: function() { return renderStation("parking"); },
        overviewMap: function() { return renderOverviewMap(); },
        price: function() { return renderPrice(); }
    };

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

        const monoCityWithStations = utils.addStations(data.cities, utils.monoCity);
        setMonoCity(monoCityWithStations);

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
        return views[view]();
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
                    utils={utils}
                    cities={cities}
                    switchView={switchView}
                    setMessage={setMessage} /> );
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
        <div className="page-wrapper" data-testid="page-wrapper">
                {api.token && renderMenu()}
            <div className="content" data-testid="content-wrapper">
                {renderView()}
                {message && renderFlashMessage(message)}
            </div>
        </div>
    );
}

export default App;
