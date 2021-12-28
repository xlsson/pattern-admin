import { render, waitFor, fireEvent, screen, act } from "@testing-library/react";
import BikesTable from "../components/BikesTable";

describe("Tests for BikesTable component", () => {
    const cities = require("./mockdata/cities.json");
    const currentCity = cities["61a76026bb53f131584de9b1"];
    const switchView = jest.fn();
    const bikes = require("./mockdata/bikes.json");

    let filteredBikes = bikes.filter(function(item) {
        return item.city_id === "61a76026bb53f131584de9b1";
    });
    let getBikesHasBeenCalled = false;
    let getBikesCorrectParam = false;

    const api = {
        getBikes: function(cityId) {
            getBikesHasBeenCalled = true;
            getBikesCorrectParam = (cityId === "61a76026bb53f131584de9b1");
            return { bikes: filteredBikes };
        },
        moveBike: jest.fn()
    };

    beforeEach(() => {
      getBikesHasBeenCalled = false;
      getBikesCorrectParam = false;
    });

    it("BikesTable gets rendered with expected elements", async () => {
        render(<BikesTable
                    api={api}
                    switchView={switchView}
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
                    switchView={switchView}
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
                    switchView={switchView}
                    currentCity={currentCity}
                    cities={cities} /> );

        await waitFor(() => {
            const bikeAtChargingStation = screen.getAllByText("Laddningsstation");
            expect(bikeAtChargingStation.length).toBe(3);

            const buttons = screen.getAllByRole("button");
            expect(buttons.length).toBe(5);
        });
    });
});
