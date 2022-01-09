import React from 'react';
import PropTypes from "prop-types";
import { Rectangle } from 'react-leaflet';

MapCityLimits.propTypes = {
    city: PropTypes.object,
    utils: PropTypes.object,
    selectedId: PropTypes.string

};

function MapCityLimits(props) {

    if ((props.selectedId !== "all") && (props.selectedId !== props.city._id)) {
        return null;
    }

    const data = props.utils.getCityLimits(props.selectedId, props.city);

    return (
        <div data-testid="map-city-limits">
            <Rectangle bounds={data.bounds} pathOptions={data.options} />
        </div>
    );
}

export default MapCityLimits;
