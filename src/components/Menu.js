import ChangeCity from './ChangeCity';

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
                    Översikt
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
        </div>
    );
}

export default Menu;
