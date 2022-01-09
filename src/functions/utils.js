const utils = {
    mapInstance: null,
    mapCenter: [58.195259, 14.221258],
    mapZoom: 6,
    setView: function(center, zoom) {
        utils.mapCenter = center;
        utils.mapZoom = zoom;

        if (utils.mapInstance) {
            utils.mapInstance.setView(center, zoom);
        }
    },
    currentInterval: "",
    autoFetch: false,
    stopInterval: function() {
        clearInterval(utils.currentInterval);
        utils.autoFetch = false;
    },
    getCenter: function (coords) {
        const lat = (
            coords.northwest.lat + coords.southeast.lat)/2;
        const long = (
            coords.northwest.long + coords.southeast.long)/2;
        return [lat, long]
    },
    // Returns data needed to draw rectangle, if conditions match
    getCityLimits: function (selectedId, city) {
        const options = { color: "red", fillOpacity: 0, weight: 1 };

        const coords = city.coordinates;
        const bounds = [
            [coords.northwest.lat, coords.northwest.long],
            [coords.southeast.lat, coords.southeast.long]
        ];

        return { bounds: bounds, options: options };
    },
    monoCity: {
         _id: "all",
        name: "-- Alla städer --",
        coordinates: {
            northwest: { lat: 58.195259, long: 14.221258 },
            southeast: { lat: 58.195259, long: 14.221258 }
        },
        parking_stations: [],
        charge_stations: []
    },
    addStations: function(citiesArray, monoCity) {
        let park = [];
        let charge = [];
        let withStations = { ...monoCity };

        citiesArray.forEach((city) => {
            park = park.concat(city.parking_stations);
            charge = charge.concat(city.charge_stations);
        });

        withStations.parking_stations = park;
        withStations.charge_stations = charge;

        return withStations;
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
