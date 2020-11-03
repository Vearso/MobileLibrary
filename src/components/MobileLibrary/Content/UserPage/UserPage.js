import React, {Component} from 'react';
import man from './man.png';
import woman from './woman.png';
import './UserPage.scss';
import {withFirebase} from '../../User/Account/Firebase';
import {Link} from "react-router-dom";
import {MOBILE_LIBRARY} from "../../../constants/routes";


class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            userID: this.props.firebase.auth.currentUser.uid,
            user: {
                books: [],
                queue: [],
            },
        };
    }

    componentDidMount() {
        this.props.firebase.user(this.state.userID).on('value', snapshot => {
            let userObject = snapshot.val();
            if (userObject.books === undefined) userObject.books = [];
            if (userObject.queue === undefined) userObject.queue = [];
            this.setState({
                user: {...userObject}
            })
            this.setState({loading: false});
        })
    }

    componentWillUnmount() {
        this.props.firebase.user(this.state.userID).off();
    }

    render() {
        const user = this.state.user
        if (user.name !== undefined)
            return (
                <>
                    <UserInfo user={user}/>
                    <hr className='line'/>
                    <UserFavoritesBooks user={user}/>
                    <hr className='line'/>
                    <UserBooksInQueue user={user}/>
                </>
            )
        else return null;
    }

}

const UserInfo = ({user}) => {

    return (
        <section className="user__info">
            <img className="user__photo" src={user.gender === 'Man' ? man : woman}
                 alt={`${user.name} ${user.surname}`}/>
            <h3 className="user__name">{user.name} {user.surname}</h3>
            <span className='description--title'>About me:</span>
            <p className="user__about">{user.about}</p>
            <span className="description--title">Books: {user.books.length}</span>
            <span className="description--title">My favorite genre is:</span> <p>{user.favoriteGenre}</p>
        </section>
    )
}

const UserFavoritesBooks = ({user}) => {
    const books = user.books.filter(book => book.favorite === true);
    return (
        <section className="user__favorites">
            <span className="description--title">Favorites</span>
            <div className="favorites">
                {books.map((book, index) => index >= 3 ? null : <Book key={index} book={book}/>)}
                <p>{books.length >= 3
                    ? <Link to={`${MOBILE_LIBRARY}/user/books/favorites`}>More</Link>
                    : <Link to={`${MOBILE_LIBRARY}/user/books/read`}>Add to favorites</Link>}</p>
            </div>
        </section>
    )
}

export const Book = ({book}) => {

    return (
        <div className="book">
            <img className="book__poster" src={book.imageLinks.smallThumbnail}
                 alt="Book cover"/>
            <p className="book__title">{book.title}</p>
        </div>
    )
}

const UserBooksInQueue = ({user}) => {
    return (
        <section className="user__queue">
            <span className="description--title">Queue</span>
            <div className="queue">
                {user.queue.map((book, index) => index >= 3 ? null : <Book key={index} book={book}/>)}
                <p>{user.queue.length > 0
                    ? <Link to={`${MOBILE_LIBRARY}/user/books`}>More</Link>
                    : <Link to={`${MOBILE_LIBRARY}/user/books/notread`}>Set up a queue</Link>}</p>
            </div>
        </section>
    )
}


export default withFirebase(UserPage);
