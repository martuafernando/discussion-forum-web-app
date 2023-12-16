import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

export default function Navigation () {
  return (
    <nav>
      <ul>
        <li className='active'><Link to="/">Threads</Link></li>
        <li><Link to="/leaderboards">Leaderboards</Link></li>
        <li><Link to="/profile">Profil</Link></li>
      </ul>
    </nav>
  )
}
