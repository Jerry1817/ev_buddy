// src/Pages/Activity.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function HostAccepted() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Replace destination with real address or lat/lng when available
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=ThunderPlus+EV+Charge+Hub",
      "_blank"
    );
  };

  const handleCall = () => {
    window.location.href = "tel:8075371985";
  };

  return (
    <div className="accepted-container">

      {/* Back Arrow */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ←
      </button>

      {/* Circle Avatar */}
      <div className="circle-avatar">T</div>

      {/* Station Name */}
      <h2 className="station-name">ThunderPlus</h2>
      <h3 className="station-sub">EV Charge Hub</h3>

      {/* Phone Numbers */}
      <p className="phone-number">8075371985</p>
      <p className="phone-number small">8075571985</p>

      {/* Buttons */}
      <button className="navigate-btn" onClick={handleNavigate}>
        Navigate to Host
      </button>

      <button className="call-btn" onClick={handleCall}>
        Call Host
      </button>

      {/* Footer Note */}
      <p className="info-text">
        Host accepted your request — you can navigate or mark arrival when you reach
      </p>

    </div>
  );
}

export default HostAccepted;
