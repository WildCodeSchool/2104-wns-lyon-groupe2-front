import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AssetDetails from '../Components/Assets/AssetDetails'
import PersonnalAssets from '../Pages/Assets/PersonnalAssets'
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'

const Routes: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/" component={Home} />
          <Route exact path="/assets" component={PersonnalAssets} />
          <Route exact path="/assets/:id" component={AssetDetails} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routes
