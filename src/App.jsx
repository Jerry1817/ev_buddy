import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserRegister from "./Pages/UserRegister";
import Home from "./Pages/Home";
import HostRegister from "./Pages/HostRegister";
import Profile from "./Pages/Profile";
import HostChargingSetup from "./Pages/HostChargingSetup";
import HostRequests from "./Pages/HostRequests";
import HostAccepted from "./Pages/HostAccepted";

function App() {

  return (
    <>
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userregister" element={<UserRegister />} />


        {/* 🟩 Navbar കാണേണ്ട എല്ലാ പേജുകൾക്കും Layout wrapper */}
          <Route path="/home" element={<Home />} />
          {/* <Route path="/activity" element={<Activity />} /> */}
          <Route path="/hostregister" element={<HostRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hostcharging" element={<HostChargingSetup />} />
          <Route path="/hostrequest" element={<HostRequests />} />
          <Route path="/hostaccepted " element={<HostAccepted />} />
      </Routes>
   
      </>
  )
}


export default App;