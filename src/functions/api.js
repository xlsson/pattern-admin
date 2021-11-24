const mockData = require('./mock');

const api = {
    getBikes: async function (city) {
        const all = await mockData.bike;
        if (city === "all") { return all; }
        const filtered = all.filter((item) => item.city_id == city);
        return filtered;
    },
    getChargingStations: async function(city) {
        const all = await mockData.charge;
        if (city === "all") { return all; }
        const filtered = all.filter((item) => item.city_id == city);
        return filtered;
    },
    getCities: async function (city) {
        const all = await mockData.city;
        if (city === "all") { return all; }
        const filtered = all.filter((item) => item._id == city);
        return filtered;
    },
    getParkingStations: async function(city) {
        const all = await mockData.parking;
        if (city === "all") { return all; }
        const filtered = all.filter((item) => item.city_id == city);
        return filtered;
    },
    getPrice: async function () {
        return await mockData.price;
    },
    getUsers: async function () {
        const allUsers = await mockData.user;
        return allUsers;
    }
};

export default api;
