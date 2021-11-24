import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function ChangeCity(props) {
    let [cities, setCities] = useState([]);

    useEffect(() => { setCities(cities); }, [cities]);

    (async function getCities() {
        const defaultOption = [{ _id: "all", name: "Alla städer" }];
        const citiesFromServer = await api.getCities("all");

        cities = defaultOption.concat(citiesFromServer);
    })();

    function handleChange(event) {
        props.cityChoice(event.target.value);
    }

    return (
        <select
            onChange={handleChange}>
            {cities.map((city, i) => (
                <option
                    key={i}
                    value={city._id}>
                        {city.name}
                    </option>
            ))}
        </select>
    );
}

export default ChangeCity;
