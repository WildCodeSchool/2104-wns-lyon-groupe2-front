/* eslint-disable camelcase */
import { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

export const UserContext: any = createContext(null)
const initialState = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : ''

const UserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  useEffect(() => {
    setToken(initialState)
    if (token) {
      setUserId(jwt_decode(token))
    }
    if (userId) {
    }
  }, [token])
  return (
    <UserContext.Provider value={{ token, setToken, userId }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
