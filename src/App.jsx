import { Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./App.css";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserRegister from "./Pages/UserRegister";
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
// import AdminHome from "./Adimin/Pages/Home";
import UserRequests from "./Pages/UserRequests";
import ProtectedRoute from "./components/ProtectedRoute";
import StationDetail from "./Pages/StationDetail"; // ✅ FIXED PATH
import HostLogin from "./Pages/HostLogin";
import Nearbylocation from "./Pages/Nearby";
import Location from "./Pages/Location";
import Home from "./components/Home";
import PaymentSuccess from "./Pages/PaymentSuccess";
import AddReview from "./Pages/Review";
import ComplaintForm from "./Pages/Complaint";
import OTPVerification from "./Pages/Otp";
import AdminDashboard from "./Pages/Admindashboard";

function App() {
  return (
    <Routes>
      {/*  AUTH ROUTES */}
      <Route path="/register" element={<Register />} /> 
      <Route path="/userregister" element={<UserRegister />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/otpverification" element={<OTPVerification/>} />
      <Route path="/" element={<Home />} />
      <Route path="/admindashboard" element={<AdminDashboard/>} />
      
      {/*  USER ROUTES */}
      <Route
        path="/location"
        element={
          <ProtectedRoute>
            <Location />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nearby"
        element={
          <ProtectedRoute>
            <Nearbylocation />
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
       <Route
        path="/complaints"
        element={
          <ProtectedRoute>
            <ComplaintForm/>
          </ProtectedRoute>
        }
      />
      <Route path="/hostlogin" element={<HostLogin />} />
      <Route
        path="/charging/:requestId"
        element={
          <ProtectedRoute>
            <Charging />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment/:requestId"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
        <Route
        path="/paymentsuccess"
        element={
          <ProtectedRoute>
            <PaymentSuccess/>
          </ProtectedRoute>
        }
      />
       <Route
        path="/review/:requestId"
        element={
          <ProtectedRoute>
            <AddReview/>
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

      {/*  STATION DETAIL (NEW – WORKING) */}
      <Route
        path="/station/:id"
        element={
          <ProtectedRoute>
            <StationDetail />
          </ProtectedRoute>
        }
      />

      {/*  HOST ROUTES */}
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

      {/*  INFO PAGES */}
      <Route path="/help" element={<HelpSupport />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/invite" element={<InviteFriends />} />
      {/* <Route path="/edit" element={<Edit />} /> */}

      {/*  ADMIN */}
      {/* <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}

export default App;
