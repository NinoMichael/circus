import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence} from 'framer-motion'

import Homepage from './pages/Home'
import LoginUser from './pages/user/LoginUser'
import RegisterEmailUser from './pages/user/RegisterEmailUser'
import RegisterPassword from './pages/user/RegisterPassword'
import LoginCoop from './pages/cooperative/Login'
import DashboardCoop from './pages/cooperative/Dashboard'
import BusCoop from './pages/cooperative/Bus';
import About from './pages/user/About';

function App() {
  const [loading, setLoading] = useState(false);

        useEffect(() => {
          const handleStart = () => setLoading(true);
          const handleComplete = () => setLoading(false);

          window.addEventListener('beforeunload', handleStart);
          window.addEventListener('load', handleComplete);

        return () => {
            window.removeEventListener('beforeunload', handleStart);
            window.removeEventListener('load', handleComplete);
          };
        }, [])

  return (
    <>
    { loading }
        <AnimatePresence>
          <body className='min-h-screen'>
            <BrowserRouter>
              <Routes>
                  <Route exact path = "/" element = {<Homepage />} />
                  <Route path = "/login" element = {<LoginUser />} />
                  <Route path = "/register-email" element = {<RegisterEmailUser />} />
                  <Route path = "/register-password" element = {<RegisterPassword />} />
                  <Route path = "/admin-coop-login" element = {<LoginCoop />} />
                  <Route path = "/about-us" element = {<About />} />
                  <Route path = "/dashboard-coop" element = {<DashboardCoop />} />
                  <Route path = "/bus-coop" element = {<BusCoop />} />
              </Routes>
            </BrowserRouter>
          </body>
        </AnimatePresence>
    </>
  );
}

export default App;
