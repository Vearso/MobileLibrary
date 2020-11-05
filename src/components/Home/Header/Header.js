import React from "react";
import Navigation from '../Navigation/Navigation';
import './Header.scss';
import Logo from "../Logo/Logo";



const Header = () => {
    const theme = window.localStorage.getItem('theme');
    return (
        <header className={theme === 'dark' ? 'page__header header--dark':'page__header'}>
            <Logo link='/'/>
            <Navigation/>
        </header>
    )
}
export default Header;