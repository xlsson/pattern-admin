import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BikesTable from "../components/BikesTable";

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

    const utils = {
        createFlashMessage: jest.fn(),
        getStationName: jest.fn()
    };
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

    it("BikesTable gets rendered with expected elements", async () => {
        render(<BikesTable
                    api={api}
                    utils={utils}
                    switchView={switchView}
                    setMessage={setMessage}
                    currentCity={currentCity}
                    cities={cities} /> );

        await waitFor(() => {
            const title = screen.getByText(/Cyklar/);
            const bikeMoveForms = screen.getAllByTestId("bikeMoveForm");
            expect(title).toBeInTheDocument();
            expect(bikeMoveForms.length).toBe(5);
        });
    });

    it("BikesTable calls api.getBikes with correct param", async () => {
        render(<BikesTable
                    api={api}
                    utils={utils}
                    switchView={switchView}
                    setMessage={setMessage}
                    currentCity={currentCity}
                    cities={cities} /> );

        await waitFor(() => {
            expect(getBikesHasBeenCalled).toBe(true);
            expect(getBikesCorrectParam).toBe(true);
        });
    });

    it("BikesTable fetched content gets rendered as expected", async () => {
        render(<BikesTable
                    api={api}
                    utils={utils}
                    switchView={switchView}
                    setMessage={setMessage}
                    currentCity={currentCity}
                    cities={cities} /> );

        await waitFor(() => {
            const available = screen.getAllByText("Ja");
            expect(available.length).toBe(5);

            const bike1 = screen.getByText("61a8af7803d845a108c5377b");
            const bike2 = screen.getByText("61a8b601f71acc076eee061e");
            const bike3 = screen.getByText("61abbdfed3e8bc22cfa13a90");
            const bike4 = screen.getByText("61abbe01d3e8bc22cfa13a92");
            const bike5 = screen.getByText("61a8af7403d845a108c53779");
        });
    });

    it("Clicking button to get bikes again calls setMessage", async () => {
        render(<BikesTable
                    api={api}
                    utils={utils}
                    switchView={switchView}
                    setMessage={setMessage}
                    currentCity={currentCity}
                    cities={cities} /> );

        await waitFor(() => {
            const fetchButton = screen.getByText(/Uppdatera/);

            userEvent.click(fetchButton);

            expect(setMessage).toHaveBeenCalled();
        });
    });
});
