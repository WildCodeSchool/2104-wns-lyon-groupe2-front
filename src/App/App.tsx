/* eslint-disable */

import React from 'react'
import Routes from '../Routes/Routes'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

function App() {
  const { REACT_APP_API_URL } = process.env

  const client = new ApolloClient({
    uri: REACT_APP_API_URL,
    cache: new InMemoryCache(),
  })

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </div>
  )
}

export default App
