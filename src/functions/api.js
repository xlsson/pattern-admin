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

        if (cityId != "all") {
            url += `/city/${cityId}`;
        }

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        api.sendRequest(url, requestOptions, callback);
    },
    moveBike: async function (bikeId, chargeId) {
        console.log("flyttar: ", bikeId, " till ", chargeId);
    },
    getChargingStations: async function(cityId) {
        const all = await data.charge;
        if (cityId === "all") { return all; }
        const filtered = all.filter((item) => item.city_id == cityId);
        return filtered;
    },
    getCities: function (callback) {
        let url = `${api.baseUrl}/cities`;

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        api.sendRequest(url, requestOptions, callback);
    },
    getParkingStations: async function (cityId) {
        const all = await data.parking;
        if (cityId === "all") { return all; }
        const filtered = all.filter((item) => item.city_id == cityId);
        return filtered;
    },
    getPrice: async function () {
        return await data.price;
    },
    updatePrice: async function (updatedPrice) {
        console.log("sparar pris i db", updatedPrice);
    },
    getTrips: async function (userId) {
        const all = await data.trip;
        if (userId === "all") { return all; }
        const filtered = all.filter((item) => item.user_id == userId);
        return filtered;
    },
    // getUsers: async function (userId) {
    //     const all = await data.user;
    //     if (userId === "all") { return all; }
    //     const filtered = all.filter((item) => item._id == userId);
    //     return filtered;
    // },
    getUsers: async function (userId) {
        const all = await data.user;
        if (userId === "all") { return all; }
        const filtered = all.filter((item) => item._id == userId);
        return filtered;
    },
    updateUser: async function (updated) {
        console.log("uppdatera user: ", updated);
    }
};

export default api;
