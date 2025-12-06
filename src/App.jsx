import { Route, Routes } from 'react-router-dom'
import './App.css'

import Login from './Pages/Login'
import Register from './Pages/Register'
import UserRegister from './Pages/UserRegister'
import Home from './Pages/Home'
import HostRegister from './Pages/HostRegister'
import Profile from './Pages/Profile'
import HostChargingSetup from './Pages/HostChargingSetup'
import HelpSupport from './Pages/Help'
import PrivacyPolicy from './Pages/Privacy'
import InviteFriends from './Pages/Invite'
import Edit from './Pages/Edit'
import HostAccepted  from './Pages/HostAccepted'
import Navigation from './Pages/Navigation'
import Charging from './Pages/Charging'
import Payment from './Pages/Payment'







function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/host1" element={<HostRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hostregister" element={<HostRegister />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/HostCharging" element={<HostChargingSetup/>} />
        <Route path="/Help" element={<HelpSupport/>} />
        <Route path="/Privacy" element={<PrivacyPolicy/>} />
        <Route path="/Invite" element={<InviteFriends/>} />
        <Route path="/Edit" element={<Edit/>} />
        <Route path="/HostAccepted" element={<HostAccepted/>} />
        <Route path="/Navigation" element={<Navigation/>} />
        <Route path="/Charging" element={<Charging/>} />
        <Route path="/Payment" element={<Payment/>} />
      </Routes>
    </>
  )
}

export default App
