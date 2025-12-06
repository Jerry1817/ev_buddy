import { Routes, Route } from 'react-router-dom'
import './App.css'

import Login from './Pages/Login'
import Register from './Pages/Register'
import UserRegister from './Pages/UserRegister'
import Home from './Pages/Home'
import HostRegister from './Pages/HostRegister'
import Profile from './Pages/Profile'
import HostChargingSetup from './Pages/HostChargingSetup'
import HostRequests from './Pages/HostRequests'
import HostAccepted from './Pages/HostAccepted'

import HelpSupport from './Pages/Help'
import PrivacyPolicy from './Pages/Privacy'
import InviteFriends from './Pages/Invite'
import Edit from './Pages/Edit'
import Navigation from './Pages/Navigation'
import Charging from './Pages/Charging'
import Payment from './Pages/Payment'

function App() {
  return (
    <>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userregister" element={<UserRegister />} />

        {/* Main Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/hostregister" element={<HostRegister />} />
        <Route path="/profile" element={<Profile />} />

        {/* Host Related */}
        <Route path="/hostcharging" element={<HostChargingSetup />} />
        <Route path="/hostrequest" element={<HostRequests />} />
        <Route path="/hostaccepted" element={<HostAccepted />} />

        {/* Additional Pages */}
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/invite" element={<InviteFriends />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/charging" element={<Charging />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  )
}

export default App
