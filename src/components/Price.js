import React, { useState, useEffect } from 'react';

import api from '../functions/api.js';

function Price(props) {
    const cityId = props.city._id;

    const [price, setPrice] = useState({});

    function handleInput(value, prop) {
        let updatedPrice = { ...price };
        updatedPrice[prop] = (value.length > 0) ? parseInt(value) : 0;
        setPrice(updatedPrice);
    }

    function saveChanges() {
        setPrice(price);
        api.updatePrice(price);
    }

    async function getPrice() {
        let result = await api.getPrice();
        result = result[0];
        setPrice(result);
    };

    useEffect(() => { getPrice(); }, [cityId]);

    return (
        <div>
            <h1>Administrera pristariff för city_id: {cityId}</h1>
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
