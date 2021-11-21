const mockData = require('./mock');

const api = {
    getBikes: function () {
        const allBikes = mockData.bike;
        return allBikes;
    },
    getChargingStations: function() {
        const allChargingStations = mockData.charge;
        return allChargingStations;
    },
    getCities: function () {
        return mockData.city;
    },
    getParkingStations: function() {
        const allParkingStations = mockData.parking;
        return allParkingStations;
    },
    getPrice: function () {
        return mockData.price;
    },
    getUsers: function () {
        return mockData.user;
    }
};

module.exports = api;
