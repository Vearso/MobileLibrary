import React, {Component} from 'react';

import './SpecifiedBookPage.scss';
import {withFirebase} from "../../../Account/Firebase";

const SpecifiedBookPage = ({id, book}) => {
    return (
        <SpecifiedBook book={book} id={id}/>
    )

}

class SpecifiedBookBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: this.props.firebase.auth.currentUser.uid,
            user: [],
        }
    }

    componentDidMount() {
        this.props.firebase.user(this.state.userID).on('value', snapshot => {
            const userObject = snapshot.val()
            this.setState({user: {...userObject}})
        })
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
        console.log(this.props.book);
        if (this.state.user.books) {
            for (let book of this.state.user.books) {
                if (this.props.id === book.id) {
                    return true;
                }
            }
        } else return false;
    }

    markBookAsOwned = () => {
        this.isInDatabase()
            ? console.warn('Is in database')
            : this.setState({user: {...this.state.user, books: [...(this.state.user.books || []), this.props.book]}});
    }

    markBookAsRead = () => {
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
        this.isInDatabase()
            ? this.setFavoriteToTrue()
            : this.setState({
                user: {
                    ...this.state.user,
                    books: [
                        ...this.state.user.books, {
                            ...this.props.book,
                            favorite: true,
                        }
                    ]
                }
            });
    }

    setFavoriteToTrue = () => {
        for (let book of this.state.user.books) {
            if (this.props.id === book.id) {
                book.favorite = true;
            }
        }
    }


    render() {
        const book = this.props.book;
        return (
            <>
                <section className='book__info'>
                    <img className='book__poster' src={book.imageLinks ? book.imageLinks.thumbnail : ''}
                         alt={`Poster for ${book.title}`}/>
                    <h2 className="book__title">{book.title}</h2>
                    <p className="book__authors">{book.authors ? book.authors.join(', ') : "Anonymous"}</p>
                    <div className='book__actions'>
                        <span className="book__rating">4.2</span>
                        <div className='book__add'>
                            <button className="button" disabled={this.isInDatabase()} onClick={this.markBookAsOwned}>Mark as own</button>
                            <button className="button" onClick={this.markBookAsRead}>Mark as read</button>
                            <button className="button" onClick={this.addBookToFavorites}>Add to favorties</button>
                        </div>
                    </div>
                    {book.description
                        ? <p className="book__description" dangerouslySetInnerHTML={{__html: book.description}}/>
                        : <p className="book__description">No description for this book</p>}

                </section>
                <section className='book__comments'>

                </section>
            </>
        )
    }
}

const SpecifiedBook = withFirebase(SpecifiedBookBase);

export default SpecifiedBookPage;