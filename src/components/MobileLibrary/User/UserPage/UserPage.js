import React, {Component} from 'react';
import man from './man.png';
import woman from './woman.png';
import './UserPage.scss';
import {withFirebase} from '../../../Account/Firebase';

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            userID: this.props.firebase.auth.currentUser.uid,
            user: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});

        this.props.firebase.user(this.state.userID).on('value', snapshot => {
            const userObject = snapshot.val();
            this.setState({user: {...userObject}})
        })
    }

    componentWillUnmount() {
        this.props.firebase.user(this.state.userID).off();
    }

    render() {
        return (
            <UserInfo user={this.state.user}/>
        );
    }
}

const UserInfo = ({user}) => {

    return (
        <section className="user__info">
            <img className="user__photo" src={user.gender === 'Man' ? man : woman} alt={`Photo of ${user.name} ${user.surname}`}/>
            <h3 className="user__name">{user.name} {user.surname}</h3>
            <span className='description--title'>About me:</span>
            <p className="user__about">{user.about}</p>
            <span className="description--title">Books</span><p>nr...</p>
            <span className="description--title">My favorite genre is:</span> <p>{user.favoriteGenre}</p>
        </section>
    )
}

const UserFavoritesBooks = ({user}) => {

    return (
        null
    )
}

const FavoriteBook = ({book}) => {

    return (
        null
    )
}

export default withFirebase(UserPage);