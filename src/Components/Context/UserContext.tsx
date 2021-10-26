/* eslint-disable camelcase */
import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { iUsers, iTokenDecrypted } from '../../Interfaces/UsersInterfaces'

export const UserContext: any = createContext(null)
const initialState = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const UserProvider: React.FC = ({ children }) => {
  // const { history } = props
  const [token, setToken] = useState<string | null>(null)
  const [userInfos, setUserInfos] = useState<iUsers | null>(null)
  const { addToast } = useToasts()

  useEffect(() => {
    if (initialState) {
      setUserInfos(jwt_decode(initialState))
      setToken(initialState)
    }
  }, [])

  const removeUser = () => {
    localStorage.removeItem('token')
    setUserInfos(null)
    setToken(null)
  }

  const addUser = (userToken: string) => {
    localStorage.setItem('token', userToken)
    setToken(userToken)
    const userData: iTokenDecrypted = jwt_decode(userToken)
    if (userData?.first_connection === true) {
      addToast(
        'Merci de cliquer sur le lien de changement de mot de passe qui vous a été envoyé par mail',
        {
          appearance: 'error',
          autoDismiss: false,
        },
      )
      // return history.push('/login')
    }
    // check if the token isn't expired
    // history.push('/')

    if (userData && userData.exp) {
      const now = Date.now()
      if (now > userData.exp * 1000) {
        // return history.push('/login')
      }
    }

    return setUserInfos(userData)
  }

  return (
    <UserContext.Provider
      value={{ token, setToken, userInfos, removeUser, addUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
