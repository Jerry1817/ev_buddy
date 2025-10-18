import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import UserRegister from './Pages/UserRegister'
import Host1 from './Pages/host1'
import Home from './Pages/Home'
import Activity from './Pages/Activity'
import HostRegister from './Pages/HostRegister'
import Profile from './Pages/Profile'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/host1" element={<HostRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/hostregister" element={<HostRegister />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
