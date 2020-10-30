import React, {useState, useEffect} from 'react';
import './Info.scss';


const Info = ({showSearch,setShowSearch,search,setSearch} :any) => {

    const handleClick = (e: any) => {
        setShowSearch((prev:any) => !prev);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className='header__notifications'>
            <i className={showSearch ? "disabled" : "fas fa-envelope"}/>
            <i className={showSearch ? "disabled" : "fas fa-bell"}/>
            <form className={showSearch ? '' : "disabled"} onSubmit={e=>handleSubmit(e)}>
                <input className='search__input'
                       type='text'
                       placeholder='Title or author'
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
                <button className='search__button' type='submit' onClick={(e)=>handleClick(e)}>
                    <i className={"fas fa-search"}/>
                </button>
            </form>
            <i className={search ? "disabled" : "fas fa-search"} onClick={e => handleClick(e)}/>

        </div>
    )
}

export default Info;