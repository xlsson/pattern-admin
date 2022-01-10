import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import BikePopup from "../components/BikePopup";
import MockedBikeEndMaintenance from '../components/BikeEndMaintenance';
import MockedBikePopupMoveForm from '../components/BikePopupMoveForm';

jest.mock("../components/BikeEndMaintenance", () => {
    return function DummyBikeEndMaintenance(props) {
        return (
            <p>MockedBikeEndMaintenance</p>
        );
    };
});

jest.mock("../components/BikePopupMoveForm", () => {
    return function DummyBikePopupMoveForm(props) {
        return (
            <p>MockedBikePopupMoveForm</p>
        );
    };
});

describe("Tests for BikePopup component", () => {
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const cities = require("./mockdata/cities.json");
    const utils = {};
    const api = {};
    const getBikes = jest.fn();
    const setMessage = jest.fn();

    it('BikePopup gets rendered with expected elements', () => {
        render(
            <BikePopup
                api={api}
                utils={utils}
                bike={bike}
                cities={cities}
                getBikes={getBikes}
                setMessage={setMessage} />);

        const scooterIcon = screen.getByTestId("scooter-icon");
        const position = screen.getByTestId("position");
        const status = screen.getByTestId("status");
        const batteryStatus = screen.getByTestId("batteryStatus");

        expect(scooterIcon).toHaveTextContent("electric_scooter");
        expect(position).toHaveTextContent("Position:");

        expect(status).toHaveTextContent("Ledig" || "Upptagen");
        expect(batteryStatus).toHaveTextContent(/Batterinivå/);
    });


    it('BikePopup displays expected data', async () => {
        render(
            <BikePopup
                api={api}
                utils={utils}
                bike={bike}
                cities={cities}
                getBikes={getBikes}
                setMessage={setMessage} />);

        const position = screen.getByTestId("position");
        const status = screen.getByTestId("status");
        const battery = screen.getByTestId("batteryStatus");

        await waitFor(() => {
            expect(position).toHaveTextContent(/Laddningsstation/);
            expect(status).toHaveTextContent(/Ledig/);
            expect(battery).toHaveTextContent(/78/);
            const component1 = screen.getByText(/MockedBikePopupMoveForm/);
        });
    });

});
