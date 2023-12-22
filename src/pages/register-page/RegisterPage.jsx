import './RegisterPage.css'
import { useDispatch, useSelector } from "react-redux";
import { asyncRegisterUser } from "../../redux/states/user/action";
import Flash from "@components/flash/Flash";
import { Link } from "react-router-dom";
import SpinningCircle from "@components/spinning-circle/SpinningCircle";

export default function RegisterPage() {
  const dispatch = useDispatch()
  const loading = useSelector(store => store.loadingBar)

  function onRegisterHandler(event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const { name, email, password } = Object.fromEntries(formData.entries())
    dispatch(asyncRegisterUser({ name, email, password }))
  }

  return (
    <div className="register-page">
      <h2>Sign Up</h2>
      <form className="register-page__form" action="" onSubmit={onRegisterHandler}>
        <Flash className='register-page__flash' />
        <input className="register-page__name" name="name" type="text" placeholder="name" />
        <input className="register-page__email" name="email" type="email" placeholder="email" />
        <input className="register-page__password" name="password" type="password" placeholder="Password" />
        <div className="register-page__action">
          <p>Already have account? <Link to='/auth/login'>Sign In</Link></p>
          <button
              className="register-page__submit button-filled"
              type="submit"
              disabled={ loading.default }
              >{ loading.default ? <SpinningCircle /> : 'Sign Up' }
              </button>
        </div>
      </form>
    </div>
  )
} 