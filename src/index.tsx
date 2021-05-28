import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { setChonkyDefaults } from 'chonky'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'
import { ToastProvider } from 'react-toast-notifications'

import App from './App/App'
import reportWebVitals from './reportWebVitals'

import SidebarContextProvider from './Components/Context/SidebarContext'
import NavbarProvider from './Components/Context/NavbarContext'
import UserProvider from './Components/Context/UserContext'

// Somewhere in your `index.ts`:
setChonkyDefaults({ iconComponent: ChonkyIconFA })

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
