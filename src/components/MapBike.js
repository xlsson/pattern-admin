import React from 'react';
import PropTypes from "prop-types";
import { Marker, Popup } from 'react-leaflet';
import BikePopup from './BikePopup';

MapBike.propTypes = {
    api: PropTypes.object,
    bike: PropTypes.object,
    mapInstance: PropTypes.object,
    cities: PropTypes.object,
    redrawBikes: PropTypes.func,
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
                        bike={bike}
                        mapInstance={props.mapInstance}
                        cities={props.cities}
                        redrawBikes={props.redrawBikes} />
                </Popup>
            </Marker>
        </div>
    )
}

export default MapBike;
