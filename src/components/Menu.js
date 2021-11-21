import React, { useState, useEffect } from 'react';

function Menu() {
    function handleClick(choice) {
        console.log(choice);
    }

    return (
        <ul className="menu-wrapper">
            <li onClick={handleClick("city")}>Byt stad</li>
            <li onClick={handleClick("users")}>Kunder</li>
            <li onClick={handleClick("charge")}>Laddningsstationer</li>
            <li onClick={handleClick("parking")}>Parkeringszoner</li>
            <li onClick={handleClick("map")}>Karta</li>
        </ul>
    );
}

export default Menu;
