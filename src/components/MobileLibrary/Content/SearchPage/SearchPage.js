import SearchedBook from "../../Books/Book/SearchedBooks/SearchedBook";
import React from "react";

const SearchPage = ({books,getBookID}) => {
    return(
        <section className='page__content'>
            {books.length !== 0 ? books.map(item => <SearchedBook key={item.id}
                                                                  id={item.id}
                                                                  title={item.title}
                                                                  author={item.authors}
                                                                  onClick={getBookID}
                                                                  img={item.imageLinks ? item.imageLinks.smallThumbnail : 'bannerS1'}/>) : 'Loading...'}
        </section>
    )
}

export default SearchPage;
