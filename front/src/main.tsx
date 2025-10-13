import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrimeReactProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </PrimeReactProvider>
    </StrictMode>,
)
