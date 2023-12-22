
import './Header.css'

import logo from '@assets/logo.svg'
import Navigation from "@components/navigation/Navigation";
import { Link } from "react-router-dom";
import { FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector(store => store.user)
  return (
    <header>
      <div className="header__container">
        <img src={logo} alt="Logo" title="logo"/>
        { user.avatarUrl
        ? <>
          <Navigation></Navigation>
          <img
            className="header__avatar"
            src='https://ui-avatars.com/api/?name=testing&background=random' alt="Logo" title="logo"/>
          </>
        : <div className="header__tool">
            <Link to='/auth/login'>Sign In</Link>
            <Link
              to='/auth/register'
              className="button button-outlined">Sign Up</Link>
            <img
              className="header__language-toggle"
              src='/img/indonesia-flag.png' width='24' height='24' alt="Bahasa Indonesia" title="Bahasa Indonesia"/>
            <FaSun
              className="header__theme-toggle"
              size='24px'/>
          </div>
        }
      </div>
    </header>
  )
}