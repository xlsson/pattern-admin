import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Map from "../components/Map";

configure({ adapter: new Adapter() });

describe("Tests for Map component", () => {
    const api = {};
    const utils = {};
    const cities = require("./mockdata/cities.json");
    const citiesArray = require("./mockdata/citiesArray.json");
    const city = cities["61a76026bb53f131584de9b1"];
    const autoFetchIsOn = false;
    const chargeStations = city.charge_stations;
    const parkingStations = city.parking_stations;
    const getBikes = jest.fn();
    const setMessage = jest.fn();

    const wrapper = shallow(
        <Map
            api={api}
            utils={utils}
            cities={cities}
            city={city}
            citiesArray={citiesArray}
            chargeStations={chargeStations}
            parkingStations={parkingStations} />
    );

    it('MapContainer gets rendered', () => {
        expect(wrapper.exists("MapContainer")).toBe(true);
        expect(wrapper.exists("MapConsumer")).toBe(true);
    });

});
