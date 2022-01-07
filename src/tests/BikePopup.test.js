import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BikePopup from "../components/BikePopup";

configure({ adapter: new Adapter() });

describe("Tests for BikePopup component", () => {
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const cities = require("./mockdata/cities.json");
    const utils = {};
    const api = {};
    const getBikes = jest.fn();
    const setMessage = jest.fn();

    const wrapper = shallow(
        <BikePopup
            api={api}
            utils={utils}
            bike={bike}
            cities={cities}
            getBikes={getBikes}
            setMessage={setMessage} />);

    it('BikePopup gets rendered with expected elements', () => {
        const scooterIcon = wrapper.find({ "data-testid": "scooter-icon" });
        const position = wrapper.find({ "data-testid": "position" });
        const status = wrapper.find({ "data-testid": "status" });
        const batteryStatus = wrapper.find({ "data-testid": "batteryStatus" });

        expect(scooterIcon.text().includes("electric_scooter")).toBe(true);
        expect(position.text().includes("Position:")).toBe(true);
        expect(status.text().includes("Ledig" || "Upptagen")).toBe(true);
        expect(batteryStatus.text().includes("Batterinivå")).toBe(true);
    });


    it('BikePopup displays expected data', () => {
        const position = wrapper.find({ "data-testid": "position" });
        const status = wrapper.find({ "data-testid": "status" });
        const battery = wrapper.find({ "data-testid": "batteryStatus" });

        expect(position.text().includes("Laddningsstation")).toBe(true);
        expect(status.text().includes("Ledig")).toBe(true);
        expect(battery.text().includes("78")).toBe(true);
        expect(wrapper.exists("BikePopupMoveForm")).toBe(true);
        expect(wrapper.exists("BikeEndMaintenance")).toBe(false);
    });

});
