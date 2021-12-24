import { render, waitFor, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoggedInBox from '../components/LoggedInBox';

describe("Tests for LoggedInBox component", () => {
    let view;
    let loggedInUser = "testUser";
    const setLoggedInUser = function(newUser) { loggedInUser = newUser; };
    const switchView = jest.fn();
    let api = {
        token: "testToken"
    };

    beforeEach(() => {
        view = "overviewMap";
        api.token = "testToken";
    });

    it('Logged in user is rendered', () => {
        render(<LoggedInBox
                    api={api}
                    switchView={switchView}
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser} />);

        const loggedInUserLabel = screen.getByTestId("loggedInUserLabel");
        expect(loggedInUserLabel).toHaveTextContent("Inloggad som: testUser");
    });

    it('Log out link is rendered', () => {
        render(<LoggedInBox
                    api={api}
                    switchView={switchView}
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser} />);

        const logOutLink = screen.getByTestId("logoutLink");
        expect(logOutLink).toHaveTextContent(/Logga ut/i);
    });

    it('Logging out changes expected values', () => {
        const { rerender } = render(<LoggedInBox
                api={api}
                switchView={switchView}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser} />);

        const loggedInUserLabel = screen.getByTestId("loggedInUserLabel");
        expect(loggedInUserLabel).toHaveTextContent("Inloggad som: testUser");

        const logOutLink = screen.getByTestId("logoutLink");
        userEvent.click(logOutLink);
        rerender(<LoggedInBox
                    api={api}
                    switchView={switchView}
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser} />);

        expect(loggedInUser).toEqual("");
        expect(api.token).toEqual("");
        expect(loggedInUserLabel).toHaveTextContent("Inloggad som:");
        expect(switchView).toHaveBeenCalledWith("loginModal");
    });

});
