import React, {useState, useEffect} from 'react';
import {getVolumes} from "../../Books/API/requests";

const Content = ({books,setBooks,search}) => {
    useEffect(()=>{
        getVolumes(setBooks,search)
        console.log(books)
    },[])
    return(
        <h1>
           Hello
        </h1>
    )
}