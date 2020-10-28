import React, {useState} from "react";
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
              <li><a href={'home'} onClick={()=>setShowMenu(false)}>Home</a></li>
              <li><a href={'#about'} onClick={()=>setShowMenu(false)}>About</a></li>
              <li><a href={'#examples'} onClick={()=>setShowMenu(false)}>Examples</a></li>
              <li><a href={'#footer'} onClick={()=>setShowMenu(false)}>Contact</a></li>
              <li><a href={'app.html'} onClick={()=>setShowMenu(false)}>App</a></li>
          </ul>
      </nav>
    )
}

export default Navigation;