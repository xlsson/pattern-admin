import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Map from "../components/Map";

configure({ adapter: new Adapter() });

describe("Tests for Map component", () => {
    const api = {};
    const bikes = require("./mockdata/bikes.json");
    const cities = require("./mockdata/cities.json");
    const city = cities["61a76026bb53f131584de9b1"];
    const chargeStations = city.charge_stations;
    const parkingStations = city.parking_stations;
    const redrawBikes = jest.fn();

    const wrapper = shallow(
        <Map
            api={api}
            bikes={bikes}
            cities={cities}
            city={city}
            chargeStations={chargeStations}
            parkingStations={parkingStations}
            redrawBikes={redrawBikes} />
    );
    //
    // it('Bike page gets rendered with expected elements', () => {
    //     const title = wrapper.find("h1");
    //
    //     expect(title.text().includes("Cykel")).toBe(true);
    //     expect(wrapper.exists("Map")).toBe(true);
    // });
    //
    // it('Bike page contains expected data', () => {
    //     const correctBatteryStatus = bike.battery_status;
    //     const correctCity = currentCity.name;
    //     const correctStatus = bike.bike_status;
    //
    //     const battery = wrapper.find({ "data-testid": "batteryStatus" });
    //     const city = wrapper.find({ "data-testid": "city" });
    //     const status = wrapper.find({ "data-testid": "status" });
    //
    //     expect(city.text().includes(correctCity)).toBe(true);
    //     expect(battery.text().includes(correctBatteryStatus)).toBe(true);
    //     expect(status.text().includes(correctStatus)).toBe(true);
    // });

});
