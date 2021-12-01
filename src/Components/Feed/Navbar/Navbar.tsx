/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router-dom'
import { FcTrademark } from 'react-icons/fc'
import './Navbar.scss'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { Avatar } from '@material-ui/core'
import Searchbar from './Searchbar'
import { UserContext } from '../../Context/UserContext'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
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
      backgroundColor: 'theme.palette.primary.main',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

const Navbar: React.FC = function () {
  const { userInfos, removeUser } = useContext(UserContext)
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const history = useHistory()

  useEffect(() => {
    if (userInfos) {
      setIsUserAdmin(userInfos.isSchoolAdmin)
    }
  }, [userInfos])

  const handleClick: (e: React.MouseEvent<HTMLElement>) => void = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose: () => void = () => {
    setAnchorEl(null)
  }

  const handleLogout = (): void => {
    removeUser()
    history.push('/login')
  }

  const handleRedirectToRegisterNewUserPage = () => {
    history.push('/register-new-user')
  }
  console.log(userInfos)
  if (userInfos)
    return (
      <div className="logo">
        <div
          onClick={handleClick}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* <Avatar
            style={{ backgroundColor: userInfos.color, cursor: 'pointer' }}
          >
            {userInfos.firstname.charAt(0)}
            {userInfos.lastname.charAt(0)}
          </Avatar> */}
          <AccountCircleIcon
            fontSize="large"
            style={{
              cursor: 'pointer',
              marginRight: 10,
              color: 'white',
            }}
          />
        </div>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={() => history.push('/profile')}>
            <ListItemIcon className="icons">
              <AccountCircleIcon fontSize="small" style={{ marginRight: 10 }} />
            </ListItemIcon>
            <ListItemText primary="Mon Profile" />
          </StyledMenuItem>
          {isUserAdmin && (
            <StyledMenuItem
              style={{ padding: 30 }}
              onClick={handleRedirectToRegisterNewUserPage}
            >
              <ListItemIcon className="icons">
                <PersonAddIcon fontSize="small" style={{ marginRight: 10 }} />
              </ListItemIcon>
              <ListItemText primary="Ajout d'utilisateurs" />
            </StyledMenuItem>
          )}
          <StyledMenuItem onClick={handleLogout}>
            <ListItemIcon className="icons">
              <ExitToAppIcon fontSize="small" style={{ marginRight: 10 }} />
            </ListItemIcon>
            <ListItemText primary="Se déconnecter" />
          </StyledMenuItem>
        </StyledMenu>
      </div>
    )
  return <>Problem</>
}

export default Navbar
