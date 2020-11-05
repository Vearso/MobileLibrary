import React, {Component} from 'react';
import '../form.scss';
import {withFirebase} from '../Firebase';
import {MOBILE_LIBRARY} from "../../../../constants/routes";
import GoBackButton from "../../../Content/Header/GoBack/GoBackButton";

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {passwordOne} = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(`${MOBILE_LIBRARY}`);
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
        const {passwordOne, passwordTwo, error} = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';
        const theme = window.localStorage.getItem('theme');
        return (
            <div className={'page__form'}>
                <form className={theme === 'dark' ? 'form form--dark':'form'} onSubmit={this.onSubmit}>
                    <GoBackButton/>
                    <h1 className='form__title'>Change password</h1>
                    <input className='form__input'
                           name="passwordOne"
                           value={passwordOne}
                           onChange={this.onChange}
                           type="password"
                           placeholder="New Password"
                    />
                    <input className='form__input'
                           name="passwordTwo"
                           value={passwordTwo}
                           onChange={this.onChange}
                           type="password"
                           placeholder="Confirm New Password"
                    />
                    <button className='button' disabled={isInvalid} type="submit">
                        Change My Password
                    </button>

                    {error && <p className='error'>{error.message}</p>}
                </form>
            </div>
        );
    }
}

export default withFirebase(PasswordChangeForm);