import React, { useState } from 'react';
import PropTypes from "prop-types";

ChangeCity.propTypes = {
    allCities: PropTypes.object,
    cities: PropTypes.object,
    chooseCity: PropTypes.func
};

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
