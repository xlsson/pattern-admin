import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import BikesTable from './components/BikesTable';
import ChargingStationsTable from './components/ChargingStationsTable';
import ParkingStationsTable from './components/ParkingStationsTable';
import UsersTable from './components/UsersTable';
import WelcomePage from './components/WelcomePage';

function App() {
    const [menuChoice, setmenuChoice] = useState("start");

    function handleMenuChoice(choice) {
        setmenuChoice(choice);
    }

    useEffect(() => {
        console.log(menuChoice);
    }, [menuChoice]);


    function renderWelcomePage() { return ( <WelcomePage /> ); }
    function renderUsersTable() { return ( <UsersTable /> ); }
    function renderBikesTable() { return ( <BikesTable /> ); }
    function renderChargingStationsTable() { return ( <ChargingStationsTable /> ); }
    function renderParkingStationsTable() { return ( <ParkingStationsTable /> ); }

    return (
        <div className="page-wrapper">
            <header>
                <Menu
                    menuChoice={handleMenuChoice}
                    />
            </header>
            <div className="content">
                {(menuChoice === "start") && renderWelcomePage()}
                {(menuChoice === "users") && renderUsersTable()}
                {(menuChoice === "bikes") && renderBikesTable()}
                {(menuChoice === "chargingStations") && renderChargingStationsTable()}
                {(menuChoice === "parkingStations") && renderParkingStationsTable()}
            </div>
        </div>
    );
}

export default App;
