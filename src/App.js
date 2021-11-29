import React, { useState } from 'react';
import Menu from './components/Menu';
import BikesTable from './components/BikesTable';
import ChargingStationsTable from './components/ChargingStationsTable';
import ParkingStationsTable from './components/ParkingStationsTable';
import Station from './components/Station';
import UsersTable from './components/UsersTable';
import User from './components/User';
import OverviewMap from './components/OverviewMap';

function App() {
    const defaultCity = {
         _id: "all",
        name: "alla städer",
        coordinates: [58.195259, 14.221258, 58.195259, 14.221258]
    };

    const [view, setView] = useState("overviewMap");
    const [params, setParams] = useState({});
    const [city, setCity] = useState(defaultCity);

    function switchView(view, params={}) {
        setParams(params);
        setView(view);
    }

    function handleCityChoice(city) {
        setCity(city);
    }

    function renderUsersTable() {
        return ( <UsersTable switchView={switchView} /> ); }

    function renderUser() {
        return ( <User params={params} /> ); }

    function renderBikesTable() {
        return ( <BikesTable city={city} /> ); }

    function renderChargingStationsTable() {
        return ( <ChargingStationsTable switchView={switchView} city={city} /> ); }

    function renderParkingStationsTable() {
        return ( <ParkingStationsTable switchView={switchView} city={city} /> ); }

    function renderStation(type) {
        return ( <Station station={params} type={type} /> ); }

    function renderOverviewMap() {
        return ( <OverviewMap city={city} /> ); }

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
                {(view === "users") && renderUsersTable()}
                {(view === "user") && renderUser()}
                {(view === "bikes") && renderBikesTable()}
                {(view === "chargingStations") && renderChargingStationsTable()}
                {(view === "chargingStation") && renderStation("charging")}
                {(view === "parkingStations") && renderParkingStationsTable()}
                {(view === "parkingStation") && renderStation("parking")}
                {(view === "overviewMap") && renderOverviewMap()}
            </div>
        </div>
    );
}

export default App;
