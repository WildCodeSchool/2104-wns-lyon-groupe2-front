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
import PersonalFoldersHome from '../Components/PersonalFolders/PersonalFoldersHome'

import Publication from '../Pages/Publication/Publication'
import Profile from '../Pages/Profile/Profile'

const customHistory = createBrowserHistory()

const Routes: React.FC = () => {
  return (
    <div>
      <Router history={customHistory}>
        <UserProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/publication" component={Publication} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/register-new-user" component={AddNewUser} />
            <Route exact path="/mailsent" component={MailSent} />
            <Route
              exact
              path="/password_management/:token/:id"
              component={NewPassword}
            />
            <Route exact path="/personal-folders" component={PersonalFolders} />
            <Route exact path="/register-new-user" component={AddNewUser} />
            <Route
              exact
              path="/personal-folders/:parentId"
              component={PersonalFolders}
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/:id" component={Home} />
          </Switch>
        </UserProvider>
      </Router>
    </div>
  )
}

export default Routes
