import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

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
