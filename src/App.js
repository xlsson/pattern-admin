import React, { useState } from 'react';
import Menu from './components/Menu';
import BikesTable from './components/BikesTable';
import ChargingStationsTable from './components/ChargingStationsTable';
import ParkingStationsTable from './components/ParkingStationsTable';
import UsersTable from './components/UsersTable';
import WelcomePage from './components/WelcomePage';

function App() {
    const [mainContent, setMainContent] = useState("start");
    const [city, setCity] = useState("all");

    function handleMainContent(choice) { setMainContent(choice); }
    function handleCityChoice(city) { setCity(city); }

    function renderWelcomePage() { return ( <WelcomePage /> ); }
    function renderUsersTable() { return ( <UsersTable /> ); }
    function renderBikesTable() { return ( <BikesTable city={city} /> ); }
    function renderChargingStationsTable() { return ( <ChargingStationsTable city={city} /> ); }
    function renderParkingStationsTable() { return ( <ParkingStationsTable city={city} /> ); }

    return (
        <div className="page-wrapper">
            <header>
                <Menu
                    mainContent={handleMainContent}
                    cityChoice={handleCityChoice}
                    />
            </header>
            <div className="content">
                {(mainContent === "start") && renderWelcomePage()}
                {(mainContent === "users") && renderUsersTable()}
                {(mainContent === "bikes") && renderBikesTable()}
                {(mainContent === "chargingStations") && renderChargingStationsTable()}
                {(mainContent === "parkingStations") && renderParkingStationsTable()}
            </div>
        </div>
    );
}

export default App;
