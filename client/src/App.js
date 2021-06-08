import {BrowserRouter} from 'react-router-dom'
import {LeftMenu} from "./components/LeftMenu/LeftMenu";
import {useQuery, gql} from '@apollo/client'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";



function App() {
  const {token, login, logout, userId, ready} = useAuth()
    console.log(token)
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
      <BrowserRouter>
          <div className="container">
              {isAuthenticated && <LeftMenu />}
              {routes}
          </div>
      </BrowserRouter>
  );
}

export default App;
