import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoHomeOutline,
  IoListOutline,
  IoAddCircleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import "./NavigationBar.css"; // CSS next step-il

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // show back button if not on home
  const showBack = location.pathname !== "/home";

  return (
    <div className="nav-bar">
      {/* 🔙 Back Button */}
      {showBack && (
        <button
          className="back-btn"
          onClick={() => navigate(-1)} // goes to previous page
        >
          <IoArrowBackOutline size={20} />
        </button>
      )}

      {/* 🌐 Center logo/title */}
      <h3 className="nav-title">EV Buddy</h3>

      {/* 🌟 Bottom icons - always visible */}
      <div className="bottom-icons">
        <button
          className={`nav-icon ${location.pathname === "/home" ? "active" : ""}`}
          onClick={() => navigate("/home")}
        >
          <IoHomeOutline size={18} />
        </button>
        <button
          className={`nav-icon ${location.pathname === "/activity" ? "active" : ""}`}
          onClick={() => navigate("/activity")}
        >
          <IoListOutline size={18} />
        </button>
        <button
          className={`nav-icon ${location.pathname === "/hostregister" ? "active" : ""}`}
          onClick={() => navigate("/hostregister")}
        >
          <IoAddCircleOutline size={18} />
        </button>
        <button
          className={`nav-icon ${location.pathname === "/profile" ? "active" : ""}`}
          onClick={() => navigate("/profile")}
        >
          <IoPersonOutline size={18} />
        </button>
      </div>
    </div>
  );
}

export default NavigationBar;
