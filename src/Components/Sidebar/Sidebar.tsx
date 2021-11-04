import { useState, useContext, useEffect } from 'react'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { FcSettings, FcPlus } from 'react-icons/fc'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Assets from './Assets'
import WorkspaceSchool from './WorkspaceSchool'
import './Sidebar.scss'
import { SidebarContext } from '../Context/SidebarContext'
import AddWorkspace from './AddWorskpace'
import { UserContext } from '../Context/UserContext'

const Sidebar: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { userInfos, removeUser } = useContext(UserContext)
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const history = useHistory()
  const { isWorkspaceDisplayed, setIsWorkspaceDisplayed } =
    useContext(SidebarContext)

  useEffect(() => {
    if (userInfos) {
      setIsUserAdmin(userInfos.isSchoolAdmin)
    }
  }, [userInfos])

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props: MenuProps) => (
    <Menu
      elevation={3}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ))

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {},
      },
    },
  }))(MenuItem)

  const handleRedirectToRegisterNewUserPage = () => {
    history.push('/register-new-user')
  }

  const handleLogout = (): void => {
    removeUser()
  }

  const renderUseMenu = () => {
    if (userInfos)
      return (
        <StyledMenu
          id="customized-menu"
          // anchorEl={isUserMenuOpen}
          keepMounted
          open={isUserMenuOpen}
          onClose={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <StyledMenuItem onClick={() => history.push('/profile')}>
            <ListItemIcon className="icons">
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Mon profil" />
          </StyledMenuItem>
          {isUserAdmin && (
            <StyledMenuItem
              style={{ padding: 20 }}
              onClick={handleRedirectToRegisterNewUserPage}
            >
              <ListItemIcon className="icons">
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Ajout d'utilisateurs" />
            </StyledMenuItem>
          )}
          <StyledMenuItem onClick={handleLogout}>
            <ListItemIcon className="icons">
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Se déconnecter" />
          </StyledMenuItem>
        </StyledMenu>
      )
    return <></>
  }

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
        <div>
          <Avatar
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            style={{ backgroundColor: userInfos.color, cursor: 'pointer' }}
          >
            {userInfos.firstname.charAt(0)}
            {userInfos.lastname.charAt(0)}
          </Avatar>
          {isUserMenuOpen && renderUseMenu()}
        </div>
        {/* <FcSettings className="params_icon" /> */}
      </div>
    </div>
  )
}

export default Sidebar
