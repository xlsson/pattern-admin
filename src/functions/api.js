import { data, updateUsers } from "./mock";

const api = {
    getBikes: async function (cityId) {
        const all = await data.bike;
        if (cityId === "all") { return all; }
        const filtered = all.filter((item) => item.city_id == cityId);
        return filtered;
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
    getCities: async function (cityId) {
        const all = await data.city;
        if (cityId === "all") { return all; }
        const filtered = all.filter((item) => item._id == cityId);
        return filtered;
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
