import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useContext } from 'react'
import PersonalFolders from '../Pages/Folders/PersonalFolders'
import AddNewUser from '../Pages/AddNewUser/AddNewUser'
import { ForgotPassword } from '../Pages/Password/ForgotPassword'
import { UserContext } from '../Components/Context/UserContext'
import MailSent from '../Pages/Password/MailSent'
import NewPassword from '../Pages/Password/NewPassword'

import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import PersonalFoldersHome from '../Components/PersonalFolders/PersonalFoldersHome'

import Publication from '../Pages/Publication/Publication'

const customHistory = createBrowserHistory()

const renderPublicSwitch = () => {
  return (
    <Switch>
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route exact path="/mailsent" component={MailSent} />
      <Route path="/" component={Login} />
    </Switch>
  )
}

const renderPrivateSwitch = () => {
  return (
    <Switch>
      <Route exact path="/publication" component={Publication} />
      <Route exact path="/register-new-user" component={AddNewUser} />
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
  )
}

const Routes: React.FC = () => {
  const { userInfos } = useContext(UserContext)
  return (
    <div>
      <Router history={customHistory}>
        {!userInfos ? renderPublicSwitch() : renderPrivateSwitch()}
      </Router>
    </div>
  )
}

export default Routes
