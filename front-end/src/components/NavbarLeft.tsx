import React from 'react'
import logo from '../assets/logo.png'

const NavbarLeft:React.FC = () => {
  return (
    <div className='flex items-center space-x-2'>
        <img src={logo} alt="JotPool logo" className="h-10, w-10" />
        <span className="text-xl font-bold text-gray-800">JotPool</span>
    </div>
  )
}

export default NavbarLeft