
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import UserRegister from './Pages/UserRegister'
import HostRegister from './Pages/HostRegister'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/hostregister" element={<HostRegister />} />

      </Routes>
    </>
  )
}

export default App
