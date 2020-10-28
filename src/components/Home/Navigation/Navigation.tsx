import React, {useState} from "react";
import {Link} from 'react-router-dom';
import * as ROUTES from '../../../constants/constants';
import './Navigation.scss';

const Navigation = () => {
    const [showMenu,setShowMenu] = useState(false)
    const handleClick = (e : any) => {
        console.log(typeof e);
        e.preventDefault()
        setShowMenu(prev=>!prev);
    }
    return(

      <nav className="header__nav">
          <button className="nav__hamburger" onClick={e =>handleClick(e)}><i className='nav__hamburger--icon far fa-bars'/></button>
          <ul className={showMenu ? "nav__list--show" : "nav__list--hidden nav__list"}>
              <li><Link to={ROUTES.LANDING} onClick={()=>setShowMenu(false)}>Home</Link></li>
              <li><a href={'#about'} onClick={()=>setShowMenu(false)}>About</a></li>
              <li><a href={'#examples'} onClick={()=>setShowMenu(false)}>Examples</a></li>
              <li><a href={'#footer'} onClick={()=>setShowMenu(false)}>Contact</a></li>
              <li><Link to={ROUTES.MOBILE_LIBRARY} onClick={()=>setShowMenu(false)}>App</Link></li>
          </ul>
      </nav>
    )
}

export default Navigation;