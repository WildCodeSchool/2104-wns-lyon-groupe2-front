import React, { useContext } from 'react'
import { NavbarContext } from '../../Components/Context/NavbarContext'
import { SidebarContext } from '../../Components/Context/SidebarContext'
import { UserContext } from '../../Components/Context/UserContext'
import Navbar from '../../Components/Feed/Navbar/Navbar'
import AssetsPopin from '../../Components/Feed/Popin/AssetsPopin'
import SearchbarPopin from '../../Components/Feed/Popin/SearchbarPopin'
import WorkspacePopin from '../../Components/Feed/Popin/WorkspacePopin'
import BurgerMenu from '../../Components/Sidebar/BurgerMenu/BurgerMenu'
import Sidebar from '../../Components/Sidebar/Sidebar'
import UserProfile from '../../Components/UserProfile/UserProfile'
import './Profile.scss'

const Profile: React.FC = () => {
  const { userInfos } = useContext(UserContext)
  const { workspacePopin, setWorkspacePopin, assetsPopin, setAssetsPopin } =
    useContext(SidebarContext)

  const { popin } = useContext(NavbarContext)
  console.log(userInfos)
  return (
    <div className="home_page_container">
      <Sidebar />
      <div className="container">
        <div className="feed_container">
          <BurgerMenu />
          <div className="feed_header">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="profileContainer">
        <UserProfile userInfos={userInfos} />
      </div>
    </div>
  )
}

export default Profile
