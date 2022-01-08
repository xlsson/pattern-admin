import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Price from "../components/Price";

describe("Tests for Price component", () => {
    const cities = require("./mockdata/cities.json");
    const currentCity = cities["61a8fd85ea20b50150945887"];
    const prices = require("./mockdata/prices.json");
    const priceId = prices[0]._id;

    let getPricesHasBeenCalled;
    const api = {
        getPrices: function(cityId) {
            getPricesHasBeenCalled = true;
            return { prices: prices };
        },
        updatePrice: jest.fn()
    };

    const utils = { createFlashMessage: jest.fn() };
    const setMessage = jest.fn();

    beforeEach(() => {
      getPricesHasBeenCalled = false;
    });

    it('Price page gets rendered with expected elements', async () => {
        render(<Price
                    api={api}
                    utils={utils}
                    currentCity={currentCity}
                    setMessage={setMessage} />);

        await waitFor(() => {
            const title = screen.getByRole("heading");
            const startingFeeInput = screen.getByTestId("startingFee");
            const minutePriceInput = screen.getByTestId("minutePrice");
            const penaltyFeeInput = screen.getByTestId("penaltyFee");
            const discountInput = screen.getByTestId("discount");

            expect(title).toHaveTextContent("Administrera pristariff");
        });
    });

    it("Price page calls api as expected", async () => {
        render(<Price
                    api={api}
                    utils={utils}
                    currentCity={currentCity}
                    setMessage={setMessage} />);

        await waitFor(() => {
            expect(getPricesHasBeenCalled).toEqual(true);
        });
    });

    it('Price page renders expected data', async () => {
        render(<Price
                    api={api}
                    utils={utils}
                    currentCity={currentCity}
                    setMessage={setMessage} />);

        await waitFor(() => {
            const startingFeeInput = screen.getByTestId("startingFee");
            const minutePriceInput = screen.getByTestId("minutePrice");
            const penaltyFeeInput = screen.getByTestId("penaltyFee");
            const discountInput = screen.getByTestId("discount");

            expect(startingFeeInput).toHaveValue(10);
            expect(minutePriceInput).toHaveValue(3);
            expect(penaltyFeeInput).toHaveValue(50);
            expect(discountInput).toHaveValue(0.1);
        });
    });

    // it("Saving price calls api with correct parameters", async () => {
    //     render(<Price
    //                 api={api}
    //                 utils={utils}
    //                 currentCity={currentCity}
    //                 setMessage={setMessage} />);
    //
    //
    //         const submitButton = screen.getByRole("button");
    //         const startingFeeInput = screen.getByTestId("startingFee");
    //
    //         userEvent.type(startingFeeInput, "1337");
    //         userEvent.click(submitButton);
    //
    //     await waitFor(() => {
    //         expect(api.updatePrice).toHaveBeenCalled();
    //         expect(api.updatePrice).toHaveBeenCalledWith(
    //             priceId, { starting_fee: 1337 }
    //         );
    //     });
    // });
});
