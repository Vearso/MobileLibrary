import React from "react";
import {withFirebase} from "../Firebase";
import {Link} from "react-router-dom";

const SignOutButton = ({firebase}) => (
    <button style={{background: 'none',border: 'none', padding: '0'}} type='button' onClick={firebase.doSignOut}>
        <Link to='/'>Sign Out</Link>
    </button>
)

export default withFirebase(SignOutButton);