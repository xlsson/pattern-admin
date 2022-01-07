import { render, waitFor, fireEvent, screen, act } from "@testing-library/react";
import { shallow, configure } from 'enzyme';
import userEvent from "@testing-library/user-event";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BikesTable from "../components/BikesTable";

configure({ adapter: new Adapter() });

describe("Tests for BikesTable component", () => {
    const cities = require("./mockdata/cities.json");
    const currentCity = cities["61a76026bb53f131584de9b1"];
    const bikes = require("./mockdata/bikes.json");
    const switchView = jest.fn();
    const setMessage = jest.fn();
    let filteredBikes = bikes.filter(function(item) {
        return item.city_id === "61a76026bb53f131584de9b1";
    });
    let getBikesHasBeenCalled = false;
    let getBikesCorrectParam = false;

    const utils = { createFlashMessage: jest.fn() };
    const api = {
        getBikes: function(cityId) {
            getBikesHasBeenCalled = true;
            getBikesCorrectParam = (cityId === "61a76026bb53f131584de9b1");
            return { bikes: filteredBikes };
        }
    };

    beforeEach(() => {
      getBikesHasBeenCalled = false;
      getBikesCorrectParam = false;
    });

    const wrapper = shallow(
        <BikesTable
            api={api}
            utils={utils}
            switchView={switchView}
            setMessage={setMessage}
            currentCity={currentCity}
            cities={cities} />);


    it("BikesTable gets rendered with expected elements", () => {
        const bikesTitle = wrapper.find({ "data-testid": "bikes-title" });
        const fetchButton = wrapper.find({ "data-testid": "fetch-data-button" });
        const table = wrapper.find("table");
    });

    it("BikesTable calls api.getBikes with correct param", async () => {
        await waitFor(() => {
            expect(getBikesHasBeenCalled).toBe(true);
            expect(getBikesCorrectParam).toBe(true);
        });
    });

    // it("BikesTable fetched content gets rendered as expected", async () => {
    //     await waitFor(() => {
    //         const available = screen.getAllByText("Ja");
    //         expect(available.length).toBe(5);
    //
    //         const bike1 = screen.getByText("61a8af7803d845a108c5377b");
    //         const bike2 = screen.getByText("61a8b601f71acc076eee061e");
    //         const bike3 = screen.getByText("61abbdfed3e8bc22cfa13a90");
    //         const bike4 = screen.getByText("61abbe01d3e8bc22cfa13a92");
    //         const bike5 = screen.getByText("61a8af7403d845a108c53779");
    //     });
    // });

    // it("Clicking button to get bikes again calls setMessage", async () => {
    //     await waitFor(() => {
    //         const fetchButton = screen.getByText(/Hämta senaste data/);
    //
    //         userEvent.click(fetchButton);
    //
    //         expect(setMessage).toHaveBeenCalled();
    //     });
    // });
});
