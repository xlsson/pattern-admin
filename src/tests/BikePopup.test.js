import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BikePopup from "../components/BikePopup";

configure({ adapter: new Adapter() });

describe("Tests for BikePopup component", () => {
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const cities = require("./mockdata/cities.json");
    const api = {};
    const mapInstance = {};
    const redrawBikes = jest.fn();

    const wrapper = shallow(
        <BikePopup
            api={api}
            bike={bike}
            mapInstance={mapInstance}
            cities={cities}
            redrawBikes={redrawBikes} />
    );

    it('BikePopup gets rendered and displays expected data', () => {
        const scooterIcon = wrapper.find("span");
        const battery = wrapper.find("div div").at(3);

        const actualBatteryStatus = bike.battery_status;

        expect(scooterIcon.text().includes("electric_scooter")).toBe(true);
        expect(battery.text().includes(actualBatteryStatus)).toBe(true);
        expect(wrapper.exists("BikePopupMoveForm")).toBe(true);
        expect(wrapper.exists("BikeEndMaintenance")).toBe(false);
    });

});
