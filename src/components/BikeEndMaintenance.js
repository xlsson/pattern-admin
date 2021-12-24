import React from 'react';
import PropTypes from "prop-types";

BikeEndMaintenance.propTypes = {
    api: PropTypes.object,
    redrawBikes: PropTypes.func,
    bike: PropTypes.object
};

function BikeEndMaintenance(props) {
    const bike = props.bike;

    function endMaintenance() {
        props.api.orderMaintenance(bike._id, false, afterEndMaintenance);
    }

    function afterEndMaintenance(data) {
        console.log(data);
        props.redrawBikes();
    }
    return (
            <button type="button" onClick={endMaintenance}>Avsluta underhåll</button>
    )
}

export default BikeEndMaintenance;
