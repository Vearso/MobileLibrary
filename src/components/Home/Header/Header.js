import React from "react";
import Navigation from '../Navigation/Navigation';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './Header.scss';
import Logo from "../Logo/Logo";
import * as ROUTES from "../../constants/routes";
import Home from "../../../layouts/Home/Home";
import MobileLibrary from "../../../layouts/MobileLibrary/MobileLibrary";
import SignInPage from "../../Account/SignIn/SignIn";
import SignUpPage from "../../Account/SignUp/SignUp";
import PasswordForgetPage from "../../Account/PasswordForget/PasswordForget";
import AdminPage from "../../Account/Admin/Admin";
import AccountPage from "../../Account/Account";
import PasswordChangeForm from "../../Account/PasswordChange/PasswordChange";


const Header = () => {
    return (
        <header className='page__header'>
            <Logo link='/'/>
            <Navigation/>
        </header>
    )
}
export default Header;