import React, { useState } from "react";
import "../components/Login.css";  
import { FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import logo from "../assets/logo.jpg";  // ✅ make sure logo.jpg is inside src/assets/

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked with:", email, password);
  };

  return (
    <div className="login-container">
      {/* ✅ Logo Section */}
      <div className="logo-section">
        <img src={logo} alt="EV Buddy Logo" className="logo" />
        <h2>EV Buddy</h2>
        <p>Your next charge is just a click away ⚡</p>
      </div>

      {/* ✅ Login Form Section */}
      <div className="login-form">
        <h3 className="welcome-text">Welcome Back!</h3>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaPhone className="icon" />
          <input type="text" placeholder="Enter your Mobile Number" />
        </div>

        <button  className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="signup-text">
          Don’t have an account? <a href="/UserRegister">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
