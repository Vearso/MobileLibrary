import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyBb9BpA7c822Zk9YVUmiFFa68aZcllBTZ0",
    authDomain: "mobile-library-840fd.firebaseapp.com",
    databaseURL: "https://mobile-library-840fd.firebaseio.com",
    projectId: "mobile-library-840fd",
    storageBucket: "mobile-library-840fd.appspot.com",
    messagingSenderId: "86171278881",
    appId: "1:86171278881:web:44e002a8933a570487cd60",
    measurementId: "G-SL4PZCPGXB"
};
// Initialize Firebase
class Firebase {
    private auth: any;
    private db: any;
    constructor(){
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }
    // AUTH API //
    doCreateUserWithEmailAndPassword = (email :string, password : string) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email :string, password:string) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email : string) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password : string ) =>
        this.auth.currentUser.updatePassword(password);

    // USER API //

    user = (uid :any) => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');



}
export default Firebase;
