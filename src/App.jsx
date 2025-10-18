
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import UserRegister from './Pages/UserRegister'
import HostRegister from './Pages/HostRegister'
import Profile from './Pages/Profile'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/hostregister" element={<HostRegister />} />
        <Route path="/profile" element={<Profile />} />
        
      
      </Routes>
    </>
  )
}

export default App
