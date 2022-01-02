import React from 'react';
import PropTypes from "prop-types";
import BikeEndMaintenance from './BikeEndMaintenance';
import BikeMoveForm from './BikeMoveForm';

BikesTableMaintenance.propTypes = {
    api: PropTypes.object,
    getBikes: PropTypes.func,
    bike: PropTypes.object,
    cities: PropTypes.object
};

function BikesTableMaintenance(props) {
    const bike = props.bike;
    const cities = props.cities;

    function renderEndMaintenance(bike) {
        return (
            <BikeEndMaintenance
                api={props.api}
                getBikes={props.getBikes}
                bike={bike} />
        )
    }

    function renderMoveForm(bike) {
        let chargeStations = cities[bike.city_id].charge_stations;
        return (
            <BikeMoveForm
                api={props.api}
                bike={bike}
                getBikes={props.getBikes}
                chargeStations={chargeStations} />
        )
    }

    function renderInfo() {
        return (
            <div className="icon-and-label-wrapper">
                <span className="material-icons">build</span>
                <div>Underhåll{(bike.battery_status < 20) ? " och laddning " : " "}pågår</div>
                {(bike.battery_status === 100) && renderEndMaintenance(bike)}
            </div>
        )
    }

    return (
        <>
        {(bike.maintenance) && renderInfo()}
        {(bike.bike_status === "available") && renderMoveForm(bike)}
        </>
    );
}

export default BikesTableMaintenance;
