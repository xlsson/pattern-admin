/**
 * Utils module with various variables and functions used by the components
 *
 * @property   {object} mapInstance         Instance of current Leaflet map
 * @property   {array} mapCenter            Map center sent as props to Map component
 * @property   {number} mapZoom             Zoom level sent as props to Map component
 * @property   {string} currentInterval     The latest interval (autofetching
 *                                           bike data) id set by setInterval
 * @property   {boolean} autoFetch          Set to true if interval is active
 * @property   {function} stopInterval          Stops current interval
 * @property   {function} filterOutOngoingTrip   Returns array where ongoing
 *                                               trips are removed
 * @property   {function} getCenter         Returns array with center coords for a
 *                                          station or city
 * @property   {function} getCityLimits     Returns object with data needed for
 *                                          Leaflet Rectangle component props
 * @property   {object} monoCity            "City" showing stations and
 *                                          coordinates for the system as a whole
 * @property   {function} addStations       Adds all stations in system to the
 *                                          monoCity object
 * @property   {function} getStationName    Returns stationname based on station
 *                                          type and station id
 * @property   {function} createStationsArray  Returns an array of all stations
 *                                             for the selected city id, with city_id
 *                                          and city_name attribute added
 * @property   {function} countBikes        Returns an object with the city's
 *                                          station ids as keys, and the number of
 *                                          bikes at each station as their value
 * @property   {function} getDateTimeString   Returns a string with date and time
 *                                          based on a MongoDB Date object
 * @property   {function} addZero             Adds leading zero to a one digit
 *                                          date, hour or minute.
  * @property   {function} createFlashMessage Returns object with message based
  *                                           on input data and topic.
 */
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
    filterOutOngoingTrip: function (trips) {
        const onlyFinished = [];

        trips.forEach((trip) => {
            if (trip.stop_time !== undefined) {
                onlyFinished.push(trip);
            }
        });

        return onlyFinished;
    },
    getCenter: function (coords) {
        const lat = (
            coords.northwest.lat + coords.southeast.lat)/2;
        const long = (
            coords.northwest.long + coords.southeast.long)/2;
        return [lat, long]
    },
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
    getStationName: function(type, bike, cities) {
        const stationType = `${type}_stations`;
        const stations = cities[bike.city_id][stationType];
        let stationName;
        stations.forEach((station) => {
            if (station._id === bike[`${type}_id`]) { stationName = station.name; }
        });
        return stationName;
    },
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
