import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

Price.propTypes = {
    api: PropTypes.object,
    currentCity: PropTypes.object
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
        let updatedPrice = { ...price };
        let updatedChanges = { ...changes };

        updatedPrice[prop] = (value.length > 0) ? parseInt(value) : 0;
        updatedChanges[prop] = (value.length > 0) ? parseInt(value) : 0;

        setPrice(updatedPrice);
        setChanges(updatedChanges);
    }

    async function saveChanges() {
        setPrice(price);
        const data = await props.api.updatePrice(price._id, changes);
        console.log(data);
    }

    return (
        <div>
            <h1>Administrera pristariff</h1>
            <table>
                <tbody>
                    <tr>
                        <td>_id</td>
                        <td>{price._id}</td>
                    </tr>
                    <tr>
                        <td>starting_fee</td>
                        <td>
                            <input
                                type="number"
                                value={price.starting_fee}
                                onChange={e => handleInput(e.target.value, "starting_fee")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>price_per_minute</td>
                        <td>
                            <input
                                type="number"
                                value={price.price_per_minute}
                                onChange={e => handleInput(e.target.value, "price_per_minute")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>penalty_fee</td>
                        <td>
                            <input
                                type="number"
                                value={price.penalty_fee}
                                onChange={e => handleInput(e.target.value, "penalty_fee")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>discount</td>
                        <td>
                            <input
                                type="number"
                                value={price.discount}
                                onChange={e => handleInput(e.target.value, "discount")}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button type="button" onClick={saveChanges}>Spara ändringar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Price;
