import React from 'react';
import PropTypes from "prop-types";

BikeEndMaintenance.propTypes = {
    api: PropTypes.object,
    updateBikes: PropTypes.func,
    bike: PropTypes.object
};

function BikeEndMaintenance(props) {
    const bike = props.bike;

    async function endMaintenance() {
        const data = await props.api.orderMaintenance(bike._id, false);
        console.log(data);
        props.updateBikes();
    }

    return (
            <button type="button" onClick={endMaintenance}>Avsluta underhåll</button>
    )
}

export default BikeEndMaintenance;
