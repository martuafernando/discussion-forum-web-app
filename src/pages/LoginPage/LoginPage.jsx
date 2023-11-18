import React from "react";
import './LoginPage.css'

export default function LoginPage() {
  return (
    <div className="login-page">
      <h2>Masuk</h2>
      <p>Silahkan masukkan username dan passwordmu</p>
      <form className="login-page__form" action="">
        <input className="login-page__username" type="text" placeholder="Username" />
        <input className="login-page__password" type="password" placeholder="Password" />
        <button className="login-page__submit" type="submit">SIGN IN</button>
      </form>
    </div>
  )
} 