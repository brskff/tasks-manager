import {BrowserRouter as Router} from 'react-router-dom'
import {LeftMenu} from "./components/LeftMenu/LeftMenu";
import {useQuery, gql, useApolloClient} from '@apollo/client'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {authVar} from "./cache";



function App() {
  // const {token, login, logout, userId, ready} = useAuth()
  const auth= useAuth()
  authVar(auth)
  const isAuthenticated = auth.token
  const routes = useRoutes(isAuthenticated)

  return (
      <Router>
          <div className="container">
              {isAuthenticated && <LeftMenu />}
              {routes}
          </div>
      </Router>
  );
}

export default App;
