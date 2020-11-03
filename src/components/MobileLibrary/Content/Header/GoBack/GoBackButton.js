import React from 'react';
import {useHistory} from 'react-router';
import './GoBackButton.scss';

const GoBackButton = () => {
    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    }
    return (
        <div className='button__container'>
            <button onClick={handleClick}>
                <i className="fas fa-chevron-left"/>
            </button>
        </div>
    )
}

export default GoBackButton;