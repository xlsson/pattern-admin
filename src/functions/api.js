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
    login: function (callback, username, password) {

        console.log(username, password, "replaced by deconfig");

        let requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: devconfig.username,
                password: devconfig.password
            })
        };

        fetch(`${api.baseUrl}/admins/login`, requestOptions)
            .then(response => response.json())
            .then(function(data) {
                if (data.token) { api.token = data.token; }
                return data;
            })
            .then(function(data) { return callback(data); });
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
    moveBike: function (bikeId, station, callback) {
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
        api.sendRequest(url, requestOptions, callback);
    },
    orderMaintenance: function (bikeId, maintenance, callback) {
        console.log("sätter maintenance till", maintenance);

        let url = `${api.baseUrl}/bikes/maintenance/${bikeId}`;

        let requestOptions = {
            method: "PUT",
            headers: {
                'x-access-token': api.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ maintenance: maintenance })
        };

        api.sendRequest(url, requestOptions, callback);
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

        let requestOptions = {
            method: "GET",
            headers: { 'x-access-token': api.token }
        };

        api.sendRequest(url, requestOptions, callback);
    },
    updatePrice: function (priceId, newValues, callback) {
        let url = `${api.baseUrl}/prices/${priceId}`;
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
