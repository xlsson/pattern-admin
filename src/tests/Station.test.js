import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Station from "../components/Station";

configure({ adapter: new Adapter() });

describe("Tests for Station component", () => {
    const api = {
        getBikes: function(cityId) {
            getBikesHasBeenCalled = true;
            return { bikes: filteredBikes };
        },
        moveBike: jest.fn()
    };
    const utils = {};
    const switchView = jest.fn();
    const cities = require("./mockdata/cities.json");
    const stockholmId = "61a7603dbb53f131584de9b3";
    const type = "charge";
    const station = cities[stockholmId].charge_stations[0];
    station.city_id = stockholmId;
    const currentCity = cities[stockholmId];
    const setMessage = jest.fn();

    const bikes = require("./mockdata/bikes.json");

    let filteredBikes = bikes.filter(function(item) {
        return item.city_id === stockholmId;
    });
    let getBikesHasBeenCalled;

    beforeEach(() => {
      getBikesHasBeenCalled = false;
    });

    const wrapper = shallow(
        <Station
            api={api}
            utils={utils}
            switchView={switchView}
            station={station}
            type={type}
            currentCity={currentCity}
            cities={cities}
            setMessage={setMessage} />
    );

    it('Station page gets rendered with expected elements', () => {
        const title = wrapper.find("h1");
        const name = wrapper.find({ "data-testid": "name" });
        const city = wrapper.find({ "data-testid": "city" });
        const coordinates = wrapper.find({ "data-testid": "coordinates" });
        const bikes = wrapper.find({ "data-testid": "bikes" });

        expect(title.text().includes("Laddningsstation")).toBe(true);
        expect(wrapper.exists("Map")).toBe(true);
    });
    //
    // it('Station page contains expected data', async () => {
    //     await waitFor(() => {
    //         const name = wrapper.find({ "data-testid": "name" });
    //         const city = wrapper.find({ "data-testid": "city" });
    //         const coordinates = wrapper.find({ "data-testid": "coordinates" });
    //         const bikes = wrapper.find({ "data-testid": "bikes" });
    //
    //         expect(name.text().includes(station.name)).toBe(true);
    //         expect(city.text().includes(currentCity.name)).toBe(true);
    //         expect(coordinates.text().includes(station.coordinates.northwest.lat)).toBe(true);
    //     });
    // });
});
