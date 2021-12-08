import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function BikeEndMaintenance(props) {
    const bike = props.bike;

    function endMaintenance() {
        api.endMaintenance(bike._id, afterEndMaintenance);
    }

    function afterEndMaintenance(data) {
        console.log(data);
    }
    return (
            <button type="button" onClick={endMaintenance}>Avsluta underhåll</button>
    )
}

export default BikeEndMaintenance;
