import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersTable from '../components/UsersTable';

describe("Tests for UsersTable component", () => {
    const users = require("./mockdata/users.json");
    const cities = require("./mockdata/cities.json");
    const switchView = jest.fn();
    const setMessage = jest.fn();

    let getUsersHasBeenCalled = false;
    const api = {
        getUsers: function(string) {
            getUsersHasBeenCalled = true;
            return { users: users };
        }
    };
    const utils = {
        getUsers: function(string) {
            getUsersHasBeenCalled = true;
            return { users: users };
        },
        createFlashMessage: jest.fn()
    };

    it('UsersTable elements get rendered', async () => {
        render(<UsersTable
                    api={api}
                    utils={utils}
                    cities={cities}
                    switchView={switchView}
                    setMessage={setMessage} />);

        const title = screen.getByRole("heading");
        const button = screen.getByRole("button");
        const table = screen.getByRole("table");

        await waitFor(() => {
            expect(title).toHaveTextContent("Kunder");
        });
    });

    it('Data gets displayed', async () => {
        render(<UsersTable
                    api={api}
                    utils={utils}
                    cities={cities}
                    switchView={switchView}
                    setMessage={setMessage} />);

        await waitFor(() => {
            const userRows = screen.getAllByTestId("user-row");
            const activeUsers = screen.getAllByText("Aktiv");
            expect(activeUsers.length).toBe(3);
        });
    });

    it('getUsers gets called', async () => {
        render(<UsersTable
                    api={api}
                    utils={utils}
                    cities={cities}
                    switchView={switchView}
                    setMessage={setMessage} />);

        await waitFor(() => {
            expect(getUsersHasBeenCalled).toBe(true);
        });
    });

    it('Clicking on a row calls switchView', async () => {
        render(<UsersTable
                    api={api}
                    utils={utils}
                    cities={cities}
                    switchView={switchView}
                    setMessage={setMessage} />);

        await waitFor(() => {
            const userRows = screen.getAllByTestId("user-row");
            userEvent.click(userRows[2]);
            expect(switchView).toHaveBeenCalled();
        });
    });

    it('Clicking Update calls createFlashMessage', async () => {
        render(<UsersTable
                    api={api}
                    utils={utils}
                    cities={cities}
                    switchView={switchView}
                    setMessage={setMessage} />);

        const button = screen.getByRole("button");

        userEvent.click(button);

        await waitFor(() => {
            expect(utils.createFlashMessage).toHaveBeenCalled();
        });
    });

});
