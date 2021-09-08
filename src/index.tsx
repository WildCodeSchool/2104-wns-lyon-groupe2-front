import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import { ToastProvider } from 'react-toast-notifications'

import App from './App/App'
import reportWebVitals from './reportWebVitals'

import SidebarContextProvider from './Components/Context/SidebarContext'
import NavbarProvider from './Components/Context/NavbarContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider placement="bottom-center">
      <NavbarProvider>
        <SidebarContextProvider>
          <App />
        </SidebarContextProvider>
      </NavbarProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
