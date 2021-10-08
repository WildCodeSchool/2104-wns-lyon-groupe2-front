import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import UserProvider from '../Components/Context/UserContext'
import PersonalFolders from '../Pages/Folders/PersonalFolders'
import AddNewUser from '../Pages/AddNewUser/AddNewUser'

import { ForgotPassword } from '../Pages/Password/ForgotPassword'

import MailSent from '../Pages/Password/MailSent'
import NewPassword from '../Pages/Password/NewPassword'

import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'

import Publication from '../Pages/Publication/Publication'
import Profile from '../Pages/Profile/Profile'
import PrivateRoute from './PrivateRoute'

const customHistory = createBrowserHistory()

// From React Router Doc \\
//  [...] that you should put <Route>s with more specific (typically longer) paths before less-specific ones.
//

const Routes: React.FC = () => {
  return (
    <div>
      <Router history={customHistory}>
        <UserProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/publication" component={Publication} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <PrivateRoute
              exact
              path="/register-new-user"
              component={AddNewUser}
            />
            <Route exact path="/mailsent" component={MailSent} />
            <Route
              exact
              path="/password_management/:token/:id"
              component={NewPassword}
            />
            <PrivateRoute
              exact
              path="/personal-folders/:parentId"
              component={PersonalFolders}
            />
            <PrivateRoute
              exact
              path="/personal-folders"
              component={PersonalFolders}
            />
            <PrivateRoute exact path="/:id" component={Home} />
            <PrivateRoute exact path="/" component={Home} />
          </Switch>
        </UserProvider>
      </Router>
    </div>
  )
}

export default Routes
