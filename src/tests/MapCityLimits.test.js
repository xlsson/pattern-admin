import { render, waitFor, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MapCityLimits from "../components/MapCityLimits";

configure({ adapter: new Adapter() });

describe("Tests for MapCityLimits component", () => {
    const coords = {
        northwest: {
            lat: 59.390921,
            long: 13.466531
        },
        southeast: {
            lat: 59.364795,
            long: 13.541185
        }
    };

    const wrapper = shallow(<MapCityLimits coords={coords} />);

    it('MapCityLimits gets rendered', () => {
        const marker = wrapper.find("map-city-limits");
    });
});
