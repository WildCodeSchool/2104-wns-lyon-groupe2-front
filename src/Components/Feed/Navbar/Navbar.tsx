/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useHistory } from 'react-router-dom'
import { FcTrademark } from 'react-icons/fc'
import './Navbar.scss'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Searchbar from './Searchbar'

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
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const history = useHistory()

  const handleClick: (e: React.MouseEvent<HTMLElement>) => void = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose: () => void = () => {
    setAnchorEl(null)
  }
  const handleLogout = (): void => {
    localStorage.removeItem('token')
    history.push('/login')
  }

  const handleRedirectToRegisterNewUserPage = () => {
    history.push('/register-new-user')
  }

  return (
    <div className="navbar_container">
      <Searchbar />
      <div onClick={handleClick}>
        <FcTrademark className="logo_user" size={50} />
      </div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Se déconnecter" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleRedirectToRegisterNewUserPage}>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Ajouter un utilisateur" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  )
}

export default Navbar
