import React, {useState, useEffect} from 'react';
import './Info.scss';


const Info = ({search,setSearch} :any) => {

    const [input, setInput] = useState('');
    const handleClick = (e: any) => {
        setSearch((prev:any) => !prev);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className='header__notifications'>
            <i className={search ? "disabled" : "fas fa-envelope"}/>
            <i className={search ? "disabled" : "fas fa-bell"}/>
            <form className={search ? '' : "disabled"} onSubmit={e=>handleSubmit(e)}>
                <input className='search__input'
                       type='text'
                       placeholder='Title or author'
                       value={input}
                       onChange={(e) => setInput(e.target.value)}/>
                <button className='search__button' type='submit' onClick={(e)=>handleClick(e)}>
                    <i className={"fas fa-search"}/>
                </button>
            </form>
            <i className={search ? "disabled" : "fas fa-search"} onClick={e => handleClick(e)}/>

        </div>
    )
}

export default Info;