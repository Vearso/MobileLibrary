import React from 'react';
import SearchedBook from "../Books/Book/SearchedBooks/SearchedBook";
import './content.scss';

const Content = ({books,getBookID}) => {
    return (
        <div className='page__content'>
            {books.length !== 0 ? books.map(item => <SearchedBook key={item.id}
                                                                  id={item.id}
                                                                  title={item.title}
                                                                  author={item.authors}
                                                                  onClick={getBookID}
                                                                  img={item.imageLinks ? item.imageLinks.smallThumbnail : 'bannerS1'}/>) : 'Loading...'}
        </div>
    )
}
export default Content;