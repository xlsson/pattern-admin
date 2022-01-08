import { render, waitFor, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersTable from '../components/UsersTable';

describe("Tests for UsersTable component", () => {
    const users = require("./mockdata/users.json");
    const cities = require("./mockdata/cities.json");
    const switchView = jest.fn();

    let getUsersHasBeenCalled = false;
    const api = {
        getUsers: function(string) {
            getUsersHasBeenCalled = true;
            return { users: users };
        }
    };

    it('UsersTable elements get rendered', async () => {
        render(<UsersTable
                    api={api}
                    cities={cities}
                    switchView={switchView} />);

        const title = screen.getByRole("heading");
        const table = screen.getByRole("table");

        await waitFor(() => {
            expect(title).toHaveTextContent("Kunder");
        });
    });

    it('Data gets displayed', async () => {
        render(<UsersTable
                    api={api}
                    cities={cities}
                    switchView={switchView} />);

        await waitFor(() => {
            const userRows = screen.getAllByTestId("user-row");
            const activeUsers = screen.getAllByText("Aktiv");
            expect(activeUsers.length).toBe(3);
        });
    });

    it('getUsers gets called', async () => {
        render(<UsersTable
                    api={api}
                    cities={cities}
                    switchView={switchView} />);

        await waitFor(() => {
            expect(getUsersHasBeenCalled).toBe(true);
        });
    });

    it('Clicking on a row calls switchView', async () => {
        render(<UsersTable
                    api={api}
                    cities={cities}
                    switchView={switchView} />);

        await waitFor(() => {
            const userRows = screen.getAllByTestId("user-row");
            userEvent.click(userRows[2]);
            expect(switchView).toHaveBeenCalled();
        });
    });

});
