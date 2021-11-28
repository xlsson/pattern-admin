const mockData = require('./mock');

const api = {
    getBikes: async function (cityId) {
        const all = await mockData.bike;
        if (cityId === "all") { return all; }
        const filtered = all.filter((item) => item.city_id == cityId);
        return filtered;
    },
    getChargingStations: async function(cityId) {
        const all = await mockData.charge;
        if (cityId === "all") { return all; }
        const filtered = all.filter((item) => item.city_id == cityId);
        return filtered;
    },
    getCities: async function (cityId) {
        const all = await mockData.city;
        if (cityId === "all") { return all; }
        const filtered = all.filter((item) => item._id == cityId);
        return filtered;
    },
    getParkingStations: async function(cityId) {
        const all = await mockData.parking;
        if (cityId === "all") { return all; }
        const filtered = all.filter((item) => item.city_id == cityId);
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
