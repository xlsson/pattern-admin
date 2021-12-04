import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function Price(props) {
    const cityId = props.city._id;
    const [price, setPrice] = useState({});
    const [changes, setChanges] = useState({});

    useEffect(() => { api.getPrices(cityId, afterGetPrices); }, [props]);

    function afterGetPrices(data) {
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

    function saveChanges() {
        setPrice(price);
        api.updatePrice(price._id, changes, afterSaveChanges);
    }

    function afterSaveChanges(data) {
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
