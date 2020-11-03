import React, {useState} from "react";
import Logo from "../../../Home/Logo/Logo";
import Avatar from "./Avatar/Avatar";
import Info from "./Info/Info";
import './Header.scss';
import Navigation from "./Navigation/Navigation";
import {Link} from "react-router-dom";
import GoBackButton from "./GoBack/GoBackButton";

const Header = ({setSearch}) => {
    const [showMenu,setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const path = window.location.pathname;
    return (
        <header className='app__header'>
            {path === '/MobileLibrary'
                ? <Link to={`/`}><Logo show={showSearch}/></Link>
                : <GoBackButton/>}
            <div className='user__panel'>
            <Info showSearch={showSearch} setShowSearch={setShowSearch} setSearch={setSearch}/>
            <Avatar setShow={setShowMenu}/>
            </div>
            <Navigation show={showMenu} setShow={setShowMenu}/>
        </header>
    )
}

export default Header;