import React from 'react';
import PropTypes from "prop-types";
import { Marker, Popup } from 'react-leaflet';
import BikePopup from './BikePopup';

MapBike.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    bike: PropTypes.object,
    cities: PropTypes.object,
    getBikes: PropTypes.func,
    getIcon: PropTypes.func,
    setMessage: PropTypes.func
};

/**
 * Bike in map 
 *
 * @component
 */
function MapBike(props) {
    const bike = props.bike;
    const position = [bike.coordinates.lat, bike.coordinates.long];

    return (
        <div data-testid="mapbike-wrapper">
            <Marker
                position={position}
                icon={props.getIcon("marker_scooter", [15, 15], [0, 0])}>
                <Popup>
                    <BikePopup
                        api={props.api}
                        utils={props.utils}
                        bike={bike}
                        cities={props.cities}
                        getBikes={props.getBikes}
                        setMessage={props.setMessage} />
                </Popup>
            </Marker>
        </div>
    )
}

export default MapBike;
