import { render, waitFor, fireEvent, screen } from '@testing-library/react';
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
        expect(loggedInUserLabel).toHaveTextContent("Inloggad: testUser");
    });

    it('Log out button is rendered', () => {
        render(<LoggedInBox
                    api={api}
                    switchView={switchView}
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser} />);

        const button = screen.getByRole("button");
        expect(button).toHaveTextContent("Logga ut");
    });

    it('Logging out changes expected values', () => {
        const { rerender } = render(<LoggedInBox
                api={api}
                switchView={switchView}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser} />);

        const loggedInUserLabel = screen.getByTestId("loggedInUserLabel");
        const button = screen.getByRole("button");

        expect(loggedInUserLabel).toHaveTextContent("Inloggad: testUser");

        userEvent.click(button);

        rerender(<LoggedInBox
                    api={api}
                    switchView={switchView}
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser} />);

        expect(loggedInUser).toEqual("");
        expect(api.token).toEqual("");
        expect(loggedInUserLabel).toHaveTextContent("");
        expect(switchView).toHaveBeenCalledWith("loginModal");
    });

});
