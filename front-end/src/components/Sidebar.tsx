import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GoHome } from "react-icons/go";

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 border-r border-gray-200 flex flex-col">
      <nav className='flex flex-col gap-2'>
        
      </nav>
    </aside>
  );
}

export default Sidebar