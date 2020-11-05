import React, {useState} from "react";
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './Navigation.scss';

const Navigation = () => {
    const [showMenu, setShowMenu] = useState(false)
    const handleClick = (e: any) => {
        setShowMenu(prev => !prev);
    }
    const theme = window.localStorage.getItem('theme');
    return (
        <nav className="header__nav">
            <button className="nav__hamburger" onClick={e => handleClick(e)}>
                <i className='fas fa-bars nav__hamburger--icon'/>
            </button>
            <ul className={
                showMenu
                ? theme === 'dark'
                    ? "nav__list--show nav--dark"
                    : "nav__list--show"
                : "nav__list--hidden nav__list"}>
                <li><Link to={ROUTES.LANDING} onClick={() => setShowMenu(false)}>Home</Link></li>
                <li><a href={'#about'} onClick={() => setShowMenu(false)}>About</a></li>
                <li><a href={'#examples'} onClick={() => setShowMenu(false)}>Examples</a></li>
                <li><a href={'#footer'} onClick={() => setShowMenu(false)}>Contact</a></li>
                <li><Link to={ROUTES.MOBILE_LIBRARY}>App</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;