import React from 'react';
import PropTypes from "prop-types";

BikeEndMaintenance.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    getBikes: PropTypes.func,
    bike: PropTypes.object,
    setMessage: PropTypes.func
};

function BikeEndMaintenance(props) {
    const bike = props.bike;

    async function endMaintenance() {
        if (props.utils.mapInstance) { props.utils.mapInstance.closePopup(); }

        const data = await props.api.orderMaintenance(bike._id, false);
        const message = props.utils.createFlashMessage(data, "endMaintenance");

        props.setMessage(message);
        props.getBikes();
    }

    return (
            <button type="button" onClick={endMaintenance}>Avsluta underhåll</button>
    )
}

export default BikeEndMaintenance;
