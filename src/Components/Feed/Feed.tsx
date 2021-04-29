import { useContext } from 'react'
import './Feed.scss'
import { SidebarContext } from '../Context/SidebarContext'
import AssetsPopin from './AssetsPopin'
import WorkspacePopin from './WorkspacePopin'
import BurgerMenu from '../Sidebar/BurgerMenu/BurgerMenu'

const Feed: React.FC = () => {
  const {
    workspacePopin,
    setWorkspacePopin,
    assetsPopin,
    setAssetsPopin,
  } = useContext(SidebarContext)
  return (
    <div className="feed_container">
      <BurgerMenu />
      <p>Feed</p>
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
