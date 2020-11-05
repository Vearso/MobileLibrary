import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from "./layouts/App/App";
import Firebase, {FirebaseContext} from './components/MobileLibrary/User/Account/Firebase';


// @ts-ignore
ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </FirebaseContext.Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your MobileLibrary, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
