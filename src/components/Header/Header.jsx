import React from "react";
import PropTypes from 'prop-types'
import './Header.css'

import logo from '@assets/logo.svg'
import Navigation from "@components/Navigation/Navigation";
export default function Header() {
  return (
    <header>
      <img src={logo} alt="Logo" title="logo"/>
      <Navigation></Navigation>
      <img src={logo} alt="Logo" title="logo"/>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}