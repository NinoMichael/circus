import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'primereact/resources/themes/saga-orange/theme.css'
import 'primeicons/primeicons.css'

import { LanguageProvider } from './context/LanguageContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <LanguageProvider>
      <React.StrictMode>
        <App />
       </React.StrictMode>
  </LanguageProvider>
)

