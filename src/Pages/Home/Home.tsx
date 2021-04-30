import React from 'react'
import Feed from '../../Components/Feed/Feed'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Home.scss'

const Home: React.FC = () => {
  return (
    <div className="home_page_container">
      <Sidebar />
      <Feed />
    </div>
  )
}

export default Home
