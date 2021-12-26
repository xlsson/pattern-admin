import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChangeCity from "../components/ChangeCity";

describe("Tests for ChangeCity component", () => {
    const allCities = require("./mockdata/allCities.json");
    const cities = require("./mockdata/cities.json");
    const chooseCity = jest.fn();

    it("Expected default dropdown value is displayed", () => {
        render(<ChangeCity
                    allCities={allCities}
                    cities={cities}
                    chooseCity={chooseCity} />);

        const defaultDropdownValue = screen.getByDisplayValue("Sverige");
        expect(defaultDropdownValue).toBeInTheDocument();
    });

    it("Expected number of options are displayed", () => {
        render(<ChangeCity
                    allCities={allCities}
                    cities={cities}
                    chooseCity={chooseCity} />);

        const options = screen.getAllByRole("option");
        expect(options.length).toEqual(4);
    });

    it("First option has expected value", () => {
        render(<ChangeCity
                    allCities={allCities}
                    cities={cities}
                    chooseCity={chooseCity} />);

        const options = screen.getAllByRole("option");
        expect(options[0]).toHaveProperty("value");
        expect(options[0].value).toEqual("61a76026bb53f131584de9b1");
    });

    it("Selecting a city calls props function with id as parameter", () => {
        render(<ChangeCity
                    allCities={allCities}
                    cities={cities}
                    chooseCity={chooseCity} />);

        const dropdown = screen.getByTestId("changeCityDropdown");
        userEvent.selectOptions(dropdown, ["61a76026bb53f131584de9b1"]);
        expect(chooseCity).toHaveBeenCalledWith("61a76026bb53f131584de9b1");
    });
});
