import React from 'react';
import './MainPage.scss';
import {MOBILE_LIBRARY} from "../../../constants/routes";
import {Link} from "react-router-dom";
import Banner from "../../../Home/Banner/Banner";


const MainPage = () => {
    return (
        <section className='page__main'>
            <Banner/>
            <h2> Welcome </h2>
            <p> This is the mobile library app, it was designed for you so you could manage your own books, you can add
                them, mark them as read and add them to favorites or to queue. Hope you will enjoy. To start searching
                for books just follow this link: </p>
            <Link to={`${MOBILE_LIBRARY}/search`}>Search for books</Link>
            <p>If you want to see your profile follow this link:</p>
            <Link to={`${MOBILE_LIBRARY}/user`}>My profile</Link>
            <p> If you wish to checkout some other pages you can click on the avatar icon in the right top corner of the
                page</p>
        </section>
    )
}
export default MainPage;