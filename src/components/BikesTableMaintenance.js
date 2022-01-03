import React from 'react';
import PropTypes from "prop-types";
import BikeEndMaintenance from './BikeEndMaintenance';
import BikeMoveForm from './BikeMoveForm';

BikesTableMaintenance.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    getBikes: PropTypes.func,
    bike: PropTypes.object,
    cities: PropTypes.object,
    setMessage: PropTypes.func
};

function BikesTableMaintenance(props) {
    const bike = props.bike;
    const cities = props.cities;

    function renderEndMaintenance(bike) {
        return (
            <BikeEndMaintenance
                api={props.api}
                utils={props.utils}
                getBikes={props.getBikes}
                bike={bike}
                setMessage={props.setMessage} />
        )
    }

    function renderMoveForm(bike) {
        let chargeStations = cities[bike.city_id].charge_stations;
        return (
            <BikeMoveForm
                api={props.api}
                utils={props.utils}
                bike={bike}
                getBikes={props.getBikes}
                chargeStations={chargeStations}
                setMessage={props.setMessage} />
        )
    }

    function renderInfo() {
        return (
            <div className="icon-and-label-wrapper">
                <span className="material-icons">build</span>
                <div>Underhåll{(bike.battery_status < 20) ? " och laddning " : " "}pågår</div>
                {(bike.battery_status > 20) && renderEndMaintenance(bike)}
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
