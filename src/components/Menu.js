import ChangeCity from './ChangeCity';

function Menu(props) {
    function handleMenuClick(choice) {
        props.mainContent(choice);
    }

    function handleCityChange(city) {
        props.cityChoice(city);
    }

    return (
        <div className="header-wrapper">
            <ChangeCity cityChoice={handleCityChange} />
            <ul className="menu-wrapper">
                <li onClick={() => handleMenuClick("bikes")}>Cyklar</li>
                <li onClick={() => handleMenuClick("chargingStations")}>Laddningsstationer</li>
                <li onClick={() => handleMenuClick("parkingStations")}>Parkeringszoner</li>
                <li onClick={() => handleMenuClick("map")}>Karta</li>
                <li onClick={() => handleMenuClick("users")}>Kunder (ej stadberoende)</li>
            </ul>
        </div>
    );
}

export default Menu;
