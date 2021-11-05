/* eslint-disable camelcase */
import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useToasts } from 'react-toast-notifications'
import { iUsers, iTokenDecrypted } from '../../Interfaces/UsersInterfaces'

export const UserContext: any = createContext(null)

const initialState = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const UserProvider: React.FC = ({ children }) => {
  // const { history } = props
  const [token, setToken] = useState<string | null>(null)
  const [userInfos, setUserInfos] = useState<iUsers | null>()
  const { addToast } = useToasts()

  const checkTokenValidity = (encryptedToken: string) => {
    const userData: iTokenDecrypted = jwt_decode(encryptedToken)
    if (userData && userData.exp) {
      const now = Date.now()
      if (now > userData.exp * 1000) {
        return false
      }
    }
    return true
  }

  const removeUser = () => {
    localStorage.removeItem('token')
    setUserInfos(null)
    setToken(null)
  }

  useEffect(() => {
    if (initialState) {
      const isValid = checkTokenValidity(initialState)
      if (isValid) {
        setUserInfos(jwt_decode(initialState))
        setToken(initialState)
      } else {
        removeUser()
      }
    }
  }, [])

  const addUser = (userToken: string) => {
    localStorage.setItem('token', userToken)
    setToken(userToken)
    const userData: any = jwt_decode(userToken)
    if (userData?.first_connection === true) {
      addToast(
        'Merci de cliquer sur le lien de changement de mot de passe qui vous a été envoyé par mail',
        {
          appearance: 'error',
          autoDismiss: false,
        },
      )
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
