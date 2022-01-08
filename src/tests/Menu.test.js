import { render, waitFor, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '../components/Menu';

describe("Tests for Menu component", () => {
    const api = { token: "token" }
    const allCities = require("./mockdata/allCities.json");
    const cities = require("./mockdata/cities.json");
    const chooseCity = jest.fn();
    const setLoggedInUser = jest.fn();
    const loggedInUser = "testName";
    let view;
    const switchView = function(newView) {
        view = newView;
    };

    beforeEach(() => {
        view = "overviewMap";
    });

    it('Menu is rendered with expected elements', () => {
        render(<Menu
                api={api}
                switchView={switchView}
                view={view}
                cities={cities}
                allCities={allCities}
                chooseCity={chooseCity}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser} />);

        const menu = screen.getByRole("list");
        const { getAllByRole } = within(menu);
        const links = getAllByRole("listitem");
        const logo = screen.getByTestId("logo");

        expect(links.length).toBe(6);
    });

    it('First link has the expected text and class', () => {
        render(<Menu
                api={api}
                switchView={switchView}
                view={view}
                cities={cities}
                allCities={allCities}
                chooseCity={chooseCity}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser} />);

        const menu = screen.getByRole("list");
        const { getAllByRole } = within(menu);
        const links = getAllByRole("listitem");

        expect(links[0].textContent).toEqual("Karta");
        expect(links[0].className).toEqual("active");
    });

    it('Click on second menu link sets class to active', () => {
        const { rerender } = render(<Menu
                api={api}
                switchView={switchView}
                view={view}
                cities={cities}
                allCities={allCities}
                chooseCity={chooseCity}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser} />);

        //Setup
        const menu = screen.getByRole("list");
        const { getAllByRole } = within(menu);
        const links = getAllByRole("listitem");

        expect(links[1].textContent).toEqual("Cyklar");
        expect(links[0].className).toEqual("active");
        expect(links[1].className).toEqual("");

        //Act
        userEvent.click(links[1]);
        rerender(<Menu
                api={api}
                switchView={switchView}
                view={view}
                cities={cities}
                allCities={allCities}
                chooseCity={chooseCity}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser} />);

        expect(links[0].className).toEqual("");
        expect(links[1].className).toEqual("active");
    });

});
