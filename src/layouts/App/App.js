import './App.scss';
import React from "react";
import Home from "../Home/Home";
import MobileLibrary from '../MobileLibrary/MobileLibrary';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import * as ROUTES from '../../components/constants/routes';
import SignUpPage from "../../components/Account/SignUp/SignUp";
import SignInPage from "../../components/Account/SignIn/SignIn";
import {withAuthentication} from "../../components/Account/Session";
import PasswordForgetPage from "../../components/Account/PasswordForget/PasswordForget";
import AdminPage from "../../components/Account/Admin/Admin";
import AccountPage from "../../components/Account/Account";
import PasswordChangeForm from "../../components/Account/PasswordChange/PasswordChange";
import UserInitializationPage from "../../components/Account/Initialization/UserInitialization";

const App = () => {

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={Home}/>
                    <Route path={ROUTES.MOBILE_LIBRARY} component={MobileLibrary}/>
                    <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
                    <Route path={ROUTES.ADMIN} component={AdminPage}/>
                    <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                    <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChangeForm}/>
                    <Route path={ROUTES.SET_UP} component={UserInitializationPage}/>
                </Switch>
            </div>
        </Router>
    );

}

export default withAuthentication(App);
