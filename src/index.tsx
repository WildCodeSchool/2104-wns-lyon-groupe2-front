import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App/App'
import reportWebVitals from './reportWebVitals'
import SidebarContextProvider from './Components/Context/SidebarContext'
import NavbarProvider from './Components/Context/NavbarContext'
import UserProvider from './Components/Context/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <NavbarProvider>
        <SidebarContextProvider>
          <App />
        </SidebarContextProvider>
      </NavbarProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
