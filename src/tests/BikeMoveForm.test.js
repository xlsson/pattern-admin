import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BikeMoveForm from "../components/BikeMoveForm";

describe("Tests for BikeMoveForm component", () => {
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const chargeStations = require("./mockdata/chargeStations.json");
    const redrawBikes = jest.fn();
    let api = {
        orderMaintenance: jest.fn(),
        moveBike: jest.fn()
    };

    it("Elements get rendered", () => {
        render(<BikeMoveForm
                    api={api}
                    redrawBikes={redrawBikes}
                    bike={bike}
                    chargeStations={chargeStations} />);

        const confirmButton = screen.getByRole("button");
        expect(confirmButton).toBeInTheDocument();
        expect(confirmButton).toHaveTextContent("Boka");

        const options = screen.getAllByRole("option");
        expect(options[0]).toBeInTheDocument();
        expect(options.length).toEqual(chargeStations.length);

        const checkBox = screen.getByRole("checkbox");
        expect(checkBox).toBeInTheDocument();
    });

    it("Selecting a station calls api with expected values", () => {
        render(<BikeMoveForm
                    api={api}
                    redrawBikes={redrawBikes}
                    bike={bike}
                    chargeStations={chargeStations} />);

        const dropdown = screen.getByTestId("stationsDropdown");
        const confirmButton = screen.getByRole("button");

        userEvent.selectOptions(dropdown, ["0"]);
        userEvent.click(confirmButton);

        expect(api.moveBike).toHaveBeenCalled();
        expect(api.moveBike).toHaveBeenCalledWith(
            bike._id, chargeStations[0], expect.anything()
        );
    });

});
