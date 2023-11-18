import React from "react";
import './RegisterPage.css'

export default function RegisterPage() {
  return (
    <div className="register-page">
      <h2>Daftar</h2>
      <p>Silahkan masukkan username dan password yang ingin didaftarkan</p>
      <form className="register-page__form" action="">
        <input className="register-page__username" type="text" placeholder="Username" />
        <input className="register-page__password" type="password" placeholder="Password" />
        <button className="register-page__submit" type="submit">Register</button>
      </form>
    </div>
  )
} 