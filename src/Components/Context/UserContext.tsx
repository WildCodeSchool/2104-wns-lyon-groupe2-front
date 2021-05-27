/* eslint-disable camelcase */
import { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

export const UserContext: any = createContext(null)
const initialState = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : ''

const UserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [userId, setUderId] = useState<number | null>(null)
  useEffect(() => {
    setToken(initialState)
    if (token) {
      setUderId(jwt_decode(token))
    }
  }, [token])

  console.log('userId', userId)
  return (
    <UserContext.Provider value={{ token, setToken, userId }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
