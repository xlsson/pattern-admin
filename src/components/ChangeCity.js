import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function ChangeCity(props) {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setCities(api.getCities());
    }, [cities]);

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
