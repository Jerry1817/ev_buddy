import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for location or EV station..."
          className="search-input"
        />
      </div>

      {/* 🗺️ Map Placeholder */}
      <div className="map-placeholder">
        <p>Map area (will show nearby EV Hosts)</p>
      </div>

      {/* 🔋 Station Details Card */}
      <div className="station-card">
        <div className="status-row">
          <span className="status offline">Offline</span>
          <span className="type">Public</span>
        </div>

        <h3>ThunderPlus EV Charge Hub</h3>
        <p className="address">43/146-A,B,C Pattarkulam, Manjeri</p>

        <div className="details-row">
          <p>⚡ 15.0 kW</p>
          <p>📍 9.49 km</p>
          <p>🔌 0 of 1 chargers available</p>
        </div>

        <button className="request-btn">Send Request</button>
      </div>

      {/* 🌐 Bottom Navigation */}
      <div className="bottom-nav">
        <button className="nav-btn active" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="nav-btn" onClick={() => navigate("/activity")}>
          Activity
        </button>
        <button className="nav-btn" onClick={() => navigate("/hostregister")}>
          Host
        </button>
        <button className="nav-btn" onClick={() => navigate("/profile")}>
          Profile
        </button>
      </div>
    </div>
  );
}

export default Home;
