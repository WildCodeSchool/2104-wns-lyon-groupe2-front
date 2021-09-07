import { useContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { UserContext } from '../Components/Context/UserContext'
import Routes from '../Routes/Routes'
import './App.scss'

const App = (): JSX.Element => {
  const { token } = useContext(UserContext)
  const { REACT_APP_API_URL } = process.env
  // ici à voir pour le new InmemoryCache pour le Bearer Token

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: REACT_APP_API_URL,
    cache: new InMemoryCache(),
    headers: {
      authorization: token || '',
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
