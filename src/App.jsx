import { Routes, Route } from "react-router-dom";
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
import HelpSupport from "./Pages/Help";
import PrivacyPolicy from "./Pages/Privacy";
import InviteFriends from "./Pages/Invite";
import Edit from "./Pages/Edit";
import Navigation from "./Pages/Navigation";
import Charging from "./Pages/Charging";
import Payment from "./Pages/Payment";
import AdminHome from "./Adimin/Pages/Home";
import UserRequests from "./Pages/UserRequests";
import ProtectedRoute from "./components/ProtectedRoute";
import StationDetail from "./Pages/StationDetail"; // ✅ FIXED PATH
import HostLogin from "./Pages/HostLogin";
function App() {
  return (
    <Routes>
      {/* 🔓 AUTH ROUTES */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userregister" element={<UserRegister />} />

      {/* 🔐 USER ROUTES */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
  path="/myrequests"
  element={
    <ProtectedRoute>
      <UserRequests />
    </ProtectedRoute>
  }
/>
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/hostlogin" element={<HostLogin />} />
      <Route
        path="/charging"
        element={
          <ProtectedRoute>
            <Charging />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/navigation"
        element={
          <ProtectedRoute>
            <Navigation />
          </ProtectedRoute>
        }
      />

      {/* 🔋 STATION DETAIL (NEW – WORKING) */}
      <Route
        path="/station/:id"
        element={
          <ProtectedRoute>
            <StationDetail />
          </ProtectedRoute>
        }
      />

      {/* 🔐 HOST ROUTES */}
      <Route
        path="/hostregister"
        element={
          <ProtectedRoute>
            <HostRegister />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hostcharging"
        element={
          <ProtectedRoute>
            <HostChargingSetup />
          </ProtectedRoute>
        }
      />

          <Route path="/host/login" element={<HostLogin />} />

      <Route
        path="/hostrequests"
        element={
          <ProtectedRoute>
            <HostRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hostaccepted"
        element={
          <ProtectedRoute>
            <HostAccepted />
          </ProtectedRoute>
        }
      />

      {/* 🔓 INFO PAGES */}
      <Route path="/help" element={<HelpSupport />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/invite" element={<InviteFriends />} />
      <Route path="/edit" element={<Edit />} />

      {/* 🔐 ADMIN */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
