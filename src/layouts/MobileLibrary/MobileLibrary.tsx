import './MobileLibrary.scss';
import React, {useEffect, useState} from "react";
import {withAuthorization} from "../../components/Account/Session";
import Header from "../../components/MobileLibrary/Header/Header";
import {getVolumesByAuthor} from "../../components/Books/API/requests";
import Content from "../../components/MobileLibrary/Content/content";
import {Route} from "react-router-dom";
import {MOBILE_LIBRARY} from "../../components/constants/routes";
import SpecifiedBookPage from "../../components/Books/Book/SpecifiedBookPage/SpecifiedBookPage";
import UserPage from "../../components/MobileLibrary/User/UserPage/UserPage";


function MobileLibrary() {
    const [search,setSearch] = useState('');
    const [books,setBooks] = useState([]);
    const [bookID,getBookID] = useState('');

    const handleBookID = (id : string) => {
        getBookID(id)
    }

    const handleSearch = (value :any) => {
        setSearch(value)
    }

    useEffect(()=>{
        getVolumesByAuthor(setBooks,search)
    },[search])

    console.log(bookID);
    return (
        <div className="MobileLibrary">
            <Header setSearch={handleSearch}/>
            <h1>Check out books you might like</h1>
            <Route exact path={MOBILE_LIBRARY} render={(props)=>(<Content books={books} getBookID={handleBookID}/>)}/>
            <Route path={`${MOBILE_LIBRARY}/books/${bookID}`} render={(props) => (<SpecifiedBookPage id={bookID}/>)}/>
            <Route path={`${MOBILE_LIBRARY}/user`} component={UserPage}/>
        </div>
    );
}

const condition = (authUser : any) => !!authUser;

export default withAuthorization(condition)(MobileLibrary);
