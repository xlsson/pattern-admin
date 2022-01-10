import { render, waitFor, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BikesTableMaintenance from "../components/BikesTableMaintenance";
import MockedBikeEndMaintenance from '../components/BikeEndMaintenance';
import MockedBikeMoveForm from '../components/BikeMoveForm';

jest.mock("../components/BikeEndMaintenance", () => {
    return function DummyBikeEndMaintenance(props) {
        return (
            <p>MockedBikeEndMaintenance</p>
        );
    };
});

jest.mock("../components/BikeMoveForm", () => {
    return function DummyBikeMoveForm(props) {
        return (
            <p>MockedBikeMoveForm</p>
        );
    };
});

describe("Tests for BikesTableMaintenance component", () => {
    const cities = require("./mockdata/cities.json");
    const bikes = require("./mockdata/bikes.json");
    const bikeCharging = bikes[10];
    const bikeNotCharging = bikes[11];

    const setMessage = jest.fn();
    const getBikes = jest.fn();
    const utils = {};
    const api = {};

    it('BikesTableMaintenance with charging bike renders correctly', () => {
        render( <BikesTableMaintenance
                    api={api}
                    utils={utils}
                    getBikes={getBikes}
                    bike={bikeCharging}
                    cities={cities}
                    setMessage={setMessage} />);

        const service = screen.getByTestId("service");
        const bikeEndMaintenance = screen.queryByText(/MockedBikeEndMaintenance/);

        expect(service).toHaveTextContent("Underhåll och laddning");
        expect(bikeEndMaintenance).not.toBeInTheDocument();
    });


    it('BikesTableMaintenance with charged bike renders correctly', () => {
        render( <BikesTableMaintenance
                    api={api}
                    utils={utils}
                    getBikes={getBikes}
                    bike={bikeNotCharging}
                    cities={cities}
                    setMessage={setMessage} />);

        const service = screen.getByTestId("service");
        const bikeEndMaintenance = screen.queryByText(/MockedBikeEndMaintenance/);

        expect(service).toHaveTextContent("Underhåll");
        expect(bikeEndMaintenance).toBeInTheDocument();
    });

});
