import React from 'react';
import PropTypes from "prop-types";

import api from '../functions/api.js';

BikeEndMaintenance.propTypes = {
    redrawBikes: PropTypes.redrawBikes,
    bike: PropTypes.object
};

function BikeEndMaintenance(props) {
    const bike = props.bike;

    function endMaintenance() {
        api.orderMaintenance(bike._id, false, afterEndMaintenance);
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
