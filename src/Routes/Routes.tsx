import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import UserProvider from '../Components/Context/UserContext'
import PersonnalAssets from '../Pages/Assets/PersonnalAssets'
import { ForgotPassword } from '../Pages/ForgotPassword/ForgotPassword'
import MailSent from '../Pages/ForgotPassword/MailSent'
import NewPassword from '../Pages/ForgotPassword/NewPassword'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'

const customHistory = createBrowserHistory()

const Routes: React.FC = () => {
  return (
    <div>
      <Router history={customHistory}>
        <UserProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/mailsent" component={MailSent} />
            <Route
              exact
              path="/password_recovery/:token/:id"
              component={NewPassword}
            />

            <Route exact path="/" component={Home} />
            <Route exact path="/assets" component={PersonnalAssets} />
          </Switch>
        </UserProvider>
      </Router>
    </div>
  )
}

export default Routes
