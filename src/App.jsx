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
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import UserLayout from "./components/UserLayout";
import StationDetail from "./Pages/StationDetail"; // ✅ FIXED PATH
import HostLogin from "./Pages/HostLogin";
import AdminLogin from "./Pages/AdminLogin";
import Nearbylocation from "./Pages/Nearby";
import Location from "./Pages/Location";
import Home from "./components/Home";
import PaymentSuccess from "./Pages/PaymentSuccess";
import AddReview from "./Pages/Review";
import ComplaintForm from "./Pages/Complaint";
import OTPVerification from "./Pages/Otp";
import AdminDashboard from "./Pages/Admindashboard";
import HostReviews from "./Pages/HostReviews";
import HostLayout from "./components/HostLayout";
import HostDashboard from "./Pages/HostDashboard";
import HostEarnings from "./Pages/HostEarnings";
import TransactionHistory from "./Pages/TransactionHistory";

function App() {
  return (
    <Routes>
      {/*  AUTH ROUTES */}
      {/* <Route path="/register" element={<Register />} />  */}
      <Route path="/userregister" element={<UserRegister />} />
      <Route path="/otpverification" element={<OTPVerification/>} />
      <Route path="/" element={<Home />} />
      <Route path="/admindashboard" element={<AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/host/login" element={<HostLogin />} />
      <Route path="/Login" element={<Login />} />


      {/*  USER ROUTES - With Header */}
      <Route
        path="/location"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Location />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/nearby"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Nearbylocation />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/myrequests"
        element={
          <ProtectedRoute>
            <UserLayout>
              <UserRequests />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Profile />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <UserLayout>
              <TransactionHistory />
            </UserLayout>
          </ProtectedRoute>
        }
      />
       <Route
        path="/complaints"
        element={
          <ProtectedRoute>
            <UserLayout>
              <ComplaintForm/>
            </UserLayout>
          </ProtectedRoute>
        }
      />
      {/* <Route path="/hostlogin" element={<HostLogin />} /> */}
      <Route
        path="/charging/:requestId"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Charging />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* Payment page - NO Header as requested by user */}
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
            <UserLayout>
              <PaymentSuccess/>
            </UserLayout>
          </ProtectedRoute>
        }
      />
       <Route
        path="/review/:requestId"
        element={
          <ProtectedRoute>
            <UserLayout>
              <AddReview/>
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/navigation"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Navigation />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/*  STATION DETAIL (NEW – WORKING) */}
      <Route
        path="/station/:id"
        element={
          <ProtectedRoute>
            <UserLayout>
              <StationDetail />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/*  HOST ROUTES */}
      <Route
        path="/hostregister"
        element={<HostRegister />}
      />

      <Route
        path="/hostcharging"
        element={
          <ProtectedRoute>
            <HostChargingSetup />
          </ProtectedRoute>
        }
      />


      {/* Host Dashboard with Sidebar */}
      <Route
        path="/host/dashboard"
        element={
          <ProtectedRoute>
            <HostLayout>
              <HostDashboard />
            </HostLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/hostrequests"
        element={
          <ProtectedRoute>
            <HostLayout>
              <HostRequests />
            </HostLayout>
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

      <Route
        path="/hostreviews"
        element={
          <ProtectedRoute>
            <HostLayout>
              <HostReviews />
            </HostLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/host/earnings"
        element={
          <ProtectedRoute>
            <HostLayout>
              <HostEarnings />
            </HostLayout>
          </ProtectedRoute>
        }
      />

      {/*  INFO PAGES - With Header */}
      <Route path="/help" element={<UserLayout><HelpSupport /></UserLayout>} />
      <Route path="/privacy" element={<UserLayout><PrivacyPolicy /></UserLayout>} />
      <Route path="/invite" element={<UserLayout><InviteFriends /></UserLayout>} />
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
