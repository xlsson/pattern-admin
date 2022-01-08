import React from 'react';
import PropTypes from "prop-types";
import { Marker, Popup, Rectangle } from 'react-leaflet';

MapStation.propTypes = {
    type: PropTypes.string,
    station: PropTypes.object,
    getIcon: PropTypes.func
};

function MapStation(props) {
    const station = props.station;
    const type = props.type;

    const color = (type === "parking") ? "blue" : "green";
    const options = { color: color };
    const coords = station.coordinates;

    const markerImg = `bubble_${type}`;

    const markerPosition = [
        coords.northwest.lat,
        ((coords.northwest.long + coords.southeast.long)/2)
    ];

    const bounds = [
        [coords.northwest.lat, coords.northwest.long],
        [coords.southeast.lat, coords.southeast.long]
    ];

    return (
        <div data-testid="mapstation-wrapper">
            <Rectangle bounds={bounds} pathOptions={options} />
            <Marker position={markerPosition} icon={props.getIcon(markerImg, [15, 35], [1, -10])}>
                <Popup>
                    <div className="station-popup">
                        <div className="station-icon-wrapper">
                            <span className="material-icons">
                                {(type === "charge") ? "battery_charging_full" : "local_parking"}
                            </span>
                            <div className="station-icon-text">{station.name}</div>
                        </div>
                    </div>
                </Popup>
            </Marker>
        </div>
    );
}

export default MapStation;
