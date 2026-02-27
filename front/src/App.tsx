import { AnimatePresence } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'

import DefaultLayout from './layouts/Default'

import Home from './pages/Home'

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
                </Routes>
            </div>
        </AnimatePresence>
    )
}

export default App