import { render, screen } from '@testing-library/react';
import ChangeCity from '../components/ChangeCity';

const allCities = require("./allCities.json");
const cities = require("./cities.json");

const chooseCity = function(selectedId) {
    console.log("placeholder function to allow testing");
};

test('Default dropdown value is displayed', () => {
    render(<ChangeCity
                allCities={allCities}
                cities={cities}
                chooseCity={chooseCity} />);
    const defaultDropdownValue = screen.getByDisplayValue("Sverige");
    expect(defaultDropdownValue).toBeInTheDocument();
});

test('Expected number of options are displayed', () => {
    render(<ChangeCity
                allCities={allCities}
                cities={cities}
                chooseCity={chooseCity} />);
    const options = screen.getAllByRole('option');
    expect(options.length).toEqual(4);
});

test('Select option 0', () => {
    render(<ChangeCity
                allCities={allCities}
                cities={cities}
                chooseCity={chooseCity} />);
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveProperty("value");
    expect(options[0].value).toEqual("61a76026bb53f131584de9b1");
});
