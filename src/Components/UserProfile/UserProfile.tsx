import React, { useContext, useEffect, useState } from 'react'
import { Grid, Avatar, Typography, Button } from '@material-ui/core'
import { useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router'
import { useToasts } from 'react-toast-notifications'
import { iUsers } from '../../Interfaces/UsersInterfaces'
import useStyles from './UserProfilesStyles'
import { UserContext } from '../Context/UserContext'
import { GET_USER_BY_ID, UPLOAD_USER_PROFIL } from '../../graphql/mutations'

const UserProfile = (props: any) => {
  const classes = useStyles()
  const [user, setUser] = useState<iUsers>()
  const { userInfos, addUser } = useContext(UserContext)
  const { addToast } = useToasts()

  // eslint-disable-next-line react/destructuring-assignment
  const history = useHistory()
  const id: string = history.location.pathname.split('/')[2]

  const {
    loading,
    error,
    data: userData,
    refetch,
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      input: {
        id,
      },
    },
  })
  const [uploadUserProfil] = useMutation(UPLOAD_USER_PROFIL, {
    onCompleted: (res) => console.log(res),
  })
  const handleSendMyPix = async (e) => {
    const data = e.target.files[0]
    const type = e.target.id
    if (data.size > 2097152) {
      addToast('You have to send us something smaller...', {
        appearance: 'error',
        autoDismiss: true,
      })
    } else {
      const sendMyPix = await uploadUserProfil({
        variables: { data, type },
      })
      if (sendMyPix?.data?.uploadUserProfil?.token) {
        addUser(sendMyPix?.data?.uploadUserProfil?.token)
      }
    }
  }

  useEffect(() => {
    if (userData) {
      setUser(userData.getUserByID)
    }
  }, [userData])

  if (user)
    return (
      <Grid>
        {user && (
          <Grid item xs={12} className={classes.container}>
            <Avatar
              sizes="40"
              src={userInfos.avatarUrl}
              style={{
                width: 100,
                height: 100,
                backgroundColor: !user.avatarUrl ? user.color : undefined,
              }}
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
            src={userInfos.avatarUrl}
            style={{
              width: 100,
              height: 100,
              backgroundColor: !userInfos.avatarUrl ? userInfos.color : null,
            }}
          >
            {userInfos.firstname &&
            userInfos.lastname &&
            !userInfos.avatarUrl ? (
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
        <Grid className={classes.uploadContainer}>
          <div>
            <label htmlFor="avatarUpload">
              <input
                style={{ display: 'none' }}
                id="avatarUpload"
                name="avatarUpload"
                type="file"
                onChange={handleSendMyPix}
                accept="image/*"
              />
              <div className="file_upload_container_button">
                <Button
                  className={classes.uploadAvatar}
                  color="primary"
                  variant="contained"
                  component="span"
                >
                  Change my Avatar
                </Button>
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="backgroundUpload">
              <input
                style={{ display: 'none' }}
                id="backgroundUpload"
                name="backgroundUpload"
                type="file"
                onChange={handleSendMyPix}
                accept="image/*"
              />
              <div className="file_upload_container_button">
                <Button
                  className={classes.uploadBackground}
                  color="primary"
                  variant="contained"
                  component="span"
                >
                  Change my Background
                </Button>
              </div>
            </label>
          </div>
        </Grid>
      </Grid>
    )
  return <></>
}

export default UserProfile
