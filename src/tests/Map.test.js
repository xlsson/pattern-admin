import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Map from "../components/Map";

configure({ adapter: new Adapter() });

describe("Tests for Map component", () => {
    const api = {};
    const utils = {};
    const zoom = 6;
    const focusCoords = [58.195259, 14.221258];
    const bikes = require("./mockdata/bikes.json");
    const cities = require("./mockdata/cities.json");
    const city = cities["61a76026bb53f131584de9b1"];
    const chargeStations = city.charge_stations;
    const parkingStations = city.parking_stations;
    const getBikes = jest.fn();
    const setMessage = jest.fn();

    const wrapper = shallow(
        <Map
            api={api}
            zoom={zoom}
            focusCoords={focusCoords}
            bikes={bikes}
            cities={cities}
            city={city}
            chargeStations={chargeStations}
            parkingStations={parkingStations}
            getBikes={getBikes} />
    );

    it('MapContainer gets rendered', () => {
        expect(wrapper.exists("MapContainer")).toBe(true);
        expect(wrapper.exists("MapConsumer")).toBe(true);
    });

});
