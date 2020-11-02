import React, {useState} from "react";
import Logo from "../../Home/Logo/Logo";
import Avatar from "../Avatar/Avatar";
import Info from "../Info/Info";
import './Header.scss';
import Navigation from "../Navigation/Navigation";
import {MOBILE_LIBRARY} from "../../constants/routes";
import {Link} from "react-router-dom";

const Header = ({setSearch}) => {
    const [showMenu,setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <header className='app__header'>
            <Link to={`${MOBILE_LIBRARY}`}><Logo show={showSearch}/></Link>
            <div className='user__panel'>
            <Info showSearch={showSearch} setShowSearch={setShowSearch} setSearch={setSearch}/>
            <Avatar setShow={setShowMenu}/>
            </div>
            <Navigation show={showMenu}/>
        </header>
    )
}

export default Header;