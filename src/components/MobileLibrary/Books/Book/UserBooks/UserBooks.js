import React, {Component} from 'react';
import './UserBooks.scss';
import {withFirebase} from "../../../User/Account/Firebase"
import {Book} from "../../../Content/UserPage/UserPage";
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
            noBooks: false,
            noQueue: false,
        }
    }

    componentDidMount() {
        this.props.firebase.user(this.state.userID).on('value', snapshot => {
            const userObject = snapshot.val();
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.user.books);
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
        const keys = ['read', 'notRead', 'favorites']
        let tempArray = this.state.user.books.filter(book => book.id !== id);
        let tempQueue = this.state.user.queue.filter(book => book.id !== id);
        this.setState({user: {...this.state.user, books: [...tempArray], queue: [...tempQueue]}})
        keys.forEach(key => {
            tempArray = this.state[key].filter(book => book.id !== id);
            this.setState({[key]: [...tempArray]});
        })


    }
    addToFavorites = (id) => {
        for (let book of this.state.user.books) {
            if (book.id === id) {
                book.favorite = true;
                console.log(book);
            }
        }
        const tempArray = this.state.user.books.filter(book => book.favorite === true);
        this.setState({favorites: [...tempArray]});
    }

    removeFromFavorites = (id) => {
        for (let book of this.state.user.books) {
            if (book.id === id) {
                book.favorite = false;
            }
        }
        const tempArray = this.state.user.books.filter(book => book.favorite === true);
        this.setState({favorites: [...tempArray]});
    }

    addToQueue = (id) => {
        for (let book of this.state.user.books) {
            if (book.id === id) {
                let isInQueue = [];
                isInQueue = this.state.user.queue.filter(book => book.id === id);
                isInQueue.length > 0 ? console.warn('Is in queue') : this.setState({
                    user: {
                        ...this.state.user,
                        queue: [...this.state.user.queue, book]
                    }
                })
            }
        }
    }

    removeFromQueue = (id) => {
        const tempArray = this.state.user.queue.filter(book => book.id !== id);
        this.setState({user: {...this.state.user, queue: [...tempArray]}})
    }

    toggleRead = (id) => {
        for (let book of this.state.user.books) {
            if (book.id === id) {
                book.read = !book.read;
                console.log(book.read);
            }
        }
        let tempArray = this.state.user.books.filter(book => book.read === true);
        this.setState({read: [...tempArray]});
        tempArray = this.state.user.books.filter(book => book.read === false);
        this.setState({notRead: [...tempArray]});
    }

    markAsFinished = (id) => {
        this.toggleRead(id);
        this.removeFromQueue(id);
    }

    render() {

        if (this.state.noBooks) {
            return (<Link to={`${MOBILE_LIBRARY}/search`}>First add some books</Link>);
        } else
            return (
                <section className="user__books--page">
                    <nav className='user__books--nav'>
                        <ul className="nav__list">
                            <li><Link to={`${MOBILE_LIBRARY}/user/books/read`}>Read</Link></li>
                            <li><Link to={`${MOBILE_LIBRARY}/user/books/notread`}>Not Read</Link></li>
                            <li><Link to={`${MOBILE_LIBRARY}/user/books/favorites`}>Favorites</Link></li>
                            <li><Link to={`${MOBILE_LIBRARY}/user/books/queue`}>Queue</Link></li>
                        </ul>
                    </nav>
                    {this.state.noBooks
                        ? <Link to={`${MOBILE_LIBRARY}/search`}>First add some books</Link>
                        : <Route exact path={`${MOBILE_LIBRARY}/user/books`} render={() => (
                            <section className="user__books">
                                <span className="description--title">All books</span>
                                {this.state.user.books.map(book =>
                                    <article className="book__container">
                                        <Book book={book}/>
                                        <button onClick={() => this.deleteBook(book.id)}>delete</button>
                                        {book.read
                                            ? <button onClick={() => this.toggleRead(book.id)}>Mark as not read</button>
                                            : <button onClick={() => this.toggleRead(book.id)}>Mark as read</button>}
                                        {book.favorite
                                            ? <button onClick={() => this.addToFavorites(book.id)}>Add to fav</button>
                                            : <button onClick={() => this.removeFromFavorites(book.id)}>
                                                Remove from fav
                                            </button>}
                                    </article>
                                )}
                            </section>
                        )}/>}
                    <Route path={`${MOBILE_LIBRARY}/user/books/read`} render={() => (
                        <section className="user__books">
                            <span className="description--title">Read</span>
                            {this.state.read.map(book =>
                                <article className="book__container">
                                    <Book book={book}/>
                                    <button onClick={() => this.deleteBook(book.id)}>Delete</button>
                                    <button onClick={() => this.toggleRead(book.id)}>Mark as unread</button>
                                    <button onClick={() => this.addToFavorites(book.id)}>Add to fav</button>
                                </article>)}
                        </section>
                    )}/>
                    <Route path={`${MOBILE_LIBRARY}/user/books/notread`} render={() => (
                        <section className="user__books">
                            <span className="description--title">Not Read</span>
                            {this.state.notRead.map(book =>
                                <article className="book__container">
                                    <Book book={book}/>
                                    <button onClick={() => this.deleteBook(book.id)}>Delete</button>
                                    <button onClick={() => this.toggleRead(book.id)}>Mark as read</button>
                                    <button onClick={() => this.addToQueue(book.id)}>Add to queue</button>
                                </article>)}
                        </section>
                    )}/>
                    <Route path={`${MOBILE_LIBRARY}/user/books/favorites`} render={() => (
                        <section className="user__books">
                            <span className="description--title">Favorites</span>
                            {this.state.favorites.map(book =>
                                <article className="book__container">
                                    <Book book={book}/>
                                    <button onClick={() => this.deleteBook(book.id)}>Delete</button>
                                    <button onClick={() => this.removeFromFavorites(book.id)}>Remove from fav</button>
                                </article>)}
                        </section>
                    )}/>
                    <Route path={`${MOBILE_LIBRARY}/user/books/queue`} render={() => (
                        <section className="user__books">
                            <span className="description--title">Queue</span>
                            {this.state.noQueue ?
                                <p><Link to={`${MOBILE_LIBRARY}/user/books/notread`}>Add to queue</Link></p>
                                : null}
                            {this.state.user.queue.map(book =>
                                <article className="book__container">
                                    <Book book={book}/>
                                    <button onClick={() => this.removeFromQueue(book.id)}>Delete from queue</button>
                                    <button onClick={() => this.markAsFinished(book.id)}>Mark as finished</button>
                                </article>)}
                        </section>
                    )}/>
                </section>
            )
    }
}


export default withFirebase(UserBooks);