import React, { useState } from "react";
import { FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );
    if(res.data.success){
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    }
    // localStorage.setItem("user", JSON.stringify(res.data.user))
  } catch (err) {
    console.log(err)
    setError("Invalid email or password");
  }
};

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-[Poppins,sans-serif] px-4">
      {/* Logo Section */}
      <div className="text-center mb-6">
        <img
          src={logo}
          alt="EV Buddy Logo"
          className="w-20 h-20 rounded-full mx-auto object-cover"
        />
        <h2 className="mt-3 mb-1 text-xl font-semibold text-[#003366]">
          EV Buddy
        </h2>
        <p className="text-sm text-gray-500">
          Your next charge is just a click away ⚡
        </p>
      </div>

      {/* Card / Form */}
      <div className="bg-[#f9f9f9] px-6 py-6 rounded-xl shadow-md w-full max-w-xs">
        <h3 className="text-lg font-semibold text-[#1b2e4b] text-center mb-5">
          Welcome Back!
        </h3>

        {/* ❌ Error message */}
        {error && (
          <p className="text-red-600 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-3">
          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
            <FaEnvelope className="text-gray-600 mr-2" />
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
            <FaLock className="text-gray-600 mr-2" />
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              required
            />
          </div>

          {/* Phone (UI only – backend use illa now) */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
            <FaPhone className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Enter your Mobile Number"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 bg-emerald-600 text-white font-bold rounded-md cursor-pointer transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        {/* Signup text */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a
            href="/UserRegister"
            className="text-emerald-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
