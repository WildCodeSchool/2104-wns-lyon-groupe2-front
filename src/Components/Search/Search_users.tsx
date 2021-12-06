import React, { useContext } from 'react'
import { Avatar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { iUsers } from '../../Interfaces/UsersInterfaces'
import { UserContext } from '../Context/UserContext'

const useStyles = makeStyles((theme) => ({
  userCard: {
    width: '150px',
    height: '150px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user_avatar: {
    width: '90px',
    height: ' 90px',
    backgroundColor: 'blue',
    borderRadius: '50%',
  },
  user_name: {
    width: '50px',
    paddingTop: '5px',
  },
}))

const SearchUsers: React.FC<any> = (props) => {
  const { user }: { user: iUsers } = props
  const classes = useStyles()

  // TODO : faire une fonction qui renvoie vers la page de l'utilisateur au clic d'une carte
  return (
    <div className={classes.userCard}>
      <Avatar
        sizes="40"
        src={user.avatarUrl}
        style={{
          width: 100,
          height: 100,
        }}
      />

      <div className={classes.user_name}>
        {user.firstname} {user.lastname}
      </div>
    </div>
  )
}

export default SearchUsers
