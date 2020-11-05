import React, {useState} from 'react';
import './SettingsPage.scss';
import {MOBILE_LIBRARY, PASSWORD_CHANGE} from "../../../constants/routes";
import {Link} from "react-router-dom";

const SettingsPage = () => {
    const root = document.getElementById('root');
    const mobileLibrary = document.getElementById('MobileLibrary');
    const header = document.getElementById('app__header');
    const currentTheme = window.localStorage.getItem('theme');
    let initialPosition;
    if (currentTheme === 'dark') {
        initialPosition = {
            top: '-0.3em',
            left: '0',
        }
    } else {
        initialPosition = {
            top: '-0.3em',
            right: '0',
        }
    }
    const [theme, setTheme] = useState(currentTheme);
    const [position, setPosition] = useState(initialPosition)
    const toggleTheme = () => {
        root.classList.toggle('dark');
        mobileLibrary.classList.toggle('dark');
        let check = mobileLibrary.classList.contains('dark');
        if (check) {
            window.localStorage.setItem('theme', 'dark');
            setTheme('dark');
            setPosition({top: '-0.3em', left: '0'})
        } else {
            window.localStorage.setItem('theme', 'light');
            setTheme('light');
            setPosition({top: '-0.3em', right: '0'})
        }
        header.classList.toggle('app__header--dark');
    }

    return (
        <section>
            <h3 className="settings__title">Theme</h3>
            <p className="settings__description"> Mobile library offers dark and light mode - if you wish to change the
                theme of the page just click on this slider:</p>
            <div className={theme === 'dark' ? 'slider slider--moon' : 'slider slider--sun'}
                 onClick={() => toggleTheme()}>
                <i className={theme === 'dark' ? 'fas fa-moon theme--icon' : 'fas fa-sun theme--icon'}
                   style={{...position}}/>
            </div>
            <h3 className="settings__title">User info</h3>
            <p className="settings__description"> If you wish to change information about yourself - just follow this
                link:</p>
            <Link to={`${MOBILE_LIBRARY}/user/change`}>Change info</Link>
            <h3 className="settings__title">Password Change</h3>
            <p className="settings__description">If you wish to change your password - just follow this link:</p>
            <Link to={`${PASSWORD_CHANGE}`}>Change password</Link>
        </section>
    )
}
export default SettingsPage;