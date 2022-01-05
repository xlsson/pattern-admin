import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

Price.propTypes = {
    api: PropTypes.object,
    utils: PropTypes.object,
    currentCity: PropTypes.object,
    setMessage: PropTypes.func
};

function Price(props) {
    const cityId = props.currentCity._id;
    const [price, setPrice] = useState({});
    const [changes, setChanges] = useState({});

    useEffect(() => { getPrices(cityId); }, [props]);

    async function getPrices(cityId) {
        const data = await props.api.getPrices(cityId);
        setPrice(data.prices[0]);
    }

    function handleInput(value, prop) {
        const updatedPrice = { ...price };
        const updatedChanges = { ...changes };

        updatedPrice[prop] = (value.length > 0) ? parseInt(value) : 0;
        updatedChanges[prop] = (value.length > 0) ? parseInt(value) : 0;

        setPrice(updatedPrice);
        setChanges(updatedChanges);
    }

    async function saveChanges() {
        const data = await props.api.updatePrice(price._id, changes);
        const message = props.utils.createFlashMessage(data, "updatePrice");

        setPrice(price);
        setChanges({});
        props.setMessage(message);
    }

    return (
        <div>
            <h1>Administrera pristariff</h1>
            <table className="column-table">
                <tbody>
                    <tr>
                        <th scope="col">Pristariff-Id</th>
                        <td>{price._id || "price._id"}</td>
                    </tr>
                    <tr>
                        <th scope="col">Startavgift</th>
                        <td>
                            <input
                                data-testid="startingFee"
                                type="number"
                                value={price.starting_fee || 0}
                                onChange={e => handleInput(e.target.value, "starting_fee")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Pris per minut</th>
                        <td>
                            <input
                                data-testid="minutePrice"
                                type="number"
                                value={price.price_per_minute || 0}
                                onChange={e => handleInput(e.target.value, "price_per_minute")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Avgift (parkering utanför station)</th>
                        <td>
                            <input
                                data-testid="penaltyFee"
                                type="number"
                                value={price.penalty_fee || 0}
                                onChange={e => handleInput(e.target.value, "penalty_fee")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Rabatt (flytt från gata till station)</th>
                        <td>
                            <input
                                data-testid="discount"
                                type="number"
                                value={price.discount || 0}
                                onChange={e => handleInput(e.target.value, "discount")}>
                            </input>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="text-align-right">
                <button type="button" onClick={saveChanges}>Spara ändringar</button>
            </div>
        </div>
    );
}

export default Price;
