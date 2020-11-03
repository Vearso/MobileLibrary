import React from 'react';
import './Avatar.scss';

const Avatar = ({setShow}) => {
    const handleClick = () => {
        setShow(prev=> !prev);
    }

    return(
        <i className='fa fa-user-circle user__avatar' onClick={handleClick}/>

    )
}

export default Avatar;