import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PersonnalAssets from '../Pages/Assets/PersonnalAssets'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'

const Routes: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/assets" component={PersonnalAssets} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routes
