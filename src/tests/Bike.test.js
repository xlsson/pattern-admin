import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import Bike from "../components/Bike";
import MockedMap from '../components/Map';
import MockedBikePosition from '../components/BikePosition';

jest.mock("../components/Map", () => {
    return function DummyMap(props) {
        return (
            <p>MockedMap</p>
        );
    };
});

jest.mock("../components/BikePosition", () => {
    return function DummyBikePosition(props) {
        return (
            <p>MockedBikePosition</p>
        );
    };
});

describe("Tests for Bike component", () => {
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const cities = require("./mockdata/cities.json");
    let getBikesHasBeenCalled;
    const api = {};

    it('Bike page gets rendered with expected elements', async () => {
        render(
            <Bike
                api={api}
                bike={bike}
                cities={cities} />
        );

        await waitFor(() => {
            const title = screen.getByRole("heading");
            const bikePositionComponent = screen.getByText(/MockedBikePosition/);
            const mapComponent = screen.getByText(/MockedMap/);

            expect(title).toHaveTextContent("Cykel");
        });
    });

    it('Bike page contains expected data', async () => {
        render(
            <Bike
                api={api}
                bike={bike}
                cities={cities} />
        );

        await waitFor(() => {
            const correctBatteryStatus = bike.battery_status;
            const correctCity = cities[bike.city_id].name;
            const correctStatus = (bike.bike_status === "available") ? "Ja" : "Nej";

            const batteryStatus = screen.getByTestId("batteryStatus");
            const city = screen.getByTestId("city");
            const status = screen.getByTestId("status");

            expect(city).toHaveTextContent(correctCity);
            expect(batteryStatus).toHaveTextContent(correctBatteryStatus);
            expect(status).toHaveTextContent(correctStatus);
        });
    });

});
