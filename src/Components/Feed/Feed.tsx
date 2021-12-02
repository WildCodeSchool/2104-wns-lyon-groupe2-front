/* eslint-disable */

import { useContext, useEffect } from 'react'
import './Feed.scss'
import { SidebarContext } from '../Context/SidebarContext'
import AssetsPopin from './Popin/AssetsPopin'
import WorkspacePopin from './Popin/WorkspacePopin'
import BurgerMenu from '../Sidebar/BurgerMenu/BurgerMenu'
import Navbar from './Navbar/Navbar'
import Searchbar from './Navbar/Searchbar'
import SearchbarPopin from './Popin/SearchbarPopin'
import { NavbarContext } from '../Context/NavbarContext'
import Messages from './Messages/Messages'
import { UserContext } from '../Context/UserContext'
import { useQuery, gql } from '@apollo/client'

const Feed: React.FC = () => {
  const { workspacePopin, setWorkspacePopin, assetsPopin, setAssetsPopin } =
    useContext(SidebarContext)
  const { school } = useContext(UserContext)
  const { popin } = useContext(NavbarContext)

  return (
    <div className="feed_container">
      <BurgerMenu />
      <div
        className="feed_header"
        style={{
          backgroundColor: school.primaryColor,
          width: '100%',
          height: 50,
        }}
      >
        <Searchbar />
        <Navbar />
      </div>

      {popin && <SearchbarPopin />}

      {workspacePopin && (
        <div>
          <WorkspacePopin
            workspacePopin={workspacePopin}
            setWorkspacePopin={setWorkspacePopin}
          />
        </div>
      )}

      {assetsPopin && (
        <div>
          <AssetsPopin
            assetsPopin={assetsPopin}
            setAssetsPopin={setAssetsPopin}
          />
        </div>
      )}
      <div>
        <Messages />
      </div>
    </div>
  )
}

export default Feed
