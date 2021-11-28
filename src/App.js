import React, { useState } from 'react';
import Menu from './components/Menu';
import BikesTable from './components/BikesTable';
import ChargingStationsTable from './components/ChargingStationsTable';
import ParkingStationsTable from './components/ParkingStationsTable';
import UsersTable from './components/UsersTable';
import WelcomePage from './components/WelcomePage';
import Map from './components/Map';

function App() {
    const defaultCity = {
         _id: "all",
        name: "alla städer",
        coordinates: [58.195259, 14.221258, 58.195259, 14.221258]
    };

    const [mainContent, setMainContent] = useState("start");
    const [city, setCity] = useState(defaultCity);

    function handleMainContent(choice) { setMainContent(choice); }
    function handleCityChoice(city) {
        setCity(city);
    }

    function renderWelcomePage() { return ( <WelcomePage /> ); }
    function renderUsersTable() { return ( <UsersTable /> ); }
    function renderBikesTable() { return ( <BikesTable city={city} /> ); }
    function renderChargingStationsTable() { return ( <ChargingStationsTable city={city} /> ); }
    function renderParkingStationsTable() { return ( <ParkingStationsTable city={city} /> ); }
    function renderMap() { return ( <Map city={city} /> ); }

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
                {(mainContent === "map") && renderMap()}
            </div>
        </div>
    );
}

export default App;
