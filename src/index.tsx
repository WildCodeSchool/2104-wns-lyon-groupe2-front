import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { setChonkyDefaults } from 'chonky'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'
import App from './App/App'
import reportWebVitals from './reportWebVitals'
import SidebarContextProvider from './Components/Context/SidebarContext'
import NavbarProvider from './Components/Context/NavbarContext'

// Somewhere in your `index.ts`:
setChonkyDefaults({ iconComponent: ChonkyIconFA })

ReactDOM.render(
  <React.StrictMode>
    <NavbarProvider>
      <SidebarContextProvider>
        <App />
      </SidebarContextProvider>
    </NavbarProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
