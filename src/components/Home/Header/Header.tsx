import React from "react";
import Navigation from './Navigation/Navigation';

import './Header.scss';
import Logo from "./Logo/Logo";


const Header = () => {
    return(
        <header className='page__header'>
            <Logo />
            <Navigation />
        </header>
    )
}
export default Header;