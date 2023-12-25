import { useSelector } from 'react-redux'
import './ProfilePage.css'

export default function ProfilePage() {
  const user = useSelector(store => store.user)
  return (
    <main className="profile-page">
      <div className="profile-page__user">
        <img
          className="profile-page__user-avatar"
          src={ user.avatar }
        />
        <div className="profile-page__user-information">
          <p className="profile-page__user-id">{ user.id }</p>
          <p className="profile-page__user-name h4">{ user.name }</p>
          <p className="profile-page__user-email">{ user.email }</p>
        </div>
      </div>
    </main>
  )
}