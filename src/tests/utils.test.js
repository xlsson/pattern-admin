import utils from "../functions/utils";

describe("Tests for utils module", () => {

    it("setView sets properties to expected values", () => {
        utils.mapCenter = [58.195259, 14.221258];
        utils.mapZoom = 6;

        utils.setView([12, 24], 8);

        expect(utils.mapCenter).toEqual([12, 24]);
        expect(utils.mapZoom).toEqual(8);

        utils.mapCenter = [58.195259, 14.221258];
        utils.mapZoom = 6;

        utils.setView([12.34, 24.42], 1);

        expect(utils.mapCenter).toEqual([12.34, 24.42]);
        expect(utils.mapZoom).toEqual(1);
    });

    it("stopInterval sets autoFetch to false", () => {
        utils.autoFetch = true;

        utils.stopInterval();

        expect(utils.autoFetch).toBe(false);

        utils.autoFetch = false;
    });

    it("filterOutOngoingTrip returns expected array", () => {
        const trips = require("./mockdata/tripsOneOngoing.json");

        const filteredTrips = utils.filterOutOngoingTrip(trips);

        expect(trips.length).toEqual(2);
        expect(filteredTrips.length).toEqual(1);
    });

    it("getCenter returns expected values", () => {
        const coords1 = {
            northwest: {
                lat: 20,
                long: 20
            },
            southeast: {
                lat: 50,
                long: 30
            }
        };

        const coords2 = {
            northwest: {
                lat: 15,
                long: 23
            },
            southeast: {
                lat: 50,
                long: 30
            }
        };

        const center1 = utils.getCenter(coords1);
        const center2 = utils.getCenter(coords2);

        expect(center1).toEqual([35, 25]);
        expect(center2).toEqual([32.5, 26.5]);
    });

    it("getCityLimits returns expected values", () => {
        const citiesArray = require("./mockdata/citiesArray.json");
        const city = citiesArray[1];

        const bounds = [
            [59.343886, 18.026826],
            [59.310522, 18.099825]
        ];

        const options = { color: "red", fillOpacity: 0, weight: 1 };

        const data = utils.getCityLimits(citiesArray, city);

        expect(data.bounds).toEqual(bounds);
        expect(data.options).toEqual(options);
    });

    it("addStations returns expected values", () => {
        const citiesArray = require("./mockdata/citiesArray.json");
        const monoCity = require("./mockdata/monoCity.json");

        const withStations = utils.addStations(citiesArray, monoCity);

        expect(withStations.parking_stations.length).toEqual(3);
        expect(withStations.charge_stations.length).toEqual(4);
    });

    it("getStationName returns expected station name", () => {
        const cities = require("./mockdata/cities.json");
        const bikes = require("./mockdata/bikes.json");
        const bike1 = bikes[1];
        const bike2 = bikes[5];

        const name1 = utils.getStationName("charge", bike1, cities);
        const name2 = utils.getStationName("parking", bike2, cities);

        expect(name1).toEqual("Mariatorget");
        expect(name2).toEqual("Wennbergsparken");

    });

    it("createStationsArray returns expected array", () => {
        const cities = require("./mockdata/cities.json");
        const cityId1 = "61a7603dbb53f131584de9b3";
        const cityId2 = "61a8fd85ea20b50150945887";
        const currentCity1 = cities[cityId1];
        const currentCity2 = cities[cityId2];

        const stations1 = utils.createStationsArray("parking", currentCity1, cities);
        const stations2 = utils.createStationsArray("charge", currentCity2, cities);

        expect(stations1.length).toEqual(1);
        expect(stations1[0]).toHaveProperty("city_id", cityId1);

        expect(stations2.length).toEqual(2);
        expect(stations2[0]).toHaveProperty("city_id", cityId2);
    });

    it("countBikes returns expected object", () => {
        const city = "61a7603dbb53f131584de9b3";
        const charge = require("./mockdata/chargeStations.json");
        const parking = require("./mockdata/parkingStations.json");
        const bikes = require("./mockdata/bikes.json");

        const filteredBikes = bikes.filter((bike) => {
            return bike.city_id === city;
        });

        const countCharge = utils.countBikes(charge, "charge", filteredBikes);
        const countParking = utils.countBikes(parking, "parking", filteredBikes);

        expect(Object.keys(countCharge).length).toEqual(4);
        expect(countCharge["61a93ba5e146af1a898bdb33"]).toEqual(0);
        expect(countCharge["61a93c3ce146af1a898bdb34"]).toEqual(2);
        expect(countCharge["61a8ff1b108640ebcc7fd228"]).toEqual(0);
        expect(countCharge["61b3d032d81d217b892357d6"]).toEqual(0);

        expect(Object.keys(countParking).length).toEqual(3);
        expect(countParking["61a760deeefc1bd24ba91645"]).toEqual(0);
        expect(countParking["61a93b34e146af1a898bdb31"]).toEqual(1);
        expect(countParking["61a939c1e146af1a898bdb30"]).toEqual(0);
    });

    it("getDateTimeString returns expected string", () => {
        const mongoDate = "2021-12-02T14:14:06.149Z";
        const asString = utils.getDateTimeString(mongoDate);

        expect(asString).toEqual("2021-12-02, 14:14");
    });

    it("addZero function returns expected values", () => {
        const daySingle = utils.addZero(9);
        const dayDouble = utils.addZero(10);

        expect(daySingle.length).toEqual(2);
        expect(dayDouble.length).toEqual(2);
    });

    it("createFlashMessage function returns expected values", () => {
        const data1 = { data: {} };
        const data2 = { error: "errortext" };
        const data3 = { message: "messagetext" };
        const data4 = { propertyName: "propertytext" };

        const msgOK1 = utils.createFlashMessage(data1, "endMaintenance");
        const msgError1 = utils.createFlashMessage(data2, "endMaintenance");

        const msgOK2 = utils.createFlashMessage(data1, "move");
        const msgError2 = utils.createFlashMessage(data2, "move");

        const msg3 = utils.createFlashMessage(data3, "move");

        expect(msgOK1.text).toEqual("Underhåll avslutat");
        expect(msgOK1.error).toEqual(false);

        expect(msgError1.text).toEqual("Något gick snett");
        expect(msgError1.error).toEqual(true);

        expect(msgOK2.text).toEqual("Cykel flyttad till station");
        expect(msgOK2.error).toEqual(false);

        expect(msgError2.text).toEqual("Något gick snett");
        expect(msgError2.error).toEqual(true);

        expect(msg3.text).toMatch(/Servermeddelande/);
        expect(msg3.error).toEqual(false);
    });


});
