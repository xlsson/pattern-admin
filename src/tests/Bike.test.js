import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Bike from "../components/Bike";

configure({ adapter: new Adapter() });

describe("Tests for Bike component", () => {
    const bikes = require("./mockdata/bikes.json");
    const bike = bikes[0];
    const cities = require("./mockdata/cities.json");
    const currentCity = cities[0];
    const api = {
        getBikes: function(cityId) {
            return bike;
        }
    };

    const wrapper = shallow(
        <Bike
            api={api}
            bike={bike}
            currentCity={currentCity}
            cities={cities} />
    );

    it('Bike page gets rendered and displays expected data', () => {
        const title = wrapper.find("h1");
        const cityname = wrapper.find("table tbody tr td").at(1);
        const batteryTableRow = wrapper.find("table tbody tr").at(1);
        const battery = batteryTableRow.find("td").at(1);

        const actualCityname = cities[bike.city_id].name;
        const actualBatteryStatus = bike.battery_status;

        expect(title.text().includes("Cykel")).toBe(true);
        expect(cityname.text().includes(actualCityname)).toBe(true);
        expect(wrapper.exists("Map")).toBe(true);
    });

});
