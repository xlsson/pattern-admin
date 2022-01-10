import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BikeEndMaintenance from "../components/BikeEndMaintenance";

describe("Tests for BikeEndMaintenance component", () => {
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const getBikes = jest.fn();
    const setMessage = jest.fn();
    const api = { orderMaintenance: jest.fn() };
    const utils = {
        mapInstance: { closePopup: jest.fn() },
        createFlashMessage: jest.fn()
    };

    it("Button gets rendered", () => {
        render(<BikeEndMaintenance
                    api={api}
                    utils={utils}
                    getBikes={getBikes}
                    bike={bike}
                    setMessage={setMessage} />);

        const maintenanceButton = screen.getByRole("button");
        expect(maintenanceButton).toBeInTheDocument();
        expect(maintenanceButton).toHaveTextContent("Avsluta underhåll");
    });

    it("Clicking button calls functions with correct parameters", async () => {
        render(<BikeEndMaintenance
                    api={api}
                    utils={utils}
                    getBikes={getBikes}
                    bike={bike}
                    setMessage={setMessage} />);

        await waitFor(() => {
            const maintenanceButton = screen.getByRole("button");
            userEvent.click(maintenanceButton);

            expect(utils.mapInstance.closePopup).toHaveBeenCalled();
            expect(api.orderMaintenance).toHaveBeenCalled();
            expect(api.orderMaintenance).toHaveBeenCalledWith(bike._id, false);
            expect(setMessage).toHaveBeenCalled();
            expect(getBikes).toHaveBeenCalled();
            expect(utils.createFlashMessage).toHaveBeenCalled();
        });
    });
});
