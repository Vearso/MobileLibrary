import React, {Component} from 'react';

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
            console.log(userObject);
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
            <img className="user__photo" src={user.gender === 'Man' ? 'Man.png' : 'Woman.png'} alt={`Photo of ${user.name} ${user.surname}`}/>
            <h3 className="user__name">{user.name} {user.surname}</h3>
            <p className="user__about">About me: {user.about}</p>
            <span className="user__books">Books : 42</span>
            <span className="user__genre">My favorite genre is: Science-fiction</span>
        </section>
    )
}

export default withFirebase(UserPage);