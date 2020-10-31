import React, {useState, useEffect} from 'react';
import {getVolumeByID} from "../../API/requests";

import './SpecifiedBookPage.scss';

const SpecifiedBookPage = ({id}) => {
    const [book, setBook] = useState([]);

    useEffect(() => {
        console.log(id);
        getVolumeByID(setBook, id);
    }, [])

    console.log(book);
    return (
        <>
            <section className='book__info'>
                <img className='book__poster' src={book.imageLinks ? book.imageLinks.thumbnail : ''} alt={`Poster for ${book.title}`}/>
                <h2 className="book__title">{book.title}</h2>
                <p className="book__authors">{book.authors ? book.authors.join(', ') : "Anonymous"}</p>
                <div className='book__actions'>
                    <span className="book__rating">4.2</span>
                    <div className='book__add'>
                        <button className="button">Mark as own</button>
                        <button className="button">Mark as readed</button>
                        <button className="button">Add to favorties</button>
                    </div>
                </div>
                {book.description
                ? <p className="book__description" dangerouslySetInnerHTML={{__html : book.description}}/>
                    : <p className="book__description">No description for this book</p>}

            </section>
            <section className='book__comments'>

            </section>
        </>
    )
}

export default SpecifiedBookPage;