import { useState, useContext, useEffect } from 'react'
import Switch from '@material-ui/core/Switch'
import { FcSettings, FcPlus } from 'react-icons/fc'
import { useHistory } from 'react-router-dom'
import Assets from './Assets'
import WorkspaceSchool from './WorkspaceSchool'
import './Sidebar.scss'
import { SidebarContext } from '../Context/SidebarContext'
import AddWorkspace from './AddWorskpace'

const Sidebar: React.FC = () => {
  const history = useHistory()
  const { isWorkspaceDisplayed, setIsWorkspaceDisplayed } =
    useContext(SidebarContext)

  const handleModals: () => void = () => {
    setIsWorkspaceDisplayed((prevState) => {
      if (!prevState) {
        history.push('/')
      } else {
        history.push('/personal-folders')
      }
      return !isWorkspaceDisplayed
    })
  }

  return (
    <div
      className={
        !isWorkspaceDisplayed
          ? 'sidebar_container_assets'
          : 'sidebar_container_workspace'
      }
    >
      <div className="sidebar_header">
        <div>
          <img
            className="website_logo"
            // eslint-disable-next-line prefer-template
            src={process.env.PUBLIC_URL + '/logo-ds.png'}
            alt="Daddy Studies"
            onClick={() => history.push('/')}
          />
        </div>
      </div>
      <div className="btn_sidebar_top">
        <Switch
          checked={!isWorkspaceDisplayed}
          onChange={handleModals}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <AddWorkspace />
      </div>
      {!isWorkspaceDisplayed && <Assets />}
      {isWorkspaceDisplayed && <WorkspaceSchool />}
      <div className="btn_sidebar_bottom">
        <p className="pseudo">pseudo</p>
        <FcSettings className="params_icon" />
      </div>
    </div>
  )
}

export default Sidebar
