import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import UsersTable from './components/UsersTable';

function App() {
    const [menuChoice, setmenuChoice] = useState("start");

    return (
        <div className="page-wrapper">
            <header>
                <Menu />
            </header>
            <div className="content">
                <UsersTable />
            </div>
        </div>
    );
}

export default App;
