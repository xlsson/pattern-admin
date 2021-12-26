import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginModal from "../components/LoginModal";

describe("Tests for LoginModal component", () => {
    const setLoggedInUser = jest.fn();
    const switchView = jest.fn();
    let loginHasBeenCalled = false;
    const api = {
        login: function(username, password) {
            loginHasBeenCalled = true;
            return { token: "token" };
        }
    };

    beforeEach(() => {
        loginHasBeenCalled = false;
    });

    it("Elements get rendered", () => {
        render(<LoginModal
                    api={api}
                    switchView={switchView}
                    setLoggedInUser={setLoggedInUser} />);

        const title = screen.getByRole("heading");
        const inputFields = screen.getAllByRole("textbox");
        const submitButton = screen.getByRole("button");

        expect(title).toHaveTextContent("Administrativt gränssnitt");
        expect(inputFields.length).toEqual(2);
        expect(submitButton).toBeInTheDocument();
    });

    it("Clicking login calls api with correct values", async () => {
        render(<LoginModal
                    api={api}
                    switchView={switchView}
                    setLoggedInUser={setLoggedInUser} />);

        const submitButton = screen.getByRole("button");
        const fieldUsername = screen.getByTestId("fieldUsername");
        const fieldPassword = screen.getByTestId("fieldPassword");

        userEvent.type(fieldUsername, "testname");
        userEvent.type(fieldPassword, "testpassword");
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(loginHasBeenCalled).toEqual(true);

            expect(switchView).toHaveBeenCalled();
            expect(switchView).toHaveBeenCalledWith("overviewMap");

            expect(setLoggedInUser).toHaveBeenCalled();
            expect(setLoggedInUser).toHaveBeenCalledWith("testname");
        });
    });

});
