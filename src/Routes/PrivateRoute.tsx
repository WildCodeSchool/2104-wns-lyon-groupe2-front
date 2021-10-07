import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../Components/Context/UserContext'
import { IS_AUTH } from '../graphql/mutations'

interface Props {
  component: React.FC
  [x: string]: any
}
// HOC pour faire un call API qui va checker le token en back
// rendu conditionnel pour rediriger vers le composant si auth
// vers login si pas auth
const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const { userInfos } = useContext(UserContext)
  const token = localStorage.getItem('token') || ''
  const [isAuth] = useMutation(IS_AUTH, {
    fetchPolicy: 'network-only',
  })
  const apiCall = async () => {
    const response = await isAuth({ variables: { input: { token } } })
    if (response?.data?.isAuth?.auth) {
      setAuthenticated(true)
    }
    setChecked(true)
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
          render={(props) => {
            return (
              <Redirect
                to={{ pathname: '/login', state: { from: props.location } }}
              />
            )
          }}
        />
      )}
    </>
  )
}

export default PrivateRoute
