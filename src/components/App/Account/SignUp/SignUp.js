import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {withFirebase} from '../Firebase'
import * as ROUTES from '../../../constants/constants';

const initialState = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

const SignUpPage = ({firebase}) => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm/>
        <SignUpLink/>
    </div>
);

const SignUpFormBase = ({firebase}) => {
    const [form, setForm] = useState({...initialState})
    const onSubmit = (event) => {
        const {username, email, passwordOne} = form;

        firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((authUser) => {
                setForm({...initialState});
            })
            .catch((error) => {
                setForm(prevState => {
                    return {
                        ...prevState,
                        error: error,
                    }
                });
            });

        event.preventDefault();
    }

    const handleForm = (event) => {
        const {name, value} = event.target;
        setForm(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    };
    const isInvalid =
        form.passwordOne !== form.passwordTwo ||
        form.passwordOne === '' ||
        form.email === '' ||
        form.username === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="username"
                value={form.username}
                onChange={e => handleForm(e)}
                type="text"
                placeholder="Full Name"
            />
            <input
                name="email"
                value={form.email}
                onChange={e => handleForm(e)}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={form.passwordOne}
                onChange={e => handleForm(e)}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={form.passwordTwo}
                onChange={e => handleForm(e)}
                type="password"
                placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">Sign Up</button>

            {form.error && <p>{form.error.message}</p>}
        </form>
    );

}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};