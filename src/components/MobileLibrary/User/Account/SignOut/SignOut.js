import React from "react";
import {withFirebase} from "../Firebase";

const SignOutButton = ({firebase}) => (
    <button style={{background: 'none',border: 'none', padding: '0'}} type='button' onClick={firebase.doSignOut}>
        Sign Out
    </button>
)

export default withFirebase(SignOutButton);