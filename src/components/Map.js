import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, MapConsumer, Marker, Popup } from 'react-leaflet';

import api from '../functions/api.js';

function Map(props) {
    const sweden = [58.195259, 14.221258];
    let [cityCoords, setCityCoords] = useState(sweden);
    let [zoom, setZoom] = useState(6);

    async function getMapData() {
        if (props.city === "all") {
            setCityCoords(sweden);
            setZoom(6);
            return;
        }

        const city = await api.getCities(props.city);
        const lat = (city[0].coordinates[0] + city[0].coordinates[2])/2;
        const long = (city[0].coordinates[1] + city[0].coordinates[3])/2;
        const coords = [lat, long];
        setCityCoords(coords);
        setZoom(13);
    };

    useEffect(() => { getMapData(); }, [props.city]);

    return (
        <>
        <h1>Karta</h1>
        <div id="map-wrapper-main">
            <MapContainer
                id="map"
                center={cityCoords}
                zoom={zoom}
                scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapConsumer>
                    {(map) => {
                        map.setView(cityCoords, zoom);
                        return null;
                    }}
                </MapConsumer>
                <Marker position={cityCoords}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
        </>
    );
}

export default Map;
