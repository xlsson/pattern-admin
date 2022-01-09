import React, { useState } from 'react';
import PropTypes from "prop-types";

ChangeCity.propTypes = {
    monoCity: PropTypes.object,
    cities: PropTypes.object,
    chooseCity: PropTypes.func
};

function ChangeCity(props) {
    const [selectedId, setSelectedId] = useState("all");

    const allOptions = props.cities;
    allOptions["all"] = props.monoCity;

    const cityIds = Object.keys(allOptions);

    function handleChange(event) {
        setSelectedId(event.target.value);
        props.chooseCity(event.target.value);
    }

    return (
        <div className="change-city-wrapper">
            <div className="label">Visar data för:</div>
            <select
                data-testid="changeCityDropdown"
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
        </div>
    );
}

export default ChangeCity;
