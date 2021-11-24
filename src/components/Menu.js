import React, { useState, useEffect } from 'react';

import ChangeCity from './ChangeCity';

function Menu(props) {
    function handleClick(choice) {
        props.menuChoice(choice);
    }

    function handleCityChange(cityId) {
        console.log(cityId);
    }

    return (
        <div className="header-wrapper">
            <ChangeCity cityChoice={handleCityChange} />
            <ul className="menu-wrapper">
                <li onClick={() => handleClick("users")}>Kunder</li>
                <li onClick={() => handleClick("bikes")}>Cyklar</li>
                <li onClick={() => handleClick("chargingStations")}>Laddningsstationer</li>
                <li onClick={() => handleClick("parkingStations")}>Parkeringszoner</li>
                <li onClick={() => handleClick("map")}>Karta</li>
            </ul>
        </div>
    );
}

export default Menu;
