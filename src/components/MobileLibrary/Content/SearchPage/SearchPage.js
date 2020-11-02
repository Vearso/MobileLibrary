import SearchedBook from "../../Books/Book/SearchedBooks/SearchedBook";
import React, {useState} from "react";
import {getVolumes} from "../../Books/API/requests";
import './SearchPage.scss';

const SearchPage = ({books, getBookID}) => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [searchBy, setSearchBy] = useState('inauthor');

    const handleSubmit = (e) => {
        e.preventDefault();
        getVolumes(setData, search, searchBy);
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
                                                                      id={item.id}
                                                                      title={item.title}
                                                                      author={item.authors}
                                                                      onClick={getBookID}
                                                                      img={item.imageLinks ? item.imageLinks.smallThumbnail : 'bannerS1'}/>) : null}
            </section>
            <section className={'page__content'}>
                {data.length !== 0 ? data.map(item => <SearchedBook key={item.id}
                                                                    id={item.id}
                                                                    title={item.title}
                                                                    author={item.authors}
                                                                    onClick={getBookID}
                                                                    img={item.imageLinks ? item.imageLinks.smallThumbnail : 'bannerS1'}/>) : null}
            </section>
        </>
    )
}

export default SearchPage;
