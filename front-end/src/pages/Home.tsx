import React from 'react'
import Sidebar from '../components/Sidebar'
import MainArea from '../components/MainArea'

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MainArea />
    </div>
  )
}

export default Home