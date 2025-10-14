import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrimeReactProvider>
            <LanguageProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </LanguageProvider>
        </PrimeReactProvider>
    </StrictMode>
)
