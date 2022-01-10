import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StationsTable from "../components/StationsTable";

describe("Tests for StationsTable component", () => {
    const karlstad = "61a8fd85ea20b50150945887";
    const cities = require("./mockdata/cities.json");
    const currentCity = cities[karlstad];
    const bikes = require("./mockdata/bikes.json");
    let filteredBikes = bikes.filter(function(item) {
        return item.city_id === karlstad;
    });
    const type = "charge";
    const switchView = jest.fn();
    const setMessage = jest.fn();

    let getBikesHasBeenCalled = false;
    let getBikesCorrectParam = false;
    let createStationsArrayHasBeenCalled = false;
    let countBikesHasBeenCalled = false;

    const utils = {
        createStationsArray: function(type, currentCity, cities) {
            createStationsArrayHasBeenCalled = true;
            let stations = cities[karlstad]["charge_stations"];
            stations.forEach((station) => {
                station.city_id = currentCity._id;
                station.city_name = currentCity.name;
            });
            return stations;
        },
        countBikes: function(stations, type, bikes=filteredBikes) {
            countBikesHasBeenCalled = true;
            const result = {};

            stations.forEach((station) => { result[station._id] = 0; });

            let stationId;
            bikes.forEach((bike) => {
                stationId = bike[`${type}_id`];
                if (stationId) { result[stationId] += 1; }
            });

            return result;
        },
        createFlashMessage: jest.fn()
    };
    const api = {
        getBikes: function(cityId) {
            getBikesHasBeenCalled = true;
            getBikesCorrectParam = (cityId === karlstad);
            return filteredBikes;
        }
    };

    it("StationsTable gets rendered with expected elements", async () => {
        render(<StationsTable
                    api={api}
                    utils={utils}
                    type={type}
                    switchView={switchView}
                    currentCity={currentCity}
                    cities={cities}
                    setMessage={setMessage} /> );

        await waitFor(() => {
            const title = screen.getByRole("heading");
            const button = screen.getByRole("button");
            const table = screen.getByRole("table");
            const cityHeader = screen.getByTestId("city");
            const stationHeader = screen.getByTestId("station");

            expect(title).toHaveTextContent("Laddningsstationer");
        });
    });

    it("StationsTable calls expected functions", async () => {
        getBikesHasBeenCalled = false;
        getBikesCorrectParam = false;
        createStationsArrayHasBeenCalled = false;
        countBikesHasBeenCalled = false;
        render(<StationsTable
                    api={api}
                    utils={utils}
                    type={type}
                    switchView={switchView}
                    currentCity={currentCity}
                    cities={cities}
                    setMessage={setMessage} /> );

        await waitFor(() => {
            expect(getBikesHasBeenCalled).toBe(true);
            expect(getBikesCorrectParam).toBe(true);
            expect(createStationsArrayHasBeenCalled).toBe(true);
            expect(countBikesHasBeenCalled).toBe(true);
        });
    });

    it("StationsTable fetched content gets rendered as expected", async () => {
        render(<StationsTable
                    api={api}
                    utils={utils}
                    type={type}
                    switchView={switchView}
                    currentCity={currentCity}
                    cities={cities}
                    setMessage={setMessage} /> );

        await waitFor(() => {
            const station3 = screen.getByText("Stora Torget");
            const station4 = screen.getByText("Centralstation");
            const stationsKarlstad = screen.getAllByText("Karlstad");

            expect(stationsKarlstad.length).toBe(2);
        });
    });

    it("Clicking station calls switchView witch expected params", async () => {
        render(<StationsTable
                    api={api}
                    utils={utils}
                    type={type}
                    switchView={switchView}
                    currentCity={currentCity}
                    cities={cities}
                    setMessage={setMessage} /> );

        await waitFor(() => {
            const station = screen.getByText("Centralstation");

            userEvent.click(station);

            expect(switchView).toHaveBeenCalledWith(
                "chargeStation",
                currentCity.charge_stations[1]);
        });
    });

    it("Clicking fetchData calls expected functions", async () => {
        render(<StationsTable
                    api={api}
                    utils={utils}
                    type={type}
                    switchView={switchView}
                    currentCity={currentCity}
                    cities={cities}
                    setMessage={setMessage} /> );

        await waitFor(() => {
            const button = screen.getByRole("button");
            countBikesHasBeenCalled = false;
            userEvent.click(button);
        });
        expect(countBikesHasBeenCalled).toBe(true);
        expect(utils.createFlashMessage).toHaveBeenCalled();
    });

});
