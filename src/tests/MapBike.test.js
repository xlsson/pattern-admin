import { render, waitFor, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MapBike from "../components/MapBike";

configure({ adapter: new Adapter() });

describe("Tests for MapBike component", () => {
    const api = {};
    const utils = {};
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const cities = require("./mockdata/cities.json");
    const getBikes = jest.fn();
    const getIcon = jest.fn();
    const setMessage = jest.fn();

    const wrapper = shallow(<MapBike
                api={api}
                utils={utils}
                bike={bike}
                cities={cities}
                getBikes={getBikes}
                getIcon={getIcon}
                setMessage={setMessage} />);

    it('MapBike gets rendered', () => {
        const marker = wrapper.find("mapbike-wrapper");
    });
});
