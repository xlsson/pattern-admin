import React from 'react';
import PropTypes from "prop-types";
import { Rectangle } from 'react-leaflet';

MapCityLimits.propTypes = {
    coords: PropTypes.object
};

function MapCityLimits(props) {
    const options = { color: "red", fillOpacity: 0, weight: 1 };

    const bounds = [
        [props.coords.northwest.lat, props.coords.northwest.long],
        [props.coords.southeast.lat, props.coords.southeast.long]
    ];

    return (
        <>
            <Rectangle bounds={bounds} pathOptions={options} />
        </>
    );
}

export default MapCityLimits;
