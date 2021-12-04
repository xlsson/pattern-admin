import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function ChangeCity(props) {
    const [selectedId, setSelectedId] = useState("all");

    let allOptions = props.cities;
    allOptions[props.allCities._id] = props.allCities;

    let cityIds = Object.keys(allOptions);

    function handleChange(event) {
        setSelectedId(event.target.value);
        props.chooseCity(event.target.value);
    }

    return (
        <select
            value={selectedId}
            onChange={handleChange}>
            {cityIds.map((cityId, i) => (
                <option
                    key={i}
                    value={cityId}>
                        {allOptions[cityId].name}
                    </option>
            ))}
        </select>
    );
}

export default ChangeCity;
