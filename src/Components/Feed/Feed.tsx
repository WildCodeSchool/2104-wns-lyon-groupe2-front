import { useContext } from 'react'
import './Feed.scss'
import { SidebarContext } from '../Context/SidebarContext'
import AssetsPopin from './Popin/AssetsPopin'
import WorkspacePopin from './Popin/WorkspacePopin'
import BurgerMenu from '../Sidebar/BurgerMenu/BurgerMenu'
import Navbar from './Navbar/Navbar'
import SearchbarPopin from './Popin/SearchbarPopin'
import { NavbarContext } from '../Context/NavbarContext'

const Feed: React.FC = () => {
  const {
    workspacePopin,
    setWorkspacePopin,
    assetsPopin,
    setAssetsPopin,
  } = useContext(SidebarContext)

  const { popin } = useContext(NavbarContext)

  return (
    <div className="feed_container">
      <BurgerMenu />
      <div className="feed_header">
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
    </div>
  )
}

export default Feed
