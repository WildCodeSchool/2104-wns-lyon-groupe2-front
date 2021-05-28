import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { ToastProvider } from 'react-toast-notifications'

import App from './App/App'
import reportWebVitals from './reportWebVitals'

import SidebarContextProvider from './Components/Context/SidebarContext'
import NavbarProvider from './Components/Context/NavbarContext'
import UserProvider from './Components/Context/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider placement="bottom-center">
      <UserProvider>
        <NavbarProvider>
          <SidebarContextProvider>
            <App />
          </SidebarContextProvider>
        </NavbarProvider>
      </UserProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
