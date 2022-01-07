import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Bike from "../components/Bike";

configure({ adapter: new Adapter() });

describe("Tests for Bike component", () => {
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const cities = require("./mockdata/cities.json");
    const currentCity = cities[bike.city_id];
    const utils = require("../functions/utils.js");
    const api = {
        getBikes: function(cityId) {
            return bike;
        }
    };
    const setMessage = jest.fn();

    const wrapper = shallow(
        <Bike
            api={api}
            utils={utils}
            bike={bike}
            currentCity={currentCity}
            cities={cities}
            setMessage={setMessage} />
    );

    it('Bike page gets rendered with expected elements', () => {
        const title = wrapper.find("h1");

        expect(wrapper.exists("BikePosition")).toBe(true);
        expect(wrapper.exists("Map")).toBe(true);
        expect(title.text().includes("Cykel")).toBe(true);
        expect(wrapper.exists("Map")).toBe(true);
    });

    it('Bike page contains expected data', () => {
        const correctBatteryStatus = bike.battery_status;
        const correctCity = currentCity.name;
        const correctStatus = (bike.bike_status === "available") ? "Ja" : "Nej";

        const battery = wrapper.find({ "data-testid": "batteryStatus" });
        const city = wrapper.find({ "data-testid": "city" });
        const status = wrapper.find({ "data-testid": "status" });

        expect(city.text().includes(correctCity)).toBe(true);
        expect(battery.text().includes(correctBatteryStatus)).toBe(true);
        expect(status.text().includes(correctStatus)).toBe(true);
    });

});
