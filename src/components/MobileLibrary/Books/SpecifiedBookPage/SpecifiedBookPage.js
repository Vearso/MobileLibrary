import React, {Component} from 'react';

import './SpecifiedBookPage.scss';
import {withFirebase} from "../../User/Account/Firebase";


const SpecifiedBookPage = ({id, book}) => {
    return (
        <>
            <SpecifiedBook book={book} id={id}/>
        </>
    )
}

class SpecifiedBookBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: this.props.firebase.auth.currentUser.uid,
            user: {
                books: [],
            },
        }
    }


    componentDidMount() {
        this.props.firebase.user(this.state.userID).on('value', snapshot => {
            let userObject = snapshot.val()
            if (userObject.books === undefined) {
                userObject.books = [];
            }
            this.setState({user: {...userObject}})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.user);
    }

    componentWillUnmount() {
        this.sendToFirebase();
        this.props.firebase.user(this.state.userID).off();
    }

    sendToFirebase = () => {
        this.props.firebase.user(this.state.userID).update({
                books: [
                    ...this.state.user.books,
                ]
            }
        ).catch(err => console.warn(err))
    }

    isInDatabase = () => {
        if (this.state.user.books) {
            for (let book of this.state.user.books) {
                if (this.props.id === book.id) {
                    return true;
                }
            }
        } else return false;
    }
    isRead = () => {
        if (this.state.user.books) {
            for (let book of this.state.user.books) {
                if (this.props.id === book.id) {
                    return book.read;
                }
            }
        }
    }
    isFavorite = () => {
        if (this.state.user.books) {
            for (let book of this.state.user.books) {
                if (this.props.id === book.id) {
                    return book.favorite;
                }
            }
        }
    }

    markBookAsOwned = () => {
        this.setState({own: true});
        this.isInDatabase()
            ? console.warn('Is in database')
            : this.setState({user: {...this.state.user, books: [...(this.state.user.books || []), this.props.book]}});
    }

    markBookAsRead = () => {
        this.setState({read: true});
        this.setState({book: {...this.state.book}, read: true});
        this.isInDatabase()
            ? this.setReadToTrue()
            : this.setState({
                user: {
                    ...this.state.user,
                    books: [
                        ...this.state.user.books, {
                            ...this.props.book,
                            read: true
                        }
                    ]
                }
            });
    }

    setReadToTrue = () => {
        for (let book of this.state.user.books) {
            if (this.props.id === book.id) {
                book.read = true;
            }
        }
    }

    addBookToFavorites = () => {
        this.setState({favorite: true, read: true});
        this.isInDatabase()
            ? this.setFavoriteToTrue()
            : this.setState({
                user: {
                    ...this.state.user,
                    books: [
                        ...this.state.user.books, {
                            ...this.props.book,
                            favorite: true,
                            read: true,
                        }
                    ]
                }
            });
    }

    setFavoriteToTrue = () => {
        for (let book of this.state.user.books) {
            if (this.props.id === book.id) {
                book.favorite = true;
                book.read = true;
            }
        }
    }


    render() {
        const book = this.props.book;
        return (
            <>
                <section className='book__info'>
                    <div className="poster__container">
                        <img className='book__poster' src={book.imageLinks ? book.imageLinks.thumbnail : ''}
                             alt={`Poster for ${book.title}`}/>
                    </div>
                    <div className='info__container'>
                        <h2 className="book__title">{book.title}</h2>
                        <p className="book__authors">{book.authors ? book.authors.join(', ') : "Anonymous"}</p>
                        <div className='book__action'>
                            <span className="book__rating">4.2</span>
                            <div className='book__buttons'>
                                <div className={this.isInDatabase() || this.state.own ? 'icon__green' : 'icon__red'}
                                     onClick={this.markBookAsOwned}>
                                    <i className="fas fa-plus"/>
                                </div>
                                <div className={this.isRead() ? 'icon__green' : 'icon__red'}
                                     onClick={this.markBookAsRead}>
                                    <i className="fas fa-check"/>
                                </div>
                                <div className={this.isFavorite() ? 'icon__green' : 'icon__red'}
                                     onClick={this.addBookToFavorites}>
                                    <i className="fas fa-star"/>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
                <section>
                    {book.description
                        ? <p className="book__description" dangerouslySetInnerHTML={{__html: book.description}}/>
                        : <p className="book__description">No description for this book</p>}
                </section>
            </>
        )
    }
}

const SpecifiedBook = withFirebase(SpecifiedBookBase);

export default SpecifiedBookPage;