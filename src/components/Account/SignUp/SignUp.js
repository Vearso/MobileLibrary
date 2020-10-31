import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

import '../form.scss';


const SignUpPage = () => (
    <div className='page__form'>
        <h1 className='form__title'>Sign Up</h1>
        <SignUpForm/>
    </div>
);

const initialState = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...initialState};
    }

    onSubmit = event => {
        const {username, email, passwordOne} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        name:'',
                        surname:'',
                        gender:'',
                        about:'',
                        favoriteGenre:'',
                        favoriteBooks:[],
                        queue:[],
                        contacts:{},
                        inProgress:'',
                    });
            })
            .then(() => {
                this.setState({...initialState});
                this.props.history.push(ROUTES.SET_UP);
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form className='form' onSubmit={this.onSubmit}>
                <input className='form__input'
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input className='form__input'
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input className='form__input'
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input className='form__input'
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button className='button' disabled={isInvalid} type="submit">
                    Sign Up
                </button>

                {error && <p className={error}>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};