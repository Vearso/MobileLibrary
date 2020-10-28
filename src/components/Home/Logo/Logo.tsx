import React from "react";
import './Logo.scss';

const Logo = ({onlyLogo} :any) => {
    if(onlyLogo){
        return(
        <a href={'Home'} className="logo">
            <img className='logo__img' src='logo192.png' alt='Logo of the page'/>
        </a>
        )
    }
    else
    return (
        <a href={'Home'} className="logo">
            <img className='logo__img' src='logo192.png' alt='Logo of the page'/>
            <h2 className='logo__title'>Mobile<span>Library</span></h2>
        </a>
    )
}

export default Logo;