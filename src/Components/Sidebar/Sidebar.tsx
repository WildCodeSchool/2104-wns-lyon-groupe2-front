import { useState, useContext } from 'react'
import Switch from '@material-ui/core/Switch'
import { FcSettings } from 'react-icons/fc'
import { useHistory } from 'react-router-dom'
import Assets from './Assets'
import WorkspaceSchool from './WorkspaceSchool'
import './Sidebar.scss'
import { SidebarContext } from '../Context/SidebarContext'
import AddWorkspace from './AddWorskpace'

const Sidebar: React.FC = () => {
  const [assetsModal, setAssetsModal] = useState<boolean>(false)
  const [workSpaceModal, setWorkSpaceModal] = useState<boolean>(true)
  const history = useHistory()
  const { handleClick } = useContext(SidebarContext)

  const [checked, setChecked] = useState<boolean>(false)

  const handleModals: () => void = () => {
    setChecked(!checked)
    if (checked) {
      setAssetsModal(false)
      setWorkSpaceModal(true)
      history.push('/')
    } else if (!checked) {
      setWorkSpaceModal(false)
      setAssetsModal(true)
      history.push('/assets')
    }
  }

  return (
    <div
      className={
        checked ? 'sidebar_container_assets' : 'sidebar_container_workspace'
      }
    >
      <div className="sidebar_header">
        <div>
          <img
            className="website_logo"
            src="logo-ds.png"
            alt="Daddy Studies"
            onClick={() => history.push('/')}
          />
        </div>
      </div>
      <div className="btn_sidebar_top">
        <Switch
          checked={checked}
          onChange={handleModals}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />

        <AddWorkspace />
      </div>
      {assetsModal && <Assets />}
      {workSpaceModal && <WorkspaceSchool />}
      <div className="btn_sidebar_bottom">
        <p className="pseudo">pseudo</p>
        <FcSettings className="params_icon" />
      </div>
    </div>
  )
}

export default Sidebar
