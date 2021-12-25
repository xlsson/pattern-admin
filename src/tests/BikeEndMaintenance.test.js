import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BikeEndMaintenance from "../components/BikeEndMaintenance";

describe("Tests for BikeEndMaintenance component", () => {
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const redrawBikes = jest.fn();
    const api = { orderMaintenance: jest.fn() };

    it("Button gets rendered", () => {
        render(<BikeEndMaintenance
                    api={api}
                    redrawBikes={redrawBikes}
                    bike={bike} />);

        const maintenanceButton = screen.getByRole("button");
        expect(maintenanceButton).toBeInTheDocument();
        expect(maintenanceButton).toHaveTextContent("Avsluta underhåll");
    });

    it("Clicking button calls api with correct parameters", () => {
        render(<BikeEndMaintenance
                    api={api}
                    redrawBikes={redrawBikes}
                    bike={bike} />);

        const maintenanceButton = screen.getByRole("button");
        userEvent.click(maintenanceButton);
        expect(api.orderMaintenance).toHaveBeenCalled();
        expect(api.orderMaintenance).toHaveBeenCalledWith(bike._id, false);
    });
});
