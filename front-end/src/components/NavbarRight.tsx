import React from 'react'
import { Link } from 'react-router-dom'

const NavbarRight:React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
        <Link to="/login" className="px-4 py-2">Login</Link>
        <Link to="/signup" className="px-4 py-2">Get JotPool free</Link>
    </div>
  )
}

export default NavbarRight