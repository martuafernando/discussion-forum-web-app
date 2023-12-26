import { Link } from 'react-router-dom'
import './Navigation.css'
import { useLocation } from 'react-router-dom'

export default function Navigation () {
  const location = useLocation()
  return (
    <nav>
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}><Link to="/">Threads</Link></li>
        <li className={location.pathname === '/leaderboards' ? 'active' : ''}><Link to="/leaderboards">Leaderboards</Link></li>
        <li className={location.pathname === '/profile' ? 'active' : ''}><Link to="/profile">Profil</Link></li>
        <li ><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  )
}
