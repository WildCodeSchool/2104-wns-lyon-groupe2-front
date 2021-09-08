import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

import Routes from '../Routes/Routes'
import './App.scss'

const App = (): JSX.Element => {
  const { REACT_APP_API_URL } = process.env
  // ici à voir pour le new InmemoryCache pour le Bearer Token

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: createUploadLink({
      uri: `${REACT_APP_API_URL}graphql`,
    }),
    cache: new InMemoryCache(),
    headers: {
      authorization: localStorage.getItem('token') || '',
    },
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
