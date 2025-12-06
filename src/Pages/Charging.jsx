import React, { useState, useEffect } from "react";
import "../components/Charging.css";

function Charging() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (s) =>
    `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(
      Math.floor((s % 3600) / 60)
    ).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="charge-container">

      <button className="charge-back">←</button>

      <h2 className="charge-title">Charging Active</h2>

      <div className="charge-timer">{format(seconds)}</div>

      <button className="charge-stop">Stop Charging</button>

      <div className="bottom-nav">
        <button>🏠</button>
        <button>📄</button>
        <button>👤</button>
      </div>
    </div>
  );
}

export default Charging;