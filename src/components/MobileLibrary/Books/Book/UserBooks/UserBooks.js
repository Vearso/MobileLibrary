import React, {Component} from 'react';
import './UserBooks.scss';
import {withFirebase} from "../../../User/Account/Firebase"
import {Book} from "../../../User/UserPage/UserPage";
import {Route, Link} from "react-router-dom";
import {MOBILE_LIBRARY} from "../../../../constants/routes";

class UserBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: this.props.firebase.auth.currentUser.uid,
            user: {
                books: [],
                queue: [],
            },
            notRead: [],
            read: [],
            favorites: [],
            noBooks: true,
            noQueue: true,
        }
    }

    componentDidMount() {
        this.props.firebase.user(this.state.userID).on('value', snapshot => {
            const userObject = snapshot.val();
            console.log(userObject);
            if (userObject.books === undefined || userObject.books.length === 0) {
                userObject.books = [];
                this.setState({noBooks: true});
            }
            if (userObject.queue === undefined || userObject.queue.length === 0) {
                userObject.queue = [];
                this.setState({noQueue: true});
            }
            this.setState({user: {...userObject}})
            let tempArray = this.state.user.books.filter(book => book.read === false);
            this.setState({notRead: [...tempArray]});
            tempArray = this.state.user.books.filter(book => book.read === true);
            this.setState({read: [...tempArray]});
            tempArray = this.state.user.books.filter(book => book.favorite === true);
            this.setState({favorites: [...tempArray]});
        })
    }

    componentWillUnmount() {
        this.updateFirebase();
        this.props.firebase.user(this.state.userID).off();
    }

    updateFirebase = () => {
        this.props.firebase.user(this.state.userID).update({
                ...this.state.user
            }
        ).catch(err => console.warn(err))
    }
    deleteBook = (id) => {
        const tempArray = this.state.user.books.map(book => book.id !== id);
        this.setState({user: {...this.state.user, books: [...tempArray]}})
    }
    addToFavorites = (id) => {
        for (let book of this.state.user.books) {
            if (book.id === id) {
                book.favorite = true;
            }
        }
    }
    addToQueue = (id) => {
        for (let book of this.state.user.books) {
            if (book.id === id) {
                this.setState({user: {...this.state.user, queue: [...this.state.user.queue, book]}})
            }
        }

    }

    render() {

        if (this.state.noBooks) {
            return (<Link to={`${MOBILE_LIBRARY}/search`}>First add some books</Link>);
        } else
            return (
                <>
                    <nav className='user__books--nav'>
                        <ul className="nav__list">
                            <li><Link to={`${MOBILE_LIBRARY}/user/books/read`}>Read</Link></li>
                            <li><Link to={`${MOBILE_LIBRARY}/user/books/notread`}>Not Read</Link></li>
                            <li><Link to={`${MOBILE_LIBRARY}/user/books/favorites`}>Favorites</Link></li>
                            <li><Link to={`${MOBILE_LIBRARY}/user/books/queue`}>Queue</Link></li>
                        </ul>
                    </nav>
                    {this.state.noBooks ? <Link to={`${MOBILE_LIBRARY}/search`}>First add some books</Link> : null}
                    <Route path={`${MOBILE_LIBRARY}/user/books/read`} render={() => (
                        <section className="user__books">
                            <span className="description--title">Read</span>
                            <div className="book__container">
                                {this.state.read.map(book =>
                                    <>
                                        <Book book={book}/>
                                        <button>Delete</button>
                                        <button>Mark as unread</button>
                                        <button>Add to fav</button>
                                    </>)}
                            </div>
                        </section>
                    )}/>
                    <Route path={`${MOBILE_LIBRARY}/user/books/notread`} render={() => (
                        <section className="user__books">
                            <span className="description--title">Not Read</span>
                            <div className="book__container">
                                {this.state.notRead.map(book =>
                                    <>
                                        <Book book={book}/>
                                        <button>Delete</button>
                                        <button>Mark as read</button>
                                        <button>Add to fav</button>
                                        <button>Add to queue</button>
                                    </>)}
                            </div>
                        </section>
                    )}/>
                    <Route path={`${MOBILE_LIBRARY}/user/books/favorites`} render={() => (
                        <section className="user__books">
                            <span className="description--title">Favorites</span>
                            <div className="book__container">
                                {this.state.favorites.map(book =>
                                    <>
                                        <Book book={book}/>
                                        <button>Delete</button>
                                        <button>Mark as not read</button>
                                        <button>Remove from fav</button>
                                    </>)}
                            </div>
                        </section>
                    )}/>
                    <Route path={`${MOBILE_LIBRARY}/user/books/queue`} render={() => (
                        <section className="user__books">
                            <span className="description--title">Queue</span>
                            {this.state.noQueue ?
                                <Link to={`${MOBILE_LIBRARY}/user/books/notread`}>Add to queue</Link> : null}
                            <div className="book__container">
                                {this.state.user.queue.map(book =>
                                    <>
                                        <Book book={book}/>
                                        <button>Delete</button>
                                        <button>Mark as not read</button>
                                        <button>Remove from fav</button>
                                    </>)}
                            </div>
                        </section>
                    )}/>
                </>
            )
    }
}


export default withFirebase(UserBooks);