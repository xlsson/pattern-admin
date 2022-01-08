import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Station from "../components/Station";
import MockedMap from '../components/Map';

jest.mock("../components/map", () => {
    return function DummyMap(props) {
        return (
            <p>MockedMap</p>
        );
    };
});

describe("Tests for Station component", () => {
    const switchView = jest.fn();
    const bikes = require("./mockdata/bikes.json");
    const cities = require("./mockdata/cities.json");
    const stockholmId = "61a7603dbb53f131584de9b3";
    const type = "charge";
    const station = cities[stockholmId].charge_stations[0];
    station.city_id = stockholmId;
    station.city_name = cities[stockholmId].name;

    const filteredBikes = bikes.filter(function(item) {
        return item.city_id === stockholmId;
    });

    let getBikesHasBeenCalled;
    const api = {
        getBikes: function(cityId) {
            getBikesHasBeenCalled = true;
            return { bikes: filteredBikes };
        }
    };

    it('Station page gets rendered with expected elements', async () => {
        render(<Station
            api={api}
            switchView={switchView}
            station={station}
            type={type} />);

        await waitFor(() => {
            const title = screen.getByRole("heading");
            const nameColumn = screen.getByTestId("name");
            const cityColumn = screen.getByTestId("city");
            const bikesColumn = screen.getByTestId("bikes");

            expect(title).toHaveTextContent("Laddningsstation");

        });
    });

    it('Station page contains expected station data', async () => {
        render(<Station
            api={api}
            switchView={switchView}
            station={station}
            type={type} />);

        await waitFor(() => {
            const nameColumn = screen.getByTestId("name");
            const cityColumn = screen.getByTestId("city");
            const bikesHeader = screen.getByTestId("nr-of-bikes");
            const mapComponent = screen.getByText(/MockedMap/);

            expect(nameColumn).toHaveTextContent("Mariatorget");
            expect(cityColumn).toHaveTextContent("Stockholm");
            expect(bikesHeader).toHaveTextContent(/2/);
        });
    });

    it('Station page calls getBikes', async () => {
        getBikesHasBeenCalled = false;
        render(<Station
            api={api}
            switchView={switchView}
            station={station}
            type={type} />);

        await waitFor(() => {
            expect(getBikesHasBeenCalled).toBe(true);
        });
    });

    it('Click on bike calls switchView', async () => {
        render(<Station
            api={api}
            switchView={switchView}
            station={station}
            type={type} />);

        await waitFor(() => {
            const bikeRow = screen.getAllByTestId("bike");

            expect(switchView).toHaveBeenCalledTimes(0);

            userEvent.click(bikeRow[0]);

            expect(switchView).toHaveBeenCalledTimes(1);
        });
    });

});
