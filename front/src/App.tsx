import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { AnimatePresence } from 'framer-motion'
import 'primereact/resources/themes/saga-orange/theme.css'
import { Routes, Route } from 'react-router-dom'

import DefaultLayout from './layouts/default'
import AuthLayout from './layouts/auth'

import Home from './pages/home'
import Login from './pages/auth/login'
import Register from './pages/auth/register'

function App() {
    return (
        <AnimatePresence mode="wait">
            <div>
                <Routes>
                    <Route
                        path="/" 
                        element={<DefaultLayout />} 
                    >
                        <Route index element={<Home />} />
                    </Route>

                    <Route
                        path="/auth" 
                        element={<AuthLayout />} 
                    >
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                </Routes>
            </div>
        </AnimatePresence>
    )
}

export default App