const devconfig = require("./devconfig.json");

const api = {
    baseUrl: devconfig.baseUrl,
    token: "",
    sendRequest: function (url, requestOptions, callback) {
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(function(data) {
                return callback(data);
            });
    },
    login: function (callback, username=devconfig.username, password=devconfig.password) {
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

        fetch(`${api.baseUrl}/admins/login`, requestOptions)
            .then(response => response.json())
            .then(function(data) {
                api.token = data.token;
                return data;
            })
            .then(function(data) { return callback(); });
    },
    getBikes: function (cityId, callback) {
        let url = `${api.baseUrl}/bikes`;

        if (cityId !== "all") { url += `/city/${cityId}`; }

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

        if (userId !== "all") { url += `/user/${userId}`; }

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        api.sendRequest(url, requestOptions, callback);
    },
    getUsers: function (userId, callback) {
        let url = `${api.baseUrl}/users`;

        if (userId !== "all") { url += `/${userId}`; }

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        api.sendRequest(url, requestOptions, callback);
    },
    updateUser: function (userId, newValues, callback) {
        let url = `${api.baseUrl}/users/${userId}`;
        let keys = Object.keys(newValues);

        if (keys.length === 0) {
            callback({ message: "no changes, empty request"});
            return;
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

        api.sendRequest(url, requestOptions, callback);
    }
};

export default api;
