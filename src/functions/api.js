/**
 * Api module with api calls and variables connected to the api
 *
 * @property   {object} config              Object with server URL
 * @property   {string} baseUrl             The base url used for all calls
 * @property   {function} sendRequest       Called by all api functions, sends
 *                                          request to server and returns result
 * @property   {function} login             Sends login credentials, returns token
 * @property   {function} getBikes          Returns bikes from selected city
 * @property   {function} moveBike          Updates bike with new coordinates
 * @property   {function} orderMaintenance  Sets maintenance for a bike
 * @property   {function} getCities         Gets all cities
 * @property   {function} getPrices         Gets price for all cities or one
 * @property   {function} updatePrice       Updates price in one tariff
 * @property   {function} getTrips          Gets all trips
 * @property   {function} getUsers          Gets all users
 * @property   {function} updateUser        Updates a user
 */

const config = require("./config.json");

const api = {
    baseUrl: config.server + "/" + config.version,
    token: "",
    sendRequest: async function (url, requestOptions) {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        return data;
    },
    login: async function (username, password) {
        const url = `${api.baseUrl}/admins/login`;

        let requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };

        const data = await api.sendRequest(url, requestOptions);
        if (data.token) { api.token = data.token; }
        return data;
    },
    getBikes: async function (cityId) {
        let url = `${api.baseUrl}/bikes`;

        if (cityId !== "all") { url += `/city/${cityId}`; }

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };
        return api.sendRequest(url, requestOptions);
    },
    moveBike: function (bikeId, station) {
        const coords = station.coordinates;
        const long = (coords.northwest.long + coords.southeast.long)/2;
        const lat = (coords.northwest.lat + coords.southeast.lat)/2;

        let changes = [
            { propName: "charge_id", value: station._id },
            { propName: "parking_id", value: null },
            { propName: "coordinates", value: { lat: lat , long: long } }
        ];

        let url = `${api.baseUrl}/bikes/${bikeId}`;

        let requestOptions = {
            method: "PATCH",
            headers: {
                'x-access-token': api.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changes)
        };
        return api.sendRequest(url, requestOptions);
    },
    orderMaintenance: function (bikeId, maintenance) {

        let url = `${api.baseUrl}/bikes/maintenance/${bikeId}`;

        let requestOptions = {
            method: "PUT",
            headers: {
                'x-access-token': api.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ maintenance: maintenance })
        };

        return api.sendRequest(url, requestOptions);
    },
    getCities: function () {
        let url = `${api.baseUrl}/cities`;

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        return api.sendRequest(url, requestOptions);
    },
    getPrices: function (cityId) {
        // Set cityId to empty string while infrastructure for individual
        // pricing is not yet there
        cityId = "";
        let url = `${api.baseUrl}/prices${cityId}`;

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        return api.sendRequest(url, requestOptions);
    },
    updatePrice: function (priceId, newValues) {
        let url = `${api.baseUrl}/prices/${priceId}`;
        let keys = Object.keys(newValues);

        if (keys.length === 0) {
            return { message: "Inget att spara"};
        }

        let changes = [];
        keys.forEach((key) => {
            let change = { propName: key, value: newValues[key] };
            changes.push(change);
        });

        let requestOptions = {
            method: "PATCH",
            headers: {
                'x-access-token': api.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changes)
        };

        return api.sendRequest(url, requestOptions);
    },
    getTrips: function (userId) {
        let url = `${api.baseUrl}/trips`;

        if (userId !== "all") { url += `/user/${userId}`; }

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        return api.sendRequest(url, requestOptions);
    },
    getUsers: function (userId) {
        let url = `${api.baseUrl}/users`;

        if (userId !== "all") { url += `/${userId}`; }

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        return api.sendRequest(url, requestOptions);
    },
    updateUser: function (userId, newValues) {
        let url = `${api.baseUrl}/users/${userId}`;
        let keys = Object.keys(newValues);

        if (keys.length === 0) {
            return { message: "Inget att spara"};
        }

        let changes = [];
        keys.forEach((key) => {
            let change = { propName: key, value: newValues[key] };
            changes.push(change);
        });

        let requestOptions = {
            method: "PATCH",
            headers: {
                'x-access-token': api.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changes)
        };

        return api.sendRequest(url, requestOptions);
    }
};

export default api;
