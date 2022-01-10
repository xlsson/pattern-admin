import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import User from '../components/User';
import MockedTrips from '../components/Trips';

jest.mock("../components/Trips", () => {
    return function DummyTrips(props) {
        return (
            <p>MockedTrips</p>
        );
    };
});

describe("Tests for User component", () => {
    const trips = require("./mockdata/trips.json");
    const cities = require("./mockdata/cities.json");
    const users = require("./mockdata/users.json");
    const user = { user: users[0] };

    let citiesArray = [];
    Object.keys(cities).forEach((city) => {
        if (city !== "all") { citiesArray.push(city); }
    });

    const setMessage = jest.fn();

    const utils = {
        createFlashMessage: jest.fn(),
        filterOutOngoingTrip: jest.fn()
    };

    let getTripsHasBeenCalled = false;
    const api = {
        getTrips: function(userId) {
            getTripsHasBeenCalled = true;
            return trips;
        },
        updateUser: jest.fn()
    };

    it('User elements get rendered', async () => {
        render(<User
                    api={api}
                    utils={utils}
                    cities={cities}
                    citiesArray={citiesArray}
                    user={user}
                    setMessage={setMessage} />);

        const title = screen.getByRole("heading");
        const table = screen.getByRole("table");
        const textInputs = screen.getAllByRole("textbox");
        const submitButton = screen.getByRole("button");

        await waitFor(() => {
            expect(getTripsHasBeenCalled).toBe(true);
            expect(textInputs.length).toEqual(4);
            expect(title).toHaveTextContent("Sherlock Holmes");
        });
    });

    it('Rendering page calls function as expected', async () => {
        render(<User
                    api={api}
                    utils={utils}
                    cities={cities}
                    citiesArray={citiesArray}
                    user={user}
                    setMessage={setMessage} />);

            await waitFor(() => {
                expect(utils.filterOutOngoingTrip).toHaveBeenCalled();
            });
    });

    it('Editing name changes heading', async () => {
        render(<User
                    api={api}
                    utils={utils}
                    cities={cities}
                    citiesArray={citiesArray}
                    user={user}
                    setMessage={setMessage} />);

            const title = screen.getByRole("heading");
            const firstnameInput = screen.getByTestId("firstname-input");
            const submitButton = screen.getByRole("button");

            userEvent.type(firstnameInput, "Newname");
            userEvent.click(submitButton);

            await waitFor(() => {
                expect(title).toHaveTextContent("Newname Holmes");
            });
    });

    it('Saving changes calls functions as expected', async () => {
        render(<User
                    api={api}
                    utils={utils}
                    cities={cities}
                    citiesArray={citiesArray}
                    user={user}
                    setMessage={setMessage} />);

            const dropdown = screen.getByTestId("payment-dropdown");
            const submitButton = screen.getByRole("button");

            userEvent.selectOptions(dropdown, ["unknown"]);
            userEvent.click(submitButton);

            await waitFor(() => {
                expect(api.updateUser).toHaveBeenCalled();
                expect(setMessage).toHaveBeenCalled();
                expect(utils.createFlashMessage).toHaveBeenCalled();
            });
    });
});
