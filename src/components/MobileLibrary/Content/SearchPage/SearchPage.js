import SearchedBook from "../../Books/Book/SearchedBooks/SearchedBook";
import React, {useEffect, useState} from "react";
import {getVolumes} from "../../Books/API/requests";
import './SearchPage.scss';
import {withFirebase} from "../../User/Account/Firebase";


const SearchPage = ({books, getBookID, firebase}) => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [searchBy, setSearchBy] = useState('inauthor');
    const [user, setUser] = useState({books: []});

    const handleSubmit = (e) => {
        e.preventDefault();
        getVolumes(setData, search, searchBy);
    }

    useEffect(() => {
        firebase.user(firebase.auth.currentUser.uid).on('value', snapshot => {
            let userObject = snapshot.val()
            if (userObject.books === undefined) {
                userObject.books = [];
            }
            setUser({...userObject});
        })
        return () => {
            firebase.user(firebase.auth.currentUser.uid).off();
        }

    }, [firebase]);

    const sendToFirebase = (user, book) => {
        firebase.user(firebase.auth.currentUser.uid).update({
                books: [
                    ...user.books,
                    book
                ]
            }
        ).catch(err => console.warn(err))
    }
    const updateFirebase = (user) => {
        firebase.user(firebase.auth.currentUser.uid).update({
                books: [
                    ...user.books,
                ]
        }).catch(err => console.warn(err))
    }


    const isInDatabase = (id) => {
        if (user.books) {
            for (let book of user.books) {
                if (id === book.id) {
                    return true;
                }
            }
        } else return false;
    }
    const isRead = (id) => {
        if(user.books) {
            for (let book of user.books){
                if (id === book.id) {
                    return book.read
                }
            }
        }
    }
    const isFavorite = (id) => {
        if(user.books) {
            for (let book of user.books){
                if (id === book.id) {
                    return book.favorite
                }
            }
        }
    }

    const markBookAsOwned = (book) => {
        if (isInDatabase(book.id)) {
            console.warn('Is in database')
        } else {
            setUser({...user, books: [...user.books, book]})
            sendToFirebase(user,book);
        }
    }

    const markBookAsRead = (book) => {
        if (isInDatabase(book.id)) {
            setReadToTrue(book.id)
            updateFirebase(user);
        } else {
            setUser({
                ...user,
                books: [
                    ...user.books, {
                        ...book,
                        read: true
                    }]

            });
            book.read = true;
            sendToFirebase(user, book);
        }
    }

    const setReadToTrue = (id) => {
        for (let book of user.books) {
            if (id === book.id) {
                book.read = true;
            }
        }
    }
    const addBookToFavorites = (book) => {
        if(isInDatabase(book.id)) {
            setFavoriteToTrue(book.id)
            updateFirebase(user);
        }else {
            book.read = true;
            book.favorite = true;
            setUser({...user, books: [...user.books, book]});
            sendToFirebase(user,book)
        }
    }

    const setFavoriteToTrue = (id) => {
        for (let book of user.books) {
            if (id === book.id) {
                book.favorite = true;
                book.read = true;
            }
        }
    }

    return (
        <>
            <section className="page__search">
                <form className="search__form active" onSubmit={(e) => handleSubmit(e)}>
                    <div className="search">
                        <input className='search__input'
                               type='text'
                               placeholder="Search"
                               value={search}
                               onChange={(e) => setSearch(e.target.value)}/>
                        <button type='submit' className='search__button'><i className={"fas fa-search"}/></button>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio"
                                   id="author"
                                   name="author"
                                   value="inauthor"
                                   checked={searchBy === 'inauthor'}
                                   onChange={e => setSearchBy(e.target.value)}/>
                            Author</label>
                        <label>
                            <input type="radio"
                                   id="title"
                                   name="title"
                                   value="intitle"
                                   checked={searchBy === 'intitle'}
                                   onChange={e => setSearchBy(e.target.value)}/>
                            Title</label>
                        <label>
                            <input type="radio"
                                   id="ISBN"
                                   name="ISBN"
                                   value='isbn'
                                   checked={searchBy === 'isbn'}
                                   onChange={e => setSearchBy(e.target.value)}/>
                            ISBN</label>
                    </div>
                </form>
            </section>
            <section className={data.length > 0 ? 'disabled' : 'page__content'}>
                {books.length !== 0 ? books.map(item => <SearchedBook key={item.id}
                                                                      book={item}
                                                                      add={markBookAsOwned}
                                                                      read={markBookAsRead}
                                                                      fav={addBookToFavorites}
                                                                      isInDatabase={isInDatabase}
                                                                      isRead={isRead}
                                                                      isFavorite={isFavorite}
                                                                      onClick={getBookID}
                                                                      img={item.imageLinks ? item.imageLinks.smallThumbnail : 'bannerS1'}/>) : null}
            </section>
            <section className={'page__content'}>
                {data.length !== 0 ? data.map(item => <SearchedBook key={item.id}
                                                                    book={item}
                                                                    add={markBookAsOwned}
                                                                    read={markBookAsRead}
                                                                    fav={addBookToFavorites}
                                                                    isInDatabase={isInDatabase}
                                                                    isRead={isRead}
                                                                    isFavorite={isFavorite}
                                                                    onClick={getBookID}
                                                                    img={item.imageLinks ? item.imageLinks.smallThumbnail : 'bannerS1'}/>) : null}
            </section>
        </>
    )
}

export default withFirebase(SearchPage);
