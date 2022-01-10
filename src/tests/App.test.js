import { render, waitFor, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import MockedLoginModal from '../components/LoginModal';
import MockedMenu from '../components/Menu';
import MockedBikesTable from '../components/BikesTable';
import MockedBike from '../components/Bike';
import MockedStationsTable from '../components/StationsTable';
import MockedStation from '../components/Station';
import MockedUsersTable from '../components/UsersTable';
import MockedUser from '../components/User';
import MockedOverviewMap from '../components/OverviewMap';
import MockedPrice from '../components/Price';
import MockedFlashMessage from '../components/FlashMessage';

jest.mock("../components/LoginModal", () => {
    return function DummyLoginModal(props) {
        return ( <p>MockedLoginModal</p> );
    };
});

jest.mock("../components/Menu", () => {
    return function DummyMenu(props) {
        return ( <p>MockedMenu</p> );
    };
});

jest.mock("../components/BikesTable", () => {
    return function DummyBikesTable(props) {
        return ( <p>MockedBikesTable</p> );
    };
});

jest.mock("../components/Bike", () => {
    return function DummyBike(props) {
        return ( <p>MockedBike</p> );
    };
});

jest.mock("../components/StationsTable", () => {
    return function DummyStationsTable(props) {
        return ( <p>MockedStationsTable</p> );
    };
});

jest.mock("../components/Station", () => {
    return function DummyStation(props) {
        return ( <p>MockedStation</p> );
    };
});

jest.mock("../components/UsersTable", () => {
    return function DummyUsersTable(props) {
        return ( <p>MockedUsersTable</p> );
    };
});

jest.mock("../components/User", () => {
    return function DummyUser(props) {
        return ( <p>MockedUser</p> );
    };
});

jest.mock("../components/OverviewMap", () => {
    return function DummyOverviewMap(props) {
        return ( <p>MockedOverviewMap</p> );
    };
});

jest.mock("../components/Price", () => {
    return function DummyPrice(props) {
        return ( <p>MockedPrice</p> );
    };
});

jest.mock("../components/FlashMessage", () => {
    return function DummyFlashMessage(props) {
        return ( <p>MockedFlashMessage</p> );
    };
});

describe("Tests for App component", () => {

    it('App elements get rendered', async () => {
        render(<App />);

        const page = screen.getByTestId("page-wrapper");
        const content = screen.getByTestId("content-wrapper");

        await waitFor(() => {
            const content = screen.getByText(/MockedLoginModal/);
        });
    });
});
