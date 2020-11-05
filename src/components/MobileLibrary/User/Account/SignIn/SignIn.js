import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import '../form.scss';
import { SignUpLink } from '../SignUp/SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../../../constants/routes';
import {PasswordForgetLink} from "../PasswordForget/PasswordForget";

const SignInPage = () => (
    <div className='page__form'>
        <SignInForm/>
        <SignUpLink/>
        <PasswordForgetLink/>
    </div>
)

const initialState = {
    email: '',
    password: '',
    error: null,
}

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...initialState};
    }
    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...initialState });
                this.props.history.push(ROUTES.MOBILE_LIBRARY);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };
    render () {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        const theme = window.localStorage.getItem('theme')
        return (
            <form className={theme === 'dark'? 'form form--dark':'form'} onSubmit={this.onSubmit}>
                <h1 className='form__title'>Sign In</h1>
                <input className='form__input'
                       name="email"
                       value={email}
                       onChange={this.onChange}
                       type="text"
                       placeholder="Email Address"
                />
                <input className='form__input'
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button className='button' disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p className='error'>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };