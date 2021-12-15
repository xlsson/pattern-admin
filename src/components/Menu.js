import React from 'react';
import ChangeCity from './ChangeCity';
import LoggedInBox from './LoggedInBox';
import PropTypes from "prop-types";

Menu.propTypes = {
    switchView: PropTypes.func,
    view: PropTypes.string,
    cities: PropTypes.object,
    allCities: PropTypes.object,
    chooseCity: PropTypes.func,
    loggedInUser: PropTypes.string,
    setLoggedInUser: PropTypes.func
};

function Menu(props) {
    let active = props.view;

    function handleMenuClick(view) { props.switchView(view); }

    return (
        <div className="header-wrapper">

            <ChangeCity
                allCities={props.allCities}
                cities={props.cities}
                chooseCity={props.chooseCity} />

            <ul className="menu-wrapper">
                <li className={ (active === "overviewMap") ? "active" : "" }
                    onClick={() => handleMenuClick("overviewMap")}>
                    Översiktskarta
                </li>
                <li className={ ((active === "bikes") || (active === "bike")) ? "active" : "" }
                    onClick={() => handleMenuClick("bikes")}>
                    Cyklar
                </li>
                <li className={ ((active === "chargeStations") || (active === "chargeStation")) ? "active" : "" }
                    onClick={() => handleMenuClick("chargeStations")}>
                    Laddningsstationer
                </li>
                <li className={ ((active === "parkingStations") || (active === "parkingStation")) ? "active" : "" }
                    onClick={() => handleMenuClick("parkingStations")}>
                    Parkeringsstationer
                </li>
                <li className={ ((active === "users") || (active === "user")) ? "active" : "" }
                    onClick={() => handleMenuClick("users")}>
                    Kunder
                </li>
                <li className={ (active === "price") ? "active" : "" }
                    onClick={() => handleMenuClick("price")}>
                    Pristariff
                </li>
            </ul>

            <LoggedInBox
                loggedInUser={props.loggedInUser}
                setLoggedInUser={props.setLoggedInUser}
                switchView={props.switchView} />

        </div>
    );
}

export default Menu;
