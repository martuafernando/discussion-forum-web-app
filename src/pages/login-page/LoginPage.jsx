import './LoginPage.css'
import { useDispatch, useSelector } from "react-redux";
import { asyncLoginUser } from "../../redux/states/user/action";
import { useNavigate, Link } from "react-router-dom";
import Flash from "@components/flash/Flash";
import SpinningCircle from "../../components/spinning-circle/SpinningCircle";

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(store => store.loadingBar)

  function onLoginHandler(event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const { email, password } = Object.fromEntries(formData.entries())
    dispatch(asyncLoginUser(email, password))
      .then(() => navigate('/'))
  }

  return (
      <main className="login-page">
        <h2>Login</h2>
        <form className="login-page__form" action="" onSubmit={onLoginHandler}>
          <Flash className='login-page__flash' />
          <input className="login-page__email" name="email" type="email" placeholder="Email" />
          <input className="login-page__password" name="password" type="password" placeholder="Password" />
          <div className="login-page__action">
            <p>New member? <Link to='/auth/register'>Sign Up</Link></p>
            <button
              className="login-page__submit button-filled"
              type="submit"
              disabled={ loading.default }
              >{ loading.default ? <SpinningCircle /> : 'Sign In' }
            </button>
          </div>
        </form>
      </main>
  )
} 