import React from 'react'
import NavbarLeft from './NavbarLeft'
import NavbarRight from './NavbarRight'

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <NavbarLeft />
        <NavbarRight />
    </div>
  )
}

export default Navbar