import { useState, useContext } from 'react'
import Switch from '@material-ui/core/Switch'
import { FcPlus, FcSettings } from 'react-icons/fc'
import { useHistory } from 'react-router-dom'
import Assets from './Assets'
import Workspace from './Workspace'
import './Sidebar.scss'
import { SidebarContext } from '../Context/SidebarContext'

const Sidebar: React.FC = () => {
  const [assetsModal, setAssetsModal] = useState<boolean>(false)
  const [workSpaceModal, setWorkSpaceModal] = useState<boolean>(true)
  const history = useHistory()
  const { handleClick, checked, setChecked } = useContext(SidebarContext)

  const handleModals: () => void = () => {
    setChecked(!checked)
    if (checked) {
      setAssetsModal(false)
      setWorkSpaceModal(true)
    } else if (!checked) {
      setWorkSpaceModal(false)
      setAssetsModal(true)
    }
  }

  return (
    <div
      className={
        checked ? 'sidebar_container_assets' : 'sidebar_container_workspace'
      }
    >
      <div className="sidebar_header">
        <div onClick={() => history.push('/')}>
          <img
            className="website_logo"
            src="https://avatars.githubusercontent.com/u/67632677?v=4"
            alt="Big daddy"
          />
        </div>
        <h3 className="website_name">Daddy Studies</h3>
      </div>
      <div className="btn_sidebar_top">
        <Switch
          checked={checked}
          onChange={handleModals}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <FcPlus className="plus_icon" onClick={handleClick} />
      </div>
      {assetsModal && <Assets />}
      {workSpaceModal && <Workspace />}
      <div className="btn_sidebar_bottom">
        <p className="pseudo">pseudo</p>
        <FcSettings className="params_icon" />
      </div>
    </div>
  )
}

export default Sidebar
