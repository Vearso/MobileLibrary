import React from 'react';
import './SearchedBook.scss';
import {Link} from "react-router-dom";
import {MOBILE_LIBRARY} from "../../../constants/routes";

const SearchedBook = ({book, onClick, add, read, fav, isInDatabase, img, isRead, isFavorite}) => {
    const handleClick = () => {
        onClick(book.id);
    }
    return (
        <div className="searched__book">
            <Link to={`${MOBILE_LIBRARY}/books/${book.id}`}>
                <img className="book--poster" src={img} alt={book.title} onClick={handleClick}/>
            </Link>
            <p className="book--title">{book.title ? book.title : "Title not found"}</p>
            <p className="book--author">by {book.author ? book.author.join(' ') : "Author not found"}</p>
            <div className='book__action'>
                <div className={isInDatabase(book.id) ? 'icon__green' : 'icon__red'} onClick={() => add(book)}>
                    <i className="fas fa-plus"/>
                </div>
                <div className={isRead(book.id) ? 'icon__green' : 'icon__red'} onClick={() => read(book)}>
                    <i className="fas fa-check"/>
                </div>
                <div className={isFavorite(book.id) ? 'icon__green' : 'icon__red'} onClick={() => fav(book)}>
                    <i className="fas fa-star"/>
                </div>
            </div>
        </div>

    )
}


export default SearchedBook;