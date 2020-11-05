import React, {useState} from "react";
import './Footer.scss';
import Button from "../Button/Button";

const Footer = () => {
    const [email,setEmail] = useState('')
    const theme = window.localStorage.getItem('theme');
    return (
        <footer id='footer' className={theme === 'dark' ? "page__footer footer--dark":"page__footer"}>
            <div className="footer">
                <div className="footer__contact">
                    <p className="contact--name">Mobile Library</p>
                    <p className="contact--address">Lorem ipsum dolor</p>
                    <p className="contact--postalCode">50-423</p>

                </div>
                <div className="footer__form">
                    <p>Newsletter</p>
                    <input type='email' value={email} onChange={e=>setEmail(e.target.value)}/>
                    <Button className={'btn form__button'}>SEND</Button>
                </div>
            </div>
            <div className="copyright">Copyright Vearso</div>
        </footer>
    )

}

export default Footer;