import React, {useState} from "react";
import Logo from "../../Home/Logo/Logo";
import Avatar from "../Avatar/Avatar";
import Info from "../Info/Info";
import './Header.scss';
import Navigation from "../Navigation/Navigation";

const Header = ({setSearch}) => {
    const [showMenu,setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <header className='app__header'>
            <Logo link={'mobilelibrary'} show={showSearch}/>
            <div className='user__panel'>
            <Info showSearch={showSearch} setShowSearch={setShowSearch} setSearch={setSearch}/>
            <Avatar setShow={setShowMenu}/>
            </div>
            <Navigation show={showMenu}/>
        </header>
    )
}

export default Header;