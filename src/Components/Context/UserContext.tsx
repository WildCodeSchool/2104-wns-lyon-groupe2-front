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

  useEffect(() => {
    if (initialState) {
      setUserInfos(jwt_decode(initialState))
      setToken(initialState)
    }
  }, [])

  const removeUser = () => {
    console.log('remove user')
    localStorage.removeItem('token')
    setUserInfos(null)
    setToken(null)
  }

  const addUser = (userToken: string) => {
    console.log('add user')
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
