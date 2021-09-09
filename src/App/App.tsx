import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import Routes from '../Routes/Routes'
import './App.scss'

const App = (): JSX.Element => {
  const { REACT_APP_API_URL } = process.env

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token || '',
      },
    }
  })
  const uploadLink = createUploadLink({ uri: `${REACT_APP_API_URL}graphql` })

  // ici à voir pour le new InmemoryCache pour le Bearer Token

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: authLink.concat(uploadLink),
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
