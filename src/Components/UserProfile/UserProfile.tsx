import React, { useContext, useEffect, useState } from 'react'
import {
  Container,
  CssBaseline,
  Grid,
  Avatar,
  Typography,
} from '@material-ui/core'
import { useQuery, gql } from '@apollo/client'
import { useHistory, useLocation } from 'react-router'
import { iUsers } from '../../Interfaces/UsersInterfaces'
import useStyles from './UserProfilesStyles'
import { UserContext } from '../Context/UserContext'

export interface UserProfileProps {
  userInfos: iUsers
}
export const GET_USER_BY_ID = gql`
  query Query($input: UserId!) {
    getUserByID(input: $input) {
      id
      lastname
      firstname
      avatar
      email
      color
      schoolId
      userType
      isSchoolAdmin
    }
  }
`

const UserProfile = (props: any) => {
  console.log(props)
  const classes = useStyles()
  const [user, setUser] = useState<iUsers>()
  const { userInfos } = useContext(UserContext)
  // eslint-disable-next-line react/destructuring-assignment
  const history = useHistory()
  const id: string = history.location.pathname.split('/')[2]
  console.log(id)

  const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: {
      input: {
        id,
      },
    },
  })

  useEffect(() => {
    if (data) {
      setUser(data.getUserByID)
    }
  }, [data])

  if (user)
    return (
      <Grid>
        {user && (
          <Grid item xs={12} className={classes.container}>
            <Avatar
              sizes="40"
              style={{ width: 100, height: 100, backgroundColor: user.color }}
            >
              {user.firstname && user.lastname ? (
                <Typography style={{ fontSize: 40 }}>
                  {user.firstname.charAt(0) + user.lastname.charAt(0)}
                </Typography>
              ) : (
                ''
              )}
            </Avatar>
            <Grid>
              <Typography className={classes.field}>
                {user.firstname} {user.lastname}
              </Typography>
            </Grid>
            <Typography>{user.email}</Typography>
          </Grid>
        )}
      </Grid>
    )
  if (userInfos)
    return (
      <Grid>
        <Grid item xs={12} className={classes.container}>
          <Avatar
            sizes="40"
            style={{
              width: 100,
              height: 100,
              backgroundColor: userInfos.color,
            }}
          >
            {userInfos.firstname && userInfos.lastname ? (
              <Typography style={{ fontSize: 40 }}>
                {userInfos.firstname.charAt(0) + userInfos.lastname.charAt(0)}
              </Typography>
            ) : (
              ''
            )}
          </Avatar>
          <Grid>
            <Typography className={classes.field}>
              {userInfos.firstname} {userInfos.lastname}
            </Typography>
          </Grid>
          <Typography>{userInfos.email}</Typography>
        </Grid>
      </Grid>
    )
  return <></>
}

export default UserProfile
