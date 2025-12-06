import React from "react";
import "../components/HostAccepted.css";
import { useNavigate } from "react-router-dom";

export default function HostAccepted() {
  const navigate = useNavigate();

  // Dummy host data (Replace with API response)
  const host = {
    name: "ThunderPlus EV Charge Hub",
    phone: "8075371985",
    altPhone: "8075571985",
  };

  const handleNavigate = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=ThunderPlus+EV+Charge+Hub",
      "_blank"
    );
  };

  const handleCall = () => {
    window.location.href = `tel:${host.phone}`;
  };

  return (
    <div className="ha-container">
      
      {/* Back Arrow */}
      <div className="ha-back">
        <span onClick={() => navigate(-1)}>←</span>
      </div>

      {/* Avatar */}
      <div className="ha-avatar">
        <div className="ha-circle">{host.name[0]}</div>
      </div>

      {/* Host Name */}
      <h2 className="ha-title">{host.name}</h2>
      <div className="ha-phone">{host.phone}</div>
      <div className="ha-phone small">{host.altPhone}</div>

      {/* Buttons */}
      <button className="ha-btn-green" onClick={handleNavigate}>
        Navigate to Host
      </button>

      <button className="ha-btn-light" onClick={handleCall}>
        Call Host
      </button>

      <button className="ha-btn-outline">
        I Have Arrived
      </button>

      {/* Info */}
      <p className="ha-info">
        Host accepted your request — you can navigate or mark arrival when you reach.
      </p>

    </div>
  );
}
