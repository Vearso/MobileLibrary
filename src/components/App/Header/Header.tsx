import React from "react";
import Logo from "../../Home/Logo/Logo";
import User from "./User/User";
import Search from "./Search/Search";
import Info from "./Info/Info";
import './Header.scss';

const Header = () => {
    return (
        <header className='app__header'>
            <User/>
            <Logo onlyLogo={true}/>
            <div>
                <Search/>
                <Info/>
            </div>
        </header>
    )
}

export default Header;