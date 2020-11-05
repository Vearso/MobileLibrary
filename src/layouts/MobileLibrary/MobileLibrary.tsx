import './MobileLibrary.scss';
import React, {useEffect, useState} from "react";
import {withAuthorization} from "../../components/MobileLibrary/User/Account/Session";
import Header from "../../components/MobileLibrary/Content/Header/Header";
import {getVolumeByID, getVolumes} from "../../components/MobileLibrary/Books/API/requests";
import {Route} from "react-router-dom";
import {MOBILE_LIBRARY} from "../../components/constants/routes";
import SpecifiedBookPage from "../../components/MobileLibrary/Books/SpecifiedBookPage/SpecifiedBookPage";
import UserPage from "../../components/MobileLibrary/Content/UserPage/UserPage";
import UserBooks from '../../components/MobileLibrary/Books/UserBooks/UserBooks';
import SearchPage from "../../components/MobileLibrary/Content/SearchPage/SearchPage";
import SettingsPage from "../../components/MobileLibrary/Content/SettingsPage/SettingsPage";
import MainPage from "../../components/MobileLibrary/Content/MainPage/MainPage";
import ContactsPage from "../../components/MobileLibrary/Content/ContactsPage/ContactsPage";
import UserChangeInformationPage
    from "../../components/MobileLibrary/User/Account/ChangeInformation/ChangeInformation";


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
        getVolumes(setBooks,search,'inauthor');
    },[search]);

    const theme = window.localStorage.getItem('theme');
    return (
        <div className={`MobileLibrary ${theme}`} id='MobileLibrary'>
            <Header setSearch={handleSearch} />
            <Route exact path={MOBILE_LIBRARY} render={(props)=>(<MainPage/>)}/>
            <Route path={`${MOBILE_LIBRARY}/books/${bookID}`} render={(props) => (<SpecifiedBookPage book={book} id={bookID}/>)}/>
            <Route exact path={`${MOBILE_LIBRARY}/user`} component={UserPage}/>
            <Route path={`${MOBILE_LIBRARY}/user/books`} component={UserBooks}/>
            <Route path={`${MOBILE_LIBRARY}/search`} render={()=><SearchPage books={books} getBookID={handleBookID}/>}/>
            <Route path={`${MOBILE_LIBRARY}/user/settings`} component={SettingsPage} />
            <Route path={`${MOBILE_LIBRARY}/user/contacts`} component={ContactsPage}/>
            <Route path={`${MOBILE_LIBRARY}/user/change`} component={UserChangeInformationPage}/>
        </div>
    );
}

const condition = (authUser : any) => !!authUser;

export default withAuthorization(condition)(MobileLibrary);
