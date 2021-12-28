import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OverviewMap from "../components/OverviewMap";

configure({ adapter: new Adapter() });

describe("Tests for OverviewMap component", () => {
    const utils = { currentInterval: "" };
    const cities = require("./mockdata/cities.json");
    const bikes = require("./mockdata/bikes.json");
    const currentCity = cities["61a8fd85ea20b50150945887"];
    let getBikesHasBeenCalled = false;
    let getBikesCorrectParam = false;

    const api = {
        getBikes: function(cityId) {
            getBikesHasBeenCalled = true;
            getBikesCorrectParam = (cityId === "61a8fd85ea20b50150945887");
            return { bikes: filteredBikes };
        }
    };

    beforeEach(() => {
      getBikesHasBeenCalled = false;
      getBikesCorrectParam = false;
    });

    const wrapper = shallow(
        <OverviewMap
            api={api}
            currentCity={currentCity}
            cities={cities} />
    );

    it('Overview Map page gets rendered with expected elements', () => {
        const title = wrapper.find("h1");
        expect(title.text().includes("Översiktskarta")).toBe(true);
        expect(wrapper.exists("Map")).toBe(true);
    });

    it('Overview Map page calls api with correct params', () => {

    });

});
