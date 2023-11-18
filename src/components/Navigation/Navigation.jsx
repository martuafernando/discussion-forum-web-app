import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'
import { FaBeer } from "react-icons/fa";

export default function Navigation () {
  return (
    <nav>
      <ul>
        <li><Link to="/threads"><FaBeer /> Threads</Link></li>
        <li><Link to="/leaderboards">Leaderboards</Link></li>
      </ul>
    </nav>
  )
}
