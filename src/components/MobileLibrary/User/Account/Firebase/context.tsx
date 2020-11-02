import React from 'react';
const FirebaseContext = React.createContext<ContextValue>(null);

export type ContextValue = null | any;

export const withFirebase = (Component :any) => (props:any) => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)


export default FirebaseContext;