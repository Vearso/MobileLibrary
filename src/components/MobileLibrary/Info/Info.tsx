import React, {useState} from 'react';
import './Info.scss';
import {MOBILE_LIBRARY} from "../../constants/routes";
import {useHistory} from "react-router"

const Info = ({showSearch, setShowSearch, setSearch}: any) => {
    const [input, setInput] = useState('');
    const history = useHistory();
    const handleClick = (e: any) => {
        setShowSearch((prev: any) => !prev);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(input !== '') {
            setSearch(input);
            setInput('');
            setShowSearch(false);
            history.push(`${MOBILE_LIBRARY}/search`);
        }
    }

    return (
        <div className='header__notifications'>
            <i className={showSearch ? "disabled" : "fas fa-envelope"}/>
            <i className={showSearch ? "disabled" : "fas fa-bell"}/>
            <i className={showSearch ? "disabled" : "fas fa-search"} onClick={e => handleClick(e)}/>
            <form className={showSearch ? '' : "disabled"} onSubmit={e => handleSubmit(e)}>
                <input className='search__input'
                       type='text'
                       placeholder='Search by title'
                       value={input}
                       onChange={(e) => setInput(e.target.value)}/>
                <button className='search__button' type='submit' onClick={(e) => handleClick(e)}>
                    <i className={"fas fa-search"}/>
                </button>
            </form>
        </div>
    )
}

export default Info;