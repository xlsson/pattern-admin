const utils = {
    mapInstance: null,
    currentInterval: "",
    autoFetch: false,
    stopInterval: function() {
        clearInterval(utils.currentInterval);
        utils.autoFetch = false;
    },
    // Returns an array with coordinates for all city limits, for Leaflet map
    createCityLimits: function (city, cities) {
        const limitsArray = [];

        if (city._id !== "all") {
            limitsArray.push(city.coordinates);
            return limitsArray;
        }

        Object.keys(cities).forEach((c) => {
            if (c !== "all") { limitsArray.push(cities[c].coordinates); }
        });

        return limitsArray;
    },
    // Returns stationname based on station type and station id
    getStationName: function(type, bike, cities) {
        const stationType = `${type}_stations`;
        const stations = cities[bike.city_id][stationType];
        let stationName;
        stations.forEach((station) => {
            if (station._id === bike[`${type}_id`]) { stationName = station.name; }
        });
        return stationName;
    },
    // Returns an array of all stations for the selected city id, with
    // city_id and city_name attribute added to each station
    createStationsArray: function(type, currentCity, cities) {
        let stations = [];

        if (currentCity._id !== "all") {
            stations = currentCity[`${type}_stations`];
            stations.forEach((station) => {
                station.city_id = currentCity._id;
                station.city_name = currentCity.name;
            });

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
    countBikes: function(stations, type, bikes) {
        const result = {};

        stations.forEach((station) => { result[station._id] = 0; });

        let stationId;
        bikes.forEach((bike) => {
            stationId = bike[`${type}_id`];
            if (stationId) { result[stationId] += 1; }
        });

        return result;
    },
    getDateTimeString: function(mongoDate) {
        const dateTime = new Date(mongoDate);
        const diff = (dateTime.getTimezoneOffset());

        dateTime.setMinutes(dateTime.getMinutes() + diff);

        const year = dateTime.getFullYear();
        const month = utils.addZero((dateTime.getMonth() + 1));
        const date = utils.addZero(dateTime.getDate());
        const hours = utils.addZero(dateTime.getHours());
        const minutes = utils.addZero(dateTime.getMinutes());

        const asString = `${year}-${month}-${date}, ${hours}:${minutes}`;
        return asString;
    },
    addZero: function(number) {
        number = number.toString();
        if (number.length === 1) { number = `0${number}`; }
        return number;
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
            const message = `Servermeddelande: "${data.message}"`;
            return { text: message, error: false };
        }

        const isError = Object.prototype.hasOwnProperty.call(data, "error");
        const type = (isError ? "error" : "success");
        const text = texts[context][type];
        const message = { text: text, error: isError };

        return message;
    }
};

export default utils;
