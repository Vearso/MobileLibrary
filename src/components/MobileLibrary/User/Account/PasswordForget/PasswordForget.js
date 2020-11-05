import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../form.scss';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../../../constants/routes';
import {MOBILE_LIBRARY} from "../../../../constants/routes";

const PasswordForgetPage = () => (
    <div className='page__form'>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(`${MOBILE_LIBRARY}`);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';

        const theme = window.localStorage.getItem('theme');
        return (
            <form className={theme === 'dark' ? 'form form--dark': 'form'} onSubmit={this.onSubmit}>
                <h1 className='form__title'>Password Forget</h1>
                <input className='form__input'
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <button className='button' disabled={isInvalid} type="submit">
                    Reset My Password
                </button>

                {error && <p className='error'>{error.message}</p>}
            </form>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };