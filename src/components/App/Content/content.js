import React, {useState, useEffect} from 'react';
import {getVolumes} from "../../Books/API/requests";
import {POSTER} from "../../Books/API/paths";

const Content = ({books}) => {


    return(
        <h1>
            {books.length !== 0 ? books.items.map(item => <img src={`${item.volumeInfo.imageLinks.smallThumbnail}`}/>) : 'ehh'}
        </h1>
    )
}
export default Content;