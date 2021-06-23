/* eslint-disable camelcase */
import { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { iUsers } from '../../Interfaces/UsersInterfaces'

export const UserContext: any = createContext(null)
const initialState = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : ''

const UserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [userInfos, setUserInfos] = useState<iUsers | null>(null)

  useEffect(() => {
    setToken(initialState)
    if (token) {
      setUserInfos(jwt_decode(token))
    }
  }, [token])
  return (
    <UserContext.Provider value={{ token, setToken, userInfos }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
