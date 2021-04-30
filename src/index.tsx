import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App/App'
import reportWebVitals from './reportWebVitals'
import SidebarContextProvider from './Components/Context/SidebarContext'

ReactDOM.render(
  <React.StrictMode>
    <SidebarContextProvider>
      <App />
    </SidebarContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
