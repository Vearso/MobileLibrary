import React, {useState, useEffect} from 'react';
import SignOutButton from "../../Account/SignOut/SignOut";
import './Navigation.scss';
const Navigation = ({show}) => {
    return(
        <nav className={show ? "app__navigation" : "disabled"}>
            <ul className="app__navigation--list">
                <h3 className='list--title'>MENU</h3>
                <li>My profile</li>
                <li>My books</li>
                <li>Contacts</li>
                <li>Settings</li>
                <li><SignOutButton/></li>
            </ul>
        </nav>
    )
}

export default Navigation;