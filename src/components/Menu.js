import ChangeCity from './ChangeCity';

function Menu(props) {
    let active = props.view;

    function handleMenuClick(view) {
        props.switchView(view);
    }

    function handleCityChange(city) {
        props.cityChoice(city);
    }

    return (
        <div className="header-wrapper">
            <ChangeCity chosenCity={handleCityChange} />
            <ul className="menu-wrapper">
                <li className={ (active === "map") ? "active" : "" }
                    onClick={() => handleMenuClick("map")}>
                    Karta
                </li>
                <li className={ (active === "bikes") ? "active" : "" }
                    onClick={() => handleMenuClick("bikes")}>
                    Cyklar
                </li>
                <li className={ (active === "chargingStations") ? "active" : "" }
                    onClick={() => handleMenuClick("chargingStations")}>
                    Laddningsstationer
                </li>
                <li className={ (active === "parkingStations") ? "active" : "" }
                    onClick={() => handleMenuClick("parkingStations")}>
                    Parkeringszoner
                </li>
                <li className={
                        ((active === "users") || (active === "user")) ? "active" : ""
                    }
                    onClick={() => handleMenuClick("users")}>
                    Kunder
                </li>
            </ul>
        </div>
    );
}

export default Menu;
