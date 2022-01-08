import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OverviewMap from "../components/OverviewMap";

configure({ adapter: new Adapter() });

describe("Tests for OverviewMap component", () => {
    const utils = {
        currentInterval: "",
        autoFetch: false,
        stopInterval: jest.fn(),
        mapInstance: { getZoom: jest.fn(), getCenter: jest.fn() }
    };
    const cities = require("./mockdata/cities.json");
    const bikes = require("./mockdata/bikes.json");
    const currentCity = cities["61a8fd85ea20b50150945887"];
    const setMessage = jest.fn();

    let getBikesHasBeenCalled = false;
    let getBikesCorrectParam = false;
    const api = {
        getBikes: jest.fn()
    };

    beforeEach(() => {
      getBikesHasBeenCalled = false;
      getBikesCorrectParam = false;
    });

    const wrapper = shallow(
        <OverviewMap
            api={api}
            utils={utils}
            currentCity={currentCity}
            cities={cities}
            setMessage={setMessage} />
    );

    it('OverviewMap page gets rendered with expected elements', () => {
        const title = wrapper.find("h1");
        const button = wrapper.find({ "data-testid": "autofetch-button" });
        expect(title.text().includes("Översiktskarta")).toBe(true);
        expect(wrapper.exists("Map")).toBe(true);
    });

    it('Click on autofetch button sets values and calls functions', () => {
        const button = wrapper.find({ "data-testid": "autofetch-button" });

        button.simulate('click');
        expect(utils.autoFetch).toBe(true);
        expect(utils.currentInterval).not.toEqual("");

        button.simulate('click');
        expect(utils.stopInterval).toHaveBeenCalled();
    });

});
