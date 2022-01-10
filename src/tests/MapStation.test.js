import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MapStation from "../components/MapStation";

configure({ adapter: new Adapter() });

describe("Tests for MapStation component", () => {
    const type = "charge";
    const station = {
        _id: "61a8ff1b108640ebcc7fd228",
        name: "Stora Torget",
        coordinates: {
            northwest: {
                lat: 59.380714,
                long: 13.503747
            },
            southeast: {
                lat: 59.380611,
                long: 13.504056
            }
        }
    };
    const getIcon = jest.fn();

    const wrapper = shallow(<MapStation
        type={type}
        station={station}
        getIcon={getIcon} />);

    it('MapStation gets rendered', () => {
        const marker = wrapper.find("mapstation-wrapper");
    });
});
