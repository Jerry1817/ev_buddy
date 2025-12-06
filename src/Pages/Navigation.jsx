import React from "react";
import "../components/Navigation.css";

function Navigation() {
  const address = encodeURIComponent("431146-A,B,C Pattarkulam, Manjeri");

  const openMaps = () => {
    window.open(
      https//www.google.com/maps/dir/?api=1&destination=${address},"_blank"
    );
  };

  return (
    <div className="nav-container">

      <button className="nav-back">←</button>

      <h2 className="nav-title-top">Navigation</h2>

      <div className="nav-card">
        <h3 className="nav-host">ThunderPlus EV Charge Hub</h3>

        <p className="nav-address">
          431146-A,B,C,Pattarkulam,<br />Manjeri
        </p>

        <div className="nav-meta">
          <span>📍 9.4 km</span>
          <span>•</span>
          <span>17 mins</span>
        </div>
      </div>

      <button className="nav-btn" onClick={openMaps}>
        Open Google Maps
      </button>

      <div className="bottom-nav">
        <button>🏠</button>
        <button>📄</button>
        <button>👤</button>
      </div>
    </div>
  );
}

export default Navigation;