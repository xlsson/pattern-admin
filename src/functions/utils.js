import api from './api.js';

const utils = {
    mapInstance: null,
    currentInterval: "",
    autoFetch: false,
    stopInterval: function() {
        clearInterval(utils.currentInterval);
        utils.autoFetch = false;
    },
    // Returns an array of all stations for the selected city id, with a
    // city_id and city_name attribute added to each station
    createStationsArray: function(type, currentCity, cities) {
        let stations = [];

        if (currentCity._id !== "all") {
            stations = currentCity[`${type}_stations`];
            stations.forEach((station) => { station.city_id = currentCity._id; });
            return stations;
        }

        Object.keys(cities).forEach((key) => {
            if (key !== "all") {
                cities[key][`${type}_stations`].forEach((station) => {
                    station.city_id = key;
                    station.city_name = cities[key].name;
                });
                stations = stations.concat(cities[key][`${type}_stations`]);
            }
        });

        return stations;
    },
    // Returns an object with the city's station ids as keys, and
    // the number of bikes at each station as their value
    countBikes: async function(stations, type, cityId) {
        const data = await api.getBikes(cityId);
        const bikes = data.bikes;
        const result = {};

        stations.forEach((station) => { result[station._id] = 0; });

        let stationId;
        bikes.forEach((bike) => {
            stationId = bike[`${type}_id`];
            if (stationId) { result[stationId] += 1; }
        });

        return result;
    },
    createFlashMessage: function(data, context) {
        const texts = {
            endMaintenance: {
                success: "Underhåll avslutat",
                error: "Något gick snett",
            },
            move: {
                success: "Cykel flyttad till station",
                error: "Något gick snett",
            },
            moveMaintenance: {
                success: "Cykel flyttad, underhåll påbörjat",
                error: "Något gick snett",
            },
            getDataButton: {
                success: "Senaste data hämtad",
                error: "Något gick snett",
            },
            updateUser: {
                success: "Kundinformation uppdaterad",
                error: "Kundinformation ej uppdaterad",
            },
            updatePrice: {
                success: "Pristariff uppdaterad",
                error: "Pristariff ej uppdaterad",
            },
        };

        if (Object.prototype.hasOwnProperty.call(data, "message")) {
            return { text: data.message, error: false };
        }

        const isError = Object.prototype.hasOwnProperty.call(data, "error");
        const type = (isError ? "error" : "success");
        const text = texts[context][type];
        const message = { text: text, error: isError };

        return message;
    }
};

export default utils;
