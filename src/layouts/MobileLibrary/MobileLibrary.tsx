import './MobileLibrary.scss';
import React, {useEffect, useState} from "react";
import {withAuthorization} from "../../components/Account/Session";
import Header from "../../components/MobileLibrary/Header/Header";
import {getVolumeByID, getVolumesByAuthor} from "../../components/MobileLibrary/Books/API/requests";
import Content from "../../components/MobileLibrary/Content/content";
import {Route} from "react-router-dom";
import {MOBILE_LIBRARY} from "../../components/constants/routes";
import SpecifiedBookPage from "../../components/MobileLibrary/Books/Book/SpecifiedBookPage/SpecifiedBookPage";
import UserPage from "../../components/MobileLibrary/User/UserPage/UserPage";
import UserBooks from '../../components/MobileLibrary/Books/Book/UserBooks/UserBooks';


function MobileLibrary() {
    const [search,setSearch] = useState('');
    const [books,setBooks] = useState([]);
    const [bookID,getBookID] = useState('');
    const [book,setBook] = useState([]);

    const handleBookID = (id : string) => {
        getBookID(id)
        getVolumeByID(setBook,id);
    }

    const handleSearch = (value :any) => {
        setSearch(value)
    }

    useEffect(()=>{
        getVolumesByAuthor(setBooks,search);
    },[search])

    return (
        <div className="MobileLibrary">
            <Header setSearch={handleSearch}/>
            <h2/>
            <Route exact path={MOBILE_LIBRARY} render={(props)=>(<Content books={books} getBookID={handleBookID}/>)}/>
            <Route path={`${MOBILE_LIBRARY}/books/${bookID}`} render={(props) => (<SpecifiedBookPage book={book} id={bookID}/>)}/>
            <Route exact path={`${MOBILE_LIBRARY}/user`} component={UserPage}/>
            <Route path={`${MOBILE_LIBRARY}/user/books`} component={UserBooks}/>
            {/*<Route path={`${MOBILE_LIBRARY}/user/favorites`} component={UserFavorites}/>*/}
            {/*<Route path={`${MOBILE_LIBRARY}/user/queue`} component={UserQueue}/>*/}
            {/*<Route path={`${MOBILE_LIBRARY}/settings`} component={Settings}/>*/}
        </div>
    );
}

const condition = (authUser : any) => !!authUser;

export default withAuthorization(condition)(MobileLibrary);
