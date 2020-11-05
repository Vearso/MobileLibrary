import './App.scss';
import React from "react";
import Home from "../Home/Home";
import MobileLibrary from '../MobileLibrary/MobileLibrary';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import * as ROUTES from '../../components/constants/routes';
import SignUpPage from "../../components/MobileLibrary/User/Account/SignUp/SignUp";
import SignInPage from "../../components/MobileLibrary/User/Account/SignIn/SignIn";
import {withAuthentication} from "../../components/MobileLibrary/User/Account/Session";
import PasswordForgetPage from "../../components/MobileLibrary/User/Account/PasswordForget/PasswordForget";
import AccountPage from "../../components/MobileLibrary/User/Account/Account";
import PasswordChangeForm from "../../components/MobileLibrary/User/Account/PasswordChange/PasswordChange";
import UserInitializationPage from "../../components/MobileLibrary/User/Account/Initialization/UserInitialization";

const App = () => {
    const theme = window.localStorage.getItem('theme');
    const root = document.getElementById('root');
        if(theme === 'dark'){
            root.classList.add('dark');
    }
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={Home}/>
                    <Route path={ROUTES.MOBILE_LIBRARY} component={MobileLibrary}/>
                    <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
                    <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                    <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChangeForm}/>
                    <Route path={ROUTES.SET_UP} component={UserInitializationPage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default withAuthentication(App);
