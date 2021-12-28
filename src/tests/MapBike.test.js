import { render, waitFor, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MapBike from "../components/MapBike";

configure({ adapter: new Adapter() });

describe("Tests for MapBike component", () => {
    const api = {};
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const mapInstance = {};
    const cities = require("./mockdata/cities.json");
    const redrawBikes = jest.fn();
    const getIcon = jest.fn();

    const wrapper = shallow(<MapBike
                api={api}
                bike={bike}
                mapInstance={mapInstance}
                cities={cities}
                redrawBikes={redrawBikes}
                getIcon={getIcon} />);

    it('MapBike gets rendered with expected elements', () => {
        const marker = wrapper.find("MapBike");
    });

    // it("MapBike gets rendered", async () => {
    //     render(<MapBike
    //                 api={api}
    //                 bike={bike}
    //                 mapInstance={mapInstance}
    //                 cities={cities}
    //                 redrawBikes={redrawBikes}
    //                 getIcon={getIcon} />);
    //
    //     await waitFor(() => {
    //         expect(getIcon).toHaveBeenCalled();
    //     });
    // });

});
