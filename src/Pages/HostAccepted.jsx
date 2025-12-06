import React from "react";
import "../components/HostAccepted.css";

export default function HostAccepted() {
  // Dummy host data (You can replace with props or API data)
  const host = {
    name: "ThunderPlus EV Charge Hub",
    phone: "8075371985",
  };

  return (
    <div className="ha-container">

      {/* Back */}
      <div className="ha-back">
        <span onClick={() => window.history.back()}>←</span>
      </div>

      {/* Avatar */}
      <div className="ha-avatar">
        <div className="ha-circle">{host.name[0]}</div>
      </div>

      {/* Host Name */}
      <h2 className="ha-title">{host.name}</h2>
      <div className="ha-phone">{host.phone}</div>

      {/* Buttons */}
      <button className="ha-btn-green">Navigate to Host</button>
      <button className="ha-btn-light">Call Host</button>
      <button className="ha-btn-outline">I Have Arrived</button>

      {/* Info text */}
      <p className="ha-info">
        Host accepted your request — you can navigate or mark arrival when you reach.
      </p>
    </div>
  );
}