import React, {useState, useEffect} from 'react';
import './Info.scss';


const Info = ({showSearch,setShowSearch,setSearch} :any) => {
    const [input,setInput] = useState('');
    const handleClick = (e: any) => {
        setShowSearch((prev:any) => !prev);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSearch(input);
        setInput('');
        setShowSearch(false);
    }

    return (
        <div className='header__notifications'>
            <i className={showSearch ? "disabled" : "fas fa-envelope"}/>
            <i className={showSearch ? "disabled" : "fas fa-bell"}/>
            <i className={showSearch ? "disabled" : "fas fa-search"} onClick={e => handleClick(e)}/>
            <form className={showSearch ? '' : "disabled"} onSubmit={e=>handleSubmit(e)}>
                <input className='search__input'
                       type='text'
                       placeholder='Title or author'
                       value={input}
                       onChange={(e) => setInput(e.target.value)}/>
                <button className='search__button' type='submit' onClick={(e)=>handleClick(e)}>
                    <i className={"fas fa-search"}/>
                </button>
            </form>
        </div>
    )
}

export default Info;