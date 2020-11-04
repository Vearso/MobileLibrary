import React, {Component} from 'react';
import './UserBooks.scss';
import {withFirebase} from "../../User/Account/Firebase"
import {Book} from "../../Content/UserPage/UserPage";
import {Route, Link} from "react-router-dom";
import {MOBILE_LIBRARY} from "../../../constants/routes";


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
            let tempArray = userObject.books.filter(book => book.read === false);
            this.setState({notRead: [...tempArray]});
            tempArray = userObject.books.filter(book => book.read === true);
            this.setState({read: [...tempArray]});
            tempArray = userObject.books.filter(book => book.favorite === true);
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
                book.read = true;
                book.favorite = true;
            }
        }
        let tempArray = this.state.user.books.filter(book => book.favorite === true);
        this.setState({favorites: [...tempArray]});
        tempArray = this.state.user.books.filter(book => book.read === true);
        this.setState({read: [...tempArray]});
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
    isInQueue = (id) => {
        for (let book of this.state.user.queue) {
            if (book.id === id) {
                return true;
            }
        }
        return false;
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
                            <li><Link to={`${MOBILE_LIBRARY}/user/books`}>All</Link></li>
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
                                        <div className="book__actions">
                                            <div className='icon icon__red' onClick={() => this.deleteBook(book.id)}><i
                                                className='fas fa-trash'/>
                                            </div>
                                            {book.read
                                                ? <div className='icon icon__green'
                                                       onClick={() => this.toggleRead(book.id)}>
                                                    <i className='fas fa-check'/>
                                                </div>
                                                : <div className='icon icon__red'
                                                       onClick={() => this.toggleRead(book.id)}>
                                                    <i className='fas fa-check'/>
                                                </div>}
                                            {book.favorite
                                                ? <div className='icon icon__green'
                                                       onClick={() => this.removeFromFavorites(book.id)}>
                                                    <i className="fas fa-star"/>
                                                </div>
                                                : <div className='icon icon__red'
                                                       onClick={() => this.addToFavorites(book.id)}>
                                                    <i className="fas fa-star"/>
                                                </div>}
                                        </div>
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
                                    <div className="book__actions">
                                        <div className='icon icon__red' onClick={() => this.deleteBook(book.id)}><i
                                            className='fas fa-trash'/>
                                        </div>
                                        <div className='icon icon__accent' onClick={() => this.toggleRead(book.id)}>
                                            <i className='fas fa-times'/>
                                        </div>
                                        <div className='icon icon__accent' onClick={() => this.addToFavorites(book.id)}>
                                            <i className="fas fa-star"/>
                                        </div>
                                    </div>
                                </article>)}
                        </section>
                    )}/>
                    <Route path={`${MOBILE_LIBRARY}/user/books/notread`} render={() => (
                        <section className="user__books">
                            <span className="description--title">Not Read</span>
                            {this.state.notRead.map(book =>
                                <article className="book__container">
                                    <Book book={book}/>
                                    <div className="book__actions">
                                        <div className='icon icon__red' onClick={() => this.deleteBook(book.id)}><i
                                            className='fas fa-trash'/>
                                        </div>
                                        <div className='icon icon__accent' onClick={() => this.toggleRead(book.id)}>
                                            <i className='fas fa-check'/>
                                        </div>
                                        <div className={this.isInQueue(book.id) ? 'icon icon__green' : 'icon icon__red'}
                                             onClick={() => this.addToQueue(book.id)}><i
                                            className="fas fa-sort-numeric-down"/>
                                        </div>
                                    </div>
                                </article>)}
                        </section>
                    )}/>
                    <Route path={`${MOBILE_LIBRARY}/user/books/favorites`} render={() => (
                        <section className="user__books">
                            <span className="description--title">Favorites</span>
                            {this.state.favorites.map(book =>
                                <article className="book__container">
                                    <Book book={book}/>
                                    <div className="book__actions">
                                        <div className='icon icon__red' onClick={() => this.deleteBook(book.id)}><i
                                            className='fas fa-trash'/>
                                        </div>
                                        <div className='icon icon__accent'
                                             onClick={() => this.removeFromFavorites(book.id)}>
                                            <i className="fas fa-star"/>
                                        </div>
                                    </div>
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
                                    <div className="book__actions">
                                        <div className=' icon icon__red' onClick={() => this.removeFromQueue(book.id)}>
                                            <i className='fas fa-times'/>
                                        </div>
                                        <div className='icon icon__accent' onClick={() => this.markAsFinished(book.id)}>
                                            <i className='fas fa-check'/>
                                        </div>
                                    </div>
                                </article>)}
                        </section>
                    )}/>
                </section>
            )
    }
}


export default withFirebase(UserBooks);