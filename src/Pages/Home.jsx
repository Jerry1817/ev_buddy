import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Home.css"; // നിങ്ങളുടെ സ്റ്റൈലുകൾ
// React Icons-ൽ നിന്ന് ആവശ്യമായ ഐക്കണുകൾ ഇമ്പോർട്ട് ചെയ്യുന്നു
import {
  IoHomeOutline,
  IoListOutline,
  IoAddCircleOutline,
  IoPersonOutline,
  IoFilterOutline, // ഫിൽട്ടർ ബട്ടണിനായുള്ള ഐക്കൺ
  IoSearchOutline, // സെർച്ച് ബാറിനായുള്ള ഐക്കൺ
} from "react-icons/io5";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* 🔍 Search Bar and Filter Button */}
      <div className="search-and-filter-bar">
        {/* സെർച്ച് ഐക്കൺ ചേർക്കുന്നു */}
        <IoSearchOutline className="search-icon" /> 
        <input
          type="text"
          placeholder="Search for location or EV station..."
          className="search-input"
        />
        
        <button className="filter-btn">
          <IoFilterOutline className="filter-icon" size={24} />
        </button>
      </div>

      {/* 🗺️ Map Placeholder */}
      <div className="map-placeholder">
        <p>Map area (will show nearby EV Hosts)</p>
      </div>

      {/* 🔋 Station Details Card */}
      <div className="station-card">
        <div className="status-row">
          {/* സ്റ്റാറ്റസ് മാറ്റങ്ങൾ ഉണ്ടെങ്കിൽ അത് പ്രകടിപ്പിക്കാൻ ഒരു ക്ലാസ് ചേർക്കാം */}
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
        <button className="request-btn" onClick={() => navigate("/HostCharging")} >Send Request</button>
      </div>

      {/* 🌐 Bottom Navigation - ഐക്കണുകൾ ഉപയോഗിച്ച് പരിഷ്കരിച്ചത് */}
      <div className="bottom-nav">
        <button className="nav-btn active" onClick={() => navigate("/")}>
          <IoHomeOutline size={12} />
          <span></span>
        </button>
        <button className="nav-btn" onClick={() => navigate("/hostaccepted")}>
          <IoListOutline size={12} />
          <span></span>
        </button>
        <button className="nav-btn" onClick={() => navigate("/hostregister")}>
          <IoAddCircleOutline size={12} />
          <span></span>
        </button>
        <button className="nav-btn" onClick={() => navigate("/profile")}>
          <IoPersonOutline size={12} />
          <span></span>
        </button>
      </div>
    </div>
  );
}

export default Home;