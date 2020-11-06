import React from "react";
import './Logo.scss';

const Logo = ({show}) => {
    const width = window.innerWidth;
        return (
            <div className='logo'>
                <img className='logo__img' src='/logo192.png' alt='Logo of the page'/>
                <h2 className={width < 450 ? show ? 'disabled' : 'logo__title' : 'logo__title'}>Mobile<span>Library</span></h2>
            </div>
        )

}

export default Logo;