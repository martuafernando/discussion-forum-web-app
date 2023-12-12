import React from "react";
import './Header.css'

import logo from '@assets/logo.svg'
import Navigation from "@components/navigation/Navigation";
export default function Header() {
  return (
    <header>
      
      <img src={logo} alt="Logo" title="logo"/>
      <Navigation></Navigation>
      <img src={logo} alt="Logo" title="logo"/>
    </header>
  )
}