import React, { useState } from 'react';
import Menu from './components/Menu';
import BikesTable from './components/BikesTable';
import ChargingStationsTable from './components/ChargingStationsTable';
import ParkingStationsTable from './components/ParkingStationsTable';
import UsersTable from './components/UsersTable';
import User from './components/User';
import WelcomePage from './components/WelcomePage';
import Map from './components/Map';

function App() {
    const defaultCity = {
         _id: "all",
        name: "alla städer",
        coordinates: [58.195259, 14.221258, 58.195259, 14.221258]
    };

    const [view, setView] = useState("start");
    const [params, setParams] = useState({});
    const [city, setCity] = useState(defaultCity);

    function switchView(view, params={}) {
        setParams(params);
        setView(view);
    }
    function handleCityChoice(city) {
        setCity(city);
    }

    function renderWelcomePage() { return ( <WelcomePage /> ); }
    function renderUsersTable() { return ( <UsersTable switchView={switchView} /> ); }
    function renderUser() { return ( <User params={params} /> ); }
    function renderBikesTable() { return ( <BikesTable city={city} /> ); }
    function renderChargingStationsTable() { return ( <ChargingStationsTable city={city} /> ); }
    function renderParkingStationsTable() { return ( <ParkingStationsTable city={city} /> ); }
    function renderMap() { return ( <Map city={city} /> ); }

    return (
        <div className="page-wrapper">
            <header>
                <Menu
                    switchView={switchView}
                    view={view}
                    cityChoice={handleCityChoice}
                    />
            </header>
            <div className="content">
                {(view === "start") && renderWelcomePage()}
                {(view === "users") && renderUsersTable()}
                {(view === "user") && renderUser()}
                {(view === "bikes") && renderBikesTable()}
                {(view === "chargingStations") && renderChargingStationsTable()}
                {(view === "parkingStations") && renderParkingStationsTable()}
                {(view === "map") && renderMap()}
            </div>
        </div>
    );
}

export default App;
