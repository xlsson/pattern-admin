import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import OverviewMap from "../components/OverviewMap";
import MockedMap from '../components/Map';

jest.mock("../components/Map", () => {
    return function DummyMap(props) {
        return (
            <p>MockedMap</p>
        );
    };
});

describe("Tests for OverviewMap component", () => {
    const utils = {
        getCenter: jest.fn(),
        setView: jest.fn(),
        mapInstance: { getZoom: jest.fn(), getCenter: jest.fn() }
    };
    const cities = require("./mockdata/cities.json");
    const bikes = require("./mockdata/bikes.json");
    const citiesArray = require("./mockdata/citiesArray.json");
    const currentCity = cities["61a8fd85ea20b50150945887"];
    const setMessage = jest.fn();

    let getBikesHasBeenCalled = false;
    let getBikesCorrectParam = false;
    const api = {
        getBikes: jest.fn()
    };

    beforeEach(() => {
      getBikesHasBeenCalled = false;
      getBikesCorrectParam = false;
    });

    it('OverviewMap page gets rendered with expected elements', () => {
        render(
            <OverviewMap
                api={api}
                utils={utils}
                currentCity={currentCity}
                cities={cities}
                citiesArray={citiesArray}
                setMessage={setMessage} />
        );

        const title = screen.getByRole("heading");
        const button = screen.findByTestId("autofetch-button");
        const content = screen.getByText(/MockedMap/);

        expect(title).toHaveTextContent(/Översiktskarta/);
    });

    it('Click on autofetch button changes button text', async () => {
        render(
            <OverviewMap
                api={api}
                utils={utils}
                currentCity={currentCity}
                cities={cities}
                citiesArray={citiesArray}
                setMessage={setMessage} />
        );

        let button = screen.getByRole('button', { name: /Starta/ });

        userEvent.click(button);

        button = screen.getByRole('button', { name: /Avbryt/ });
    });

});
