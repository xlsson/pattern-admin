import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BikePopupMoveForm from "../components/BikePopupMoveForm";

describe("Tests for BikePopupMoveForm component", () => {
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const cities = require("./mockdata/cities.json");
    const chargeStations = require("./mockdata/chargeStations.json");
    const getBikes = jest.fn();
    const setMessage = jest.fn();
    const utils = {
        createFlashMessage: jest.fn(),
        mapInstance: { closePopup: jest.fn() }
    };
    const mapInstance = {
        closePopup: jest.fn()
    };
    const api = {
        moveBike: jest.fn(),
        orderMaintenance: jest.fn()
    };

    it("Elements get rendered as expected", () => {
        render(<BikePopupMoveForm
                    api={api}
                    utils={utils}
                    cities={cities}
                    getBikes={getBikes}
                    bike={bike}
                    chargeStations={chargeStations}
                    setMessage={setMessage} />);

        const submitButton = screen.getByRole("button");
        const options = screen.getAllByRole("option");
        const checkBox = screen.getByRole("checkbox");

        expect(options.length).toEqual(chargeStations.length);
        expect(submitButton).toHaveTextContent("Hämta");
        expect(checkBox.checked).toEqual(false);
    });

    it("Clicking move bike calls api with expected parameters", async () => {
        render(<BikePopupMoveForm
                    api={api}
                    utils={utils}
                    cities={cities}
                    getBikes={getBikes}
                    bike={bike}
                    chargeStations={chargeStations}
                    setMessage={setMessage} />);

        await waitFor(() => {
            const submitButton = screen.getByRole("button");
            const options = screen.getAllByRole("option");
            const dropdown = screen.getByTestId("moveBikeDropdown");

            userEvent.selectOptions(dropdown, ["1"]);
            userEvent.click(submitButton);

            expect(api.moveBike).toHaveBeenCalled();
            expect(api.moveBike).toHaveBeenCalledWith(bike._id, chargeStations[1]);
            expect(utils.createFlashMessage).toHaveBeenCalled();
            expect(utils.createFlashMessage).toHaveBeenCalledWith(undefined, "move");
            expect(setMessage).toHaveBeenCalled();
            expect(getBikes).toHaveBeenCalled();
            expect(utils.mapInstance.closePopup).toHaveBeenCalled();
        });
    });

    it("Ordering maintenance calls api with expected values", async () => {
        render(<BikePopupMoveForm
                    api={api}
                    utils={utils}
                    cities={cities}
                    getBikes={getBikes}
                    bike={bike}
                    chargeStations={chargeStations}
                    setMessage={setMessage} />);

        await waitFor(() => {
            const submitButton = screen.getByRole("button");
            const dropdown = screen.getByTestId("moveBikeDropdown");
            const checkBox = screen.getByRole("checkbox");

            userEvent.selectOptions(dropdown, ["1"]);
            userEvent.click(checkBox);
            userEvent.click(submitButton);

            expect(checkBox.checked).toEqual(true);
            expect(api.orderMaintenance).toHaveBeenCalled();
            expect(api.orderMaintenance).toHaveBeenCalledWith(bike._id, true);
            expect(utils.createFlashMessage).toHaveBeenCalled();
            expect(utils.createFlashMessage).toHaveBeenCalledWith(undefined, "moveMaintenance");
            expect(setMessage).toHaveBeenCalled();
            expect(getBikes).toHaveBeenCalled();
            expect(utils.mapInstance.closePopup).toHaveBeenCalled();
        });
    });

});
