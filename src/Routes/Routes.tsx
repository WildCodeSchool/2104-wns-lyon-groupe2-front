import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserProvider from '../Components/Context/UserContext'
import PersonnalAssets from '../Pages/Assets/PersonnalAssets'
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'

const Routes: React.FC = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/" component={Home} />
            <Route exact path="/assets" component={PersonnalAssets} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  )
}

export default Routes
