import {BrowserRouter} from 'react-router-dom'
import {LeftMenu} from "./components/LeftMenu/LeftMenu";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from '@apollo/client'
import {useRoutes} from "./routes";

const client = new ApolloClient({
    uri: '//:localhost:5000/graphql',
    cache: new InMemoryCache()
})

function App() {
  const isAuthenticated = false //!!token
  const routes = useRoutes(isAuthenticated)

  return (
      <ApolloProvider client={client}>
          <BrowserRouter>
              <div className="container">
                  {isAuthenticated && <LeftMenu />}
                  {routes}
              </div>
          </BrowserRouter>
      </ApolloProvider>

  );
}

export default App;
