import { render, waitFor, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Trips from '../components/Trips';

describe("Tests for Trips component", () => {
    const trips = require("./mockdata/trips.json");
    let getDateTimeStringHasBeenCalled = false;
    const utils = {
        getDateTimeString: function(string) {
            getDateTimeStringHasBeenCalled = true;
            return "placeholdertext";
        }
    };

    it('Trips elements get rendered', () => {
        render(<Trips
                    utils={utils}
                    trips={trips} />);

        const title = screen.getByRole("heading");
        const table = screen.getByRole("table");

        expect(title).toHaveTextContent("Reslogg");
    });

    it('Trips data gets rendered', () => {
        render(<Trips
                    utils={utils}
                    trips={trips} />);

        const tripRow = screen.getAllByTestId("trip-row");
        expect(tripRow.length).toBe(2);

        const speedTrip1 = screen.getByText(/11/);
        const distanceTrip2 = screen.getByText(/513/);
    });
});
