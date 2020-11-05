import React, {useState} from "react";
import Logo from "../../../Home/Logo/Logo";
import Avatar from "./Avatar/Avatar";
import Info from "./Info/Info";
import './Header.scss';
import Navigation from "./Navigation/Navigation";
import {Link} from "react-router-dom";
import GoBackButton from "./GoBack/GoBackButton";
import {MOBILE_LIBRARY} from "../../../constants/routes";

const Header = ({setSearch}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const path = window.location.pathname;
    const width = window.innerWidth;
    const theme = window.localStorage.getItem('theme');
    return (
        <header className={theme === 'dark' ? 'app__header--dark app__header' : 'app__header'} id='app__header'>
            {path === '/MobileLibrary'
                ? <Link to={`/`}><Logo show={showSearch}/></Link>
                : <> <GoBackButton/> {width > 765 && <Link to={`${MOBILE_LIBRARY}`}><Logo show={showSearch}/></Link>}</>}
                <div className='user__panel'>
                    <Info showSearch={showSearch} setShowSearch={setShowSearch} setSearch={setSearch}/>
                    <Avatar setShow={setShowMenu}/>
                </div>
                <Navigation show={showMenu} setShow={setShowMenu}/>
                </header>
                )
            }

            export default Header;