import {BrowserRouter} from 'react-router-dom'
import {LeftMenu} from "./components/LeftMenu/LeftMenu";
import {useRoutes} from "./routes";

function App() {
  const isAuthenticated = true //!!token
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
