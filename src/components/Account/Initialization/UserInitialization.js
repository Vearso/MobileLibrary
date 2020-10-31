import React, {Component} from 'react'
import {compose} from "recompose";
import {withRouter} from "react-router-dom";
import {withFirebase} from "../Firebase";
import * as ROUTES from "../../constants/routes";

const UserInitializationPage = () => {
    return (
        <div className='page__form'>
            <h1 className='form__title'>Some information about you</h1>
            <UserInitializationForm/>
        </div>
    )
}

const initialState = {
    name: '',
    surname: '',
    gender: '',
    about: '',
    favorite: '',
}

class UserInitializationBase extends Component {

    constructor(props) {
        super(props);

        this.state = {...initialState};
    }

    onSubmit = event => {
        event.preventDefault();
        const {name, surname,gender, about, favorite} = this.state;
        const userID = this.props.firebase.auth.currentUser.uid;

        this.props.firebase.user(userID)
            .update({
                name,
                surname,
                about,
                gender,
                favoriteGenre: favorite,

            })
            .then(() => {
                this.setState({...initialState})
                console.log(ROUTES.MOBILE_LIBRARY);
                this.props.history.push(ROUTES.MOBILE_LIBRARY);
            })
            .catch(error => {
                this.setState({error});
            });

    };
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {
            name,
            surname,
            gender,
            about,
            favorite,
        } = this.state;

        const isInvalid =
            name === '' ||
            surname === '' ||
            favorite === '';

        return (
            <form className='form' onSubmit={this.onSubmit}>
                <input className='form__input'
                       name="name"
                       value={name}
                       onChange={this.onChange}
                       type="text"
                       placeholder="Name"
                />
                <input className='form__input'
                       name="surname"
                       value={surname}
                       onChange={this.onChange}
                       type="text"
                       placeholder="Surname"
                />
                <select className='form__select'
                        name="gender"
                        value={gender}
                        onChange={this.onChange}
                        >
                    <option>Man</option>
                    <option>Woman</option>
                </select>
                <textarea className='form__textarea'
                       name="about"
                       value={about}
                       onChange={this.onChange}
                       type="text"
                       placeholder="Write a few sentences about yourself"
                />
                <input className='form__input'
                       name="favorite"
                       value={favorite}
                       onChange={this.onChange}
                       type="text"
                       placeholder="Favorite genres"
                />
                <button className='button' disabled={isInvalid} type="submit">
                    Sign Up
                </button>
            </form>
        );
    }
}

const UserInitializationForm = compose(
    withRouter,
    withFirebase,
)(UserInitializationBase);

export default UserInitializationPage;