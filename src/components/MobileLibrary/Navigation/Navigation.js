import React from 'react';
import SignOutButton from "../User/Account/SignOut/SignOut";
import './Navigation.scss';
import {Link} from "react-router-dom";
import {MOBILE_LIBRARY} from "../../constants/routes";

const Navigation = ({show, setShow}) => {
    return (
        <nav className={show ? "app__navigation" : "disabled"}>
            <ul className="app__navigation--list">
                <h3 className='list--title'>MENU</h3>
                <li><Link to={`${MOBILE_LIBRARY}/user`} onClick={()=>setShow(false)}>My profile</Link></li>
                <li><Link to={`${MOBILE_LIBRARY}/user/books`} onClick={()=>setShow(false)}>My books</Link></li>
                <li><Link to={`${MOBILE_LIBRARY}/user/contacts`} onClick={()=>setShow(false)}>Contacts</Link></li>
                <li><Link to={`${MOBILE_LIBRARY}/user/settings`} onClick={()=>setShow(false)}>Settings</Link></li>
                <li><SignOutButton/></li>
            </ul>
        </nav>
    )
}

export default Navigation;