import { render, waitFor, fireEvent, screen, act } from "@testing-library/react";
import { shallow, configure } from 'enzyme';
import userEvent from "@testing-library/user-event";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BikesTableMaintenance from "../components/BikesTableMaintenance";

configure({ adapter: new Adapter() });

describe("Tests for BikesTableMaintenance component", () => {
    const cities = require("./mockdata/cities.json");
    const bikes = require("./mockdata/bikes.json");
    const bikeCharging = bikes[10];
    const bikeNotCharging = bikes[11];

    const setMessage = jest.fn();
    const getBikes = jest.fn();
    const utils = {};
    const api = {};

    it('BikesTableMaintenance with charging bike renders correctly', () => {
        const wrapper = shallow(
            <BikesTableMaintenance
                api={api}
                utils={utils}
                getBikes={getBikes}
                bike={bikeCharging}
                cities={cities}
                setMessage={setMessage} />);

        const service = wrapper.find({ "data-testid": "service" });

        expect(service.text().includes("Underhåll och laddning")).toBe(true);
        expect(wrapper.exists("BikeEndMaintenance")).toBe(false);
    });


    it('BikesTableMaintenance with charged bike renders correctly', () => {
        const wrapper = shallow(
            <BikesTableMaintenance
                api={api}
                utils={utils}
                getBikes={getBikes}
                bike={bikeNotCharging}
                cities={cities}
                setMessage={setMessage} />);


        const service = wrapper.find({ "data-testid": "service" });

        expect(service.text().includes("Underhåll")).toBe(true);
        expect(service.text().includes("Underhåll och laddning")).toBe(false);
        expect(wrapper.exists("BikeEndMaintenance")).toBe(true);
    });

});
