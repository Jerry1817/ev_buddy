import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoArrowBackOutline, 
  IoFlashOutline,
  IoChevronForwardOutline
} from "react-icons/io5";

function HostLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  /*  AUTO LOGIN CHECK */
  useEffect(() => {
    const token = localStorage.getItem("hosttoken") || localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && (role === "host" || role === "HOST")) {
      navigate("/host/dashboard"); // auto redirect to dashboard
    }
  }, [navigate]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔐 LOGIN API
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      
      const { token, role, user } = res.data;

      // If not host
      if (role !== "HOST") {
        toast.error("This account is not registered as a host");
        setLoading(false);
        return;
      }

      localStorage.setItem("hosttoken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("host", JSON.stringify(user));

      toast.success(`Welcome back, ${user.name}! ⚡`);
      
      // Navigate to host dashboard
      setTimeout(() => navigate("/host/dashboard"), 1000);
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Login failed";
      
      if (error.response?.data?.blocked) {
        toast.error(errorMessage, { duration: 5000, icon: '🚫' });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-[Poppins] relative overflow-hidden bg-slate-50">
      <Toaster position="top-center" />
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_#d1fae5_0%,_transparent_40%)] opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_#ecfdf5_0%,_transparent_40%)] opacity-70"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl"></div>
      </div>

      {/* Header / Back Navigation */}
      <div className="relative z-10 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <button 
          onClick={() => navigate("/")}
          className="w-11 h-11 bg-white shadow-md rounded-2xl flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:scale-105 transition-all duration-300 border border-emerald-50"
        >
          <IoArrowBackOutline className="text-xl" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <IoFlashOutline className="text-white text-xl" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">EV Buddy <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-4 font-extrabold uppercase text-[10px] ml-1">Host</span></span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 relative z-10 -mt-10">
        <div className="w-full max-w-[420px]">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(16,185,129,0.1)] border border-white/50 relative overflow-hidden">
            {/* Glass decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
            
            <div className="text-center mb-10 relative">
              <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-3">
                Welcome Back
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Manage your charging stations and track your earnings
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5 font-[Inter]">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-emerald-600 transition-colors text-slate-400">
                    <IoMailOutline className="text-xl" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="host@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all duration-300 font-medium placeholder:text-slate-400"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 font-[Inter]">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-emerald-600 transition-colors text-slate-400">
                    <IoLockClosedOutline className="text-xl" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all duration-300 font-medium placeholder:text-slate-400"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <IoChevronForwardOutline className="text-xl" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-50 text-center">
              <p className="text-sm text-slate-500 font-medium">
                New to EV Buddy Host?{" "}
                <button
                  onClick={() => navigate("/hostregister")}
                  className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors ml-1"
                >
                  Register Station
                </button>
              </p>
            </div>
          </div>
          
          <p className="text-center mt-8 text-xs text-slate-400 font-medium">
            Protected by EV Buddy Security Protocol • 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default HostLogin;
