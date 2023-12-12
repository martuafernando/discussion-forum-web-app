import React from "react";
import './RegisterPage.css'
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../../redux/states/user/action";

export default function RegisterPage() {
  const dispatch = useDispatch()

  function onRegisterHandler(event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const { name, email, password } = Object.fromEntries(formData.entries())
    dispatch(asyncRegisterUser({ name, email, password }))
  }

  return (
    <div className="register-page">
      <h2>Daftar</h2>
      <p>Silahkan masukkan name, email, dan password yang ingin didaftarkan</p>
      <form className="register-page__form" action="" onSubmit={onRegisterHandler}>
        <input className="register-page__name" name="name" type="text" placeholder="name" />
        <input className="register-page__email" name="email" type="email" placeholder="email" />
        <input className="register-page__password" name="password" type="password" placeholder="Password" />
        <button className="register-page__submit" type="submit">Register</button>
      </form>
    </div>
  )
} 