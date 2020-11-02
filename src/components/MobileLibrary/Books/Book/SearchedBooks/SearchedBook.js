import React, {} from 'react';
import './SearchedBook.scss';
import {Link} from "react-router-dom";
import {MOBILE_LIBRARY} from "../../../../constants/routes";

const SearchedBook = ({id, title, author, img , onClick}) => {
    const handleClick = () => {
        onClick(id);
    }
    return (
        <div className="searched__book" >
            <Link to={`${MOBILE_LIBRARY}/books/${id}`}>
                <img className="book--poster" src={img} onClick={handleClick}/>
            </Link>
            <p className="book--title">{title ? title : "Title not found"}</p>
            <p className="book--author">by {author ? author.join(' ') : "Author not found"}</p>
        </div>

    )
}

export default SearchedBook;