import './App.scss';
import React, {useState} from "react";
import Home from "../Home/Home";
import MobileLibrary from '../MobileLibrary/MobileLibrary';
import {BrowserRouter as Router, Route} from "react-router-dom";
import * as ROUTES from '../../components/constants/constants';
import SignUpPage from "../../components/App/Account/SignUp/SignUp";
import SignInPage from "../../components/App/Account/SignIn/SignIn";

function App() {
    const [authUser,setAuthUser] = useState(null);
    return (
        <Router>
            <div className="App">
                <Route exact path={ROUTES.LANDING} component={Home}/>
                <Route exact path={ROUTES.APP} component={MobileLibrary}/>
                <Route exact path={ROUTES.SIGN_IN} component={SignInPage}/>
                <Route exact path={ROUTES.SIGN_UP} component={SignUpPage}/>
            </div>
        </Router>
    );
}

export default App;
