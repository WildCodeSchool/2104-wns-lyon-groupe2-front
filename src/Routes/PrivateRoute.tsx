import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../Components/Context/UserContext'
import { IS_AUTH } from '../graphql/mutations'

interface Props {
  component: React.FC
  [x: string]: any
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const { userInfos } = useContext(UserContext)
  const token = localStorage.getItem('token')
  const [isAuth, { data, loading }] = useMutation(IS_AUTH, {
    fetchPolicy: 'network-only',
  })
  const apiCall = async () => {
    if (token) {
      const response = await isAuth({ variables: { input: { token } } })
      if (response?.data?.isAuth?.auth) {
        setAuthenticated(true)
      }
      setChecked(true)
    } else {
      setAuthenticated(false)
      setChecked(true)
    }
  }
  useEffect(() => {
    apiCall()
  }, [])

  return (
    <>
      {!checked && <p>Loading...</p>}
      {authenticated && checked && (
        <Route
          {...rest}
          render={() => {
            return <Component />
          }}
        />
      )}
      {!authenticated && checked && (
        <Route
          {...rest}
          render={() => {
            return <Redirect to={{ pathname: '/login' }} />
          }}
        />
      )}
    </>
  )
}

export default PrivateRoute
