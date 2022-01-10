import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FlashMessage from "../components/FlashMessage";

describe("Tests for FlashMessage component", () => {
    const msgOK = { text: "This is the message", error: false };
    const msgError = { text: "This is the message", error: true };
    const setMessage = jest.fn();

    it("OK message gets displayed", () => {
        render(<FlashMessage
                    message={msgOK}
                    setMessage={setMessage} />);

        const button = screen.getByRole("button");
        const border = screen.getByTestId("flash-border");
        const text = screen.getByText("This is the message");
        expect(border.classList.contains("error-border")).toBe(false);
    });

    it("Error message gets displayed", () => {
        render(<FlashMessage
                    message={msgError}
                    setMessage={setMessage} />);

        const button = screen.getByRole("button");
        const border = screen.getByTestId("flash-border");
        const text = screen.getByText("This is the message");
        expect(border.classList.contains("error-border")).toBe(true);
    });

    it("setMessage gets called when clicking close button", () => {
        render(<FlashMessage
                    message={msgError}
                    setMessage={setMessage} />);

        const button = screen.getByRole("button");

        expect(setMessage).toHaveBeenCalledTimes(0);

        userEvent.click(button);

        expect(setMessage).toHaveBeenCalledTimes(1);
    });

});
