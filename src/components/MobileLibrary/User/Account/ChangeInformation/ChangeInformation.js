import React, {Component} from 'react'
import {compose} from "recompose";
import {withRouter} from "react-router-dom";
import {withFirebase} from "../Firebase";



const UserChangeInformationPage = () => {
    return (
        <div className='page__form'>
            <UserChangeInformationForm/>
        </div>
    )
}


class UserChangeInformationBase extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            gender: '',
            about: '',
            favorite: '',
        };
    }
    componentDidMount() {
        const userID = this.props.firebase.auth.currentUser.uid;
        this.props.firebase.user(userID).on('value',snapshot => {
            const userObject = snapshot.val();
            this.setState({
                name: userObject.name,
                surname: userObject.surname,
                gender: userObject.gender,
                about: userObject.about,
                favorite: userObject.favoriteGenre,
            })
        })
    }
    componentWillUnmount() {
        const userID = this.props.firebase.auth.currentUser.uid;
        this.props.firebase.user(userID).off();
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
                this.props.history.goBack();
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
        const theme = window.localStorage.getItem('theme');
        return (
            <form className={theme ==='dark' ? 'form form--dark':'form'} onSubmit={this.onSubmit}>
                <h1 className='form__title'>Some information about you</h1>
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
                    Save
                </button>
            </form>
        );
    }
}

const UserChangeInformationForm = compose(
    withRouter,
    withFirebase,
)(UserChangeInformationBase);

export default UserChangeInformationPage;