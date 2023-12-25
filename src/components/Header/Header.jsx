
import './Header.css'

import logo from '@assets/logo.svg'
import Navigation from "@components/navigation/Navigation";
import { Link } from "react-router-dom";
import { FaSun } from "react-icons/fa";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { CLOSE_HAMBURGER_MENU, OPEN_HAMBURGER_MENU } from '../../redux/actionTypes';

export default function Header() {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const isHamburgerMenuActive = useSelector(store => store.hamburgerMenu)

  function hamburgerMenuToggle() {
    switch (isHamburgerMenuActive) {
      case true: return dispatch({ type: CLOSE_HAMBURGER_MENU })
      case false: return dispatch({ type: OPEN_HAMBURGER_MENU })
    }
  }

  return (
    <>
      <header>
        <div className="header__container">
          <img src={logo} alt="Logo" title="logo"/>
          <input className='header__search_box' type="text" name="" id="" />
          <div className="header__menu">
            { user.avatar
              ? <>
                <Navigation></Navigation>
                <div className="header__tool-container">
                  <img
                    className="header__language-toggle"
                    src='/img/indonesia-flag.png' width='24' height='24' alt="Bahasa Indonesia" title="Bahasa Indonesia"/>
                  <FaSun
                    className="header__theme-toggle"
                    size='24px'/>
                  <img
                    className="header__avatar"
                    src='https://ui-avatars.com/api/?name=testing&background=random' alt="Logo" title="logo"/>
                </div>
                </>
              : <div className="header__tool-container">
                  <Link
                    to='/auth/login'>Sign In</Link>
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
          {isHamburgerMenuActive
            ? < FaXmark
                className='header__hamburger-menu'
                onClick={ hamburgerMenuToggle }
              />
            : < FaBars
                className='header__hamburger-menu'
                onClick={ hamburgerMenuToggle }
              />
          }
        </div>
      </header>
      <div className={ `header__drawer-menu ${isHamburgerMenuActive ? 'active' : ''}` }>
          { user.avatar
            ? <>
              <Navigation></Navigation>
                <div className="header__tool-container">
                <img
                  className="header__avatar"
                  src={ user.avatar } alt="Logo" title="logo"/>
                  <div className="header__tool">
                    <img
                      className="header__language-toggle"
                      src='/img/indonesia-flag.png' width='24' height='24' alt="Bahasa Indonesia" title="Bahasa Indonesia"/>
                    <FaSun
                      className="header__theme-toggle"
                      size='24px'/>
                  </div>
                </div>
              </>
            : <>
                <Navigation></Navigation>
                <div className="header__tool-container">
                  <div className="header__sign_button">
                    <Link
                      to='/auth/login'
                      onClick={ hamburgerMenuToggle }
                      >Sign In
                    </Link>
                    <Link
                      to='/auth/register'
                      onClick={ hamburgerMenuToggle }
                      className="button button-outlined"
                    >Sign Up
                    </Link>
                  </div>
                  <div className="header__tool">
                    <img
                      className="header__language-toggle"
                      src='/img/indonesia-flag.png' width='24' height='24' alt="Bahasa Indonesia" title="Bahasa Indonesia"/>
                    <FaSun
                      className="header__theme-toggle"
                      size='24px'/>
                  </div>
                </div>
              </>
          }
        </div>
    </>
  )
}