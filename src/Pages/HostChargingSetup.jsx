import React from "react";
import { IoCallOutline, IoNavigateOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import "../components/HostChargingSetup.css";

const HostChargingSetup = () => {
  const handleConfirm = () => {
    toast.success("Charging request confirmed ✅");
  };

  return (
    <div className="host-container">
      {/* ⬅ Header */}
      <div className="host-header">
        <button className="back-btn">←</button>
      </div>

      {/* 🖼 Image Section */}
      <div className="station-image">
        <img
          src="https://via.placeholder.com/400x200.png?text=Charging+Station"
          alt="Charging Station"
        />
      </div>

      {/* 📍 Station Info */}
      <div className="station-info">
        <h2>AIMA Charging Station</h2>
        <p>Karinganad, Chanthappadi, Near Vilayur Panchayath Office</p>
      </div>

      {/* 📞 Call & Navigate Buttons */}
      <div className="action-buttons">
        <button className="circle-btn">
          <IoCallOutline size={22} />
        </button>
        <button className="circle-btn">
          <IoNavigateOutline size={22} />
        </button>
      </div>

      {/* 📊 Station Stats */}
      <div className="station-stats">
        <div className="stat-item">
          <IoNavigateOutline size={20} />
          <div>
            <p className="stat-label">Distance</p>
            <p className="stat-value">6.33 km</p>
          </div>
        </div>
        <div className="stat-item">
          <span className="clock-icon">⏱</span>
          <div>
            <p className="stat-label">Last used</p>
            <p className="stat-value">11 hr 47 min ago</p>
          </div>
        </div>
        <div className="stat-item">
          <span className="check-icon">✅</span>
          <div>
            <p className="stat-label">Success Rate</p>
            <p className="stat-value">NA</p>
          </div>
        </div>
      </div>

      {/* ⚙ Charger Info */}
      <div className="charger-section">
        <h3>Chargers</h3>
        <div className="charger-card">
          <div className="charger-icon">🔌</div>
          <div className="charger-details">
            <p className="charger-type">Type 2</p>
            <p className="charger-power">7.0 KW AC</p>
            <p className="charger-rate">₹20.0 / kWh</p>
          </div>
          <span className="status-badge">Available</span>
        </div>
      </div>

      {/* ✅ Confirm Request Button */}
      <div className="confirm-section">
        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm send  Request
        </button>
      </div>
    </div>
  );
};

export default HostChargingSetup;