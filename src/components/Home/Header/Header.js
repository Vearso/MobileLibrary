import React from "react";
import Navigation from '../Navigation/Navigation';
import {BrowserRouter as Router} from 'react-router-dom';

import './Header.scss';
import Logo from "../Logo/Logo";


const Header = () => {
    return (
        <header className='page__header'>
            <Logo link='/'/>
            <Router>
                <Navigation/>
            </Router>
        </header>
    )
}
export default Header;