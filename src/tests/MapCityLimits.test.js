import { render, waitFor, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MapCityLimits from "../components/MapCityLimits";

configure({ adapter: new Adapter() });

describe("Tests for MapCityLimits component", () => {
    const citiesArray = require("./mockdata/citiesArray.json");
    const city = citiesArray[1];
    const selectedId = "all";

    let getCityLimitsHasBeenCalled = false;
    let correctParams = false;

    const utils = {
        getCityLimits: function(id, _city) {
            getCityLimitsHasBeenCalled = true;
            correctParams = (id === "all" && _city === city) ? true : false;
            return {
                bounds: [[2,2], [2,2]],
                options: { color: "red", fillOpacity: 0, weight: 1 }
            };
        }
    };

    const wrapper = shallow(
        <MapCityLimits
                city={city}
                utils={utils}
                selectedId={selectedId} /> );

    it('MapCityLimits gets rendered', () => {

        const cityLimits = wrapper.find("map-city-limits");

        expect(getCityLimitsHasBeenCalled).toBe(true);
        expect(correctParams).toBe(true);

    });
});
