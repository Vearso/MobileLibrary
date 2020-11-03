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
            <button onClick={handleClick}>Back
            </button>
        </div>
    )
}

export default GoBackButton;