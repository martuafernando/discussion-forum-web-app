import React from "react";
import './LoginPage.css'
import { useDispatch } from "react-redux";
import { asyncLoginUser } from "../../redux/states/user/action";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onLoginHandler(event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const { email, password } = Object.fromEntries(formData.entries())
    dispatch(asyncLoginUser(email, password))
    navigate('/')
  }
  return (
    <div className="login-page">
      <h2>Masuk</h2>
      <p>Silahkan masukkan username dan passwordmu</p>
      <form className="login-page__form" action="" onSubmit={onLoginHandler}>
        <input className="login-page__email" name="email" type="email" placeholder="Email" />
        <input className="login-page__password" name="password" type="password" placeholder="Password" />
        <button className="login-page__submit" type="submit">SIGN IN</button>
      </form>
    </div>
  )
} 