import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BikePosition from '../components/BikePosition';

describe("Tests for BikePosition component", () => {
    const cities = require("./mockdata/cities.json");
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[1];
    const utils = { getStationName: jest.fn() };

    it('BikePosition is rendered correctly', () => {
        render(<BikePosition
                utils={utils}
                cities={cities}
                bike={bike} />);

        const icon = screen.getByTestId("position-icon");
        const text = screen.getByTestId("position-text");

        expect(icon).toBeInTheDocument();
        expect(text).toBeInTheDocument();
        expect(utils.getStationName).toHaveBeenCalled();
        expect(utils.getStationName).toHaveBeenCalledWith("charge", bike, cities);

    });

});
