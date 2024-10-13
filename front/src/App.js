import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Homepage from './pages/Home'
import LoginUser from './pages/user/LoginUser'
import RegisterEmailUser from './pages/user/RegisterEmailUser'
import RegisterPassword from './pages/user/RegisterPassword'
import LoginCoop from './pages/cooperative/Login'
import DashboardCoop from './pages/cooperative/Dashboard'
import BusCoop from './pages/cooperative/Bus'
import About from './pages/user/About'
import UseConditions from './pages/user/UseConditions'
import DriverCoop from './pages/cooperative/Driver'
import AddBus from './pages/cooperative/AddBus'
import AddDriver from './pages/cooperative/AddDriver'
import DetailTrip from './pages/user/DetailTrip'
import ListTrip from './pages/user/ListTrip'
import LoginAdmin from './pages/admin/Login'
import DashboardAdmin from './pages/admin/Dashboard'
import InfoCoop from './pages/cooperative/InfoCoop'
import TripCoop from './pages/cooperative/Trip'
import ListBook from './pages/cooperative/ListBook'

function App() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    window.addEventListener('beforeunload', handleStart)
    window.addEventListener('load', handleComplete)

    return () => {
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('load', handleComplete)
    }
  }, [])

  return (
    <>
      {loading}
      <AnimatePresence>
        <body className='min-h-screen'>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/trip" element={<ListTrip />} />
              <Route path="/login" element={<LoginUser />} />
              <Route path="/register-email" element={<RegisterEmailUser />} />
              <Route path="/register-password" element={<RegisterPassword />} />
              <Route path="/admin-coop-login" element={<LoginCoop />} />
              <Route path="/about" element={<About />} />
              <Route path="/detail-trip" element={<DetailTrip />} />
              <Route path="/conditions-of-use" element={<UseConditions />} />
              <Route path="/dashboard-coop" element={<DashboardCoop />} />
              <Route path="/bus-coop" element={<BusCoop />} />
              <Route path="/driver-coop" element={<DriverCoop />} />
              <Route path="/add-bus" element={<AddBus />} />
              <Route path="/add-driver" element={<AddDriver />} />
              <Route path="/login-admin" element={<LoginAdmin />} />
              <Route path="/dashboard-admin" element={<DashboardAdmin />} />
              <Route path="/info-coop" element={<InfoCoop />} />
              <Route path="/trip-coop" element={<TripCoop />} />
              <Route path="/list-book" element={<ListBook />} />
            </Routes>
          </BrowserRouter>
        </body>
      </AnimatePresence>
    </>
  )
}

export default App
