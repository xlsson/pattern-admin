const mockData = require('./mock');

const api = {
    getBikes: async function (city) {
        const allBikes = await mockData.bike;
        if (city === "all") { return allBikes; }
        const cityBikes = allBikes.filter((bike) => bike.city_id == city);
        return cityBikes;
    },
    getChargingStations: async function(city) {
        const allChargingStations = await mockData.charge;
        if (city === "all") { return allChargingStations; }
        const cityChargingStations = allChargingStations.filter((chargingStation) => chargingStation.city_id == city);
        return cityChargingStations;
    },
    getCities: async function () {
        return await mockData.city;
    },
    getParkingStations: async function(city) {
        const allParkingStations = await mockData.parking;
        if (city === "all") { return allParkingStations; }
        const cityParkingStations = allParkingStations.filter((parkingStation) => parkingStation.city_id == city);
        return cityParkingStations;

    },
    getPrice: async function () {
        return await mockData.price;
    },
    getUsers: async function () {
        const allUsers = await mockData.user;
        return allUsers;
    }
};

module.exports = api;
