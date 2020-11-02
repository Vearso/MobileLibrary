import React, {useState, useEffect} from 'react';
import SignOutButton from "../User/Account/SignOut/SignOut";
import './Navigation.scss';
import {Link} from "react-router-dom";
import {MOBILE_LIBRARY} from "../../constants/routes";
const Navigation = ({show}) => {
    return(
        <nav className={show ? "app__navigation" : "disabled"}>
            <ul className="app__navigation--list">
                <h3 className='list--title'>MENU</h3>
                <li><Link to={`${MOBILE_LIBRARY}/user`}>My profile</Link></li>
                <li><Link to={`${MOBILE_LIBRARY}/user/books`}>My books</Link></li>
                <li><Link to={`${MOBILE_LIBRARY}/user/contacts`}>Contacts</Link></li>
                <li><Link to={`${MOBILE_LIBRARY}/user/settings`}>Settings</Link></li>
                <li><SignOutButton/></li>
            </ul>
        </nav>
    )
}

export default Navigation;