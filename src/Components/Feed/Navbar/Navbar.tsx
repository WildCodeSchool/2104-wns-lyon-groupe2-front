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
    border: '1px solid red',
  },
})((props: MenuProps) => (
  <Menu
    anchorReference="anchorPosition"
    elevation={0}
    anchorPosition={{ top: 200, left: 600 }}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

const Navbar: React.FC = () => {
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
  }

  const handleRedirectToRegisterNewUserPage = () => {
    history.push('/register-new-user')
  }
  if (userInfos)
    return (
      <div className="logo">
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={() => history.push('/profile')}>
            <ListItemIcon className="icons">
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Mon Profile" />
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
      </div>
    )
  return <></>
}

export default Navbar
