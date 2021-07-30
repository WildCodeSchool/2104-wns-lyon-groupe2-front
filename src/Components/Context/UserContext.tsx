/* eslint-disable camelcase */
import { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router-dom'
import { iUsers, iTokenDecrypted } from '../../Interfaces/UsersInterfaces'

export const UserContext: any = createContext(null)

const tokenInLocalStorage = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const UserProvider = withRouter((props) => {
  const { history, children } = props
  const [token, setToken] = useState<string | null>(null)
  const [userInfos, setUserInfos] = useState<iUsers | null>(null)

  useEffect(() => {
    if (tokenInLocalStorage) {
      setUserInfos(jwt_decode(tokenInLocalStorage))
    }
  }, [])

  const removeUser = () => {
    localStorage.removeItem('token')
    setUserInfos(null)
    setToken(null)
  }

  const addUser = (userToken: string) => {
    history.push('/')
    localStorage.setItem('token', userToken)
    setToken(userToken)
    const userData: iTokenDecrypted = jwt_decode(userToken)
    // check if the token isn't expired
    if (userData && userData.exp) {
      const now = Date.now()
      if (now > userData.exp * 1000) {
        return history.push('/login')
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
})

export default UserProvider
