import { data, updateUsers } from "./mock";

const devconfig = require("./devconfig.json");

const api = {
    baseUrl: devconfig.baseUrl,
    token: devconfig.token,
    sendRequest: function (url, requestOptions, callback) {
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(function(data) {
                return callback(data);
            });
    },
    mockLogin: function () {
        let url = `${api.baseUrl}/admins/login`;

        let requestOptions = {
            method: "POST",
            body: JSON.stringify({
                username: devconfig.username,
                password: devconfig.password
            })
        };

        api.sendRequest(url, requestOptions, api.afterMockLogin);
    },
    afterMockLogin: function (data) {
        api.token = data.token;
    },
    getBikes: function (cityId, callback) {
        let url = `${api.baseUrl}/bikes`;

        if (cityId != "all") { url += `/city/${cityId}`; }

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        api.sendRequest(url, requestOptions, callback);
    },
    moveBike: async function (bikeId, chargeId) {
        console.log("flyttar: ", bikeId, " till ", chargeId);
    },
    getCities: function (callback) {
        let url = `${api.baseUrl}/cities`;

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        api.sendRequest(url, requestOptions, callback);
    },
    getPrices: function (cityId, callback) {
        let url = `${api.baseUrl}/prices`;

        console.log("price not dependent on cityId: ", cityId);

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        api.sendRequest(url, requestOptions, callback);
    },
    updatePrice: async function (updatedPrice) {
        console.log("sparar pris i db", updatedPrice);
    },
    getTrips: function (userId, callback) {
        let url = `${api.baseUrl}/trips`;

        if (userId != "all") { url += `/user/${userId}`; }

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        api.sendRequest(url, requestOptions, callback);
    },
    getUsers: function (userId, callback) {
        let url = `${api.baseUrl}/users`;

        if (userId != "all") { url += `/${userId}`; }

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        api.sendRequest(url, requestOptions, callback);
    },
    updateUser: async function (updated) {
        console.log("uppdatera user: ", updated);
    }
};

export default api;
