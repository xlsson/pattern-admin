import React from 'react';
import PropTypes from "prop-types";
import { Marker, Popup } from 'react-leaflet';
import BikePopup from './BikePopup';

MapBike.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    bike: PropTypes.object,
    cities: PropTypes.object,
    updateBikes: PropTypes.func,
    getIcon: PropTypes.func
};

function MapBike(props) {
    const bike = props.bike;
    const position = [bike.coordinates.lat, bike.coordinates.long];

    return (
        <div>
            <Marker position={position} icon={props.getIcon("marker_scooter", [15, 15], [0, 0])}>
                <Popup>
                    <BikePopup
                        api={props.api}
                        utils={props.utils}
                        bike={bike}
                        cities={props.cities}
                        updateBikes={props.updateBikes} />
                </Popup>
            </Marker>
        </div>
    )
}

export default MapBike;
