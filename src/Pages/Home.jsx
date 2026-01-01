import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeMap from "../components/HomeMap";

import {
  IoHomeOutline,
  IoListOutline,
  IoAddCircleOutline,
  IoPersonOutline,
  IoFilterOutline,
  IoSearchOutline,
  IoLogOutOutline,
} from "react-icons/io5";

function Home() {
  const navigate = useNavigate();

  // Logged user
  const user = JSON.parse(localStorage.getItem("user"));

  // Stations from DB
  const [stations, setStations] = useState([]);

  // Selected station (map ↔ card sync)
  const [selectedStationId, setSelectedStationId] = useState(null);

  // Card refs (for auto scroll later)
  const cardRefs = useRef({});

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  /* =========================
     FETCH STATIONS FROM DB
  ========================= */
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/stations"
        );
        setStations(res.data);
      } catch (err) {
        console.error("Failed to fetch stations", err);
      }
    };

    fetchStations();
  }, []);

  /* =========================
     WHEN MAP MARKER CLICKED
  ========================= */
  const handleMarkerSelect = (stationId) => {
    setSelectedStationId(stationId);

    // Scroll selected card into view
    const card = cardRefs.current[stationId];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-[Poppins] pt-16 pb-16">

      {/* 👋 HEADER */}
      <div className="flex justify-between items-center px-4 mb-2">
        <h2 className="text-sm font-semibold text-slate-800">
          Welcome, {user?.name || "User"} 👋
        </h2>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-red-500 font-medium"
        >
          <IoLogOutOutline />
          Logout
        </button>
      </div>

      {/* 🔍 SEARCH */}
      <div className="px-3">
        <div className="flex items-center bg-white rounded-xl shadow-sm px-3 py-2">
          <IoSearchOutline className="text-gray-400 mr-2 text-lg" />
          <input
            type="text"
            placeholder="Search EV stations..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button className="ml-2 p-1.5 rounded-full bg-slate-100">
            <IoFilterOutline className="text-gray-600 text-xl" />
          </button>
        </div>
      </div>

      {/* 🗺️ OPEN STREET MAP */}
      <div className="mx-3 mt-3 rounded-xl overflow-hidden h-[45vh]">
        <HomeMap
          stations={stations}
          selectedStationId={selectedStationId}
          onMarkerSelect={handleMarkerSelect}
        />
      </div>

      {/* 🔋 STATION LIST */}
      <div className="mt-4 px-3">
        {stations.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No charging stations available
          </p>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {stations.map((station) => (
              <div
                key={station._id}
                ref={(el) =>
                  (cardRefs.current[station._id] = el)
                }
                className={`min-w-[85%] p-4 rounded-2xl shadow-md transition-all
                  ${
                    selectedStationId === station._id
                      ? "border-2 border-emerald-500 bg-emerald-50"
                      : "bg-white"
                  }`}
              >
                <h3 className="text-base font-semibold">
                  {station.stationName}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {station.address}
                </p>

                <div className="flex justify-between mt-2 text-sm">
                  <p>⚡ {station.power} kW</p>
                  <p>🔌 {station.totalChargers} ports</p>
                </div>

                <p className="text-xs mt-1 text-slate-600">
                  💰 ₹{station.rate}/kW
                </p>

                <button
                  className="w-full bg-emerald-500 text-white py-2.5 rounded-lg mt-3 font-semibold"
                  onClick={() =>
                    navigate(`/station/${station._id}`, {
                      state: station,
                    })
                  }
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🌐 BOTTOM NAV */}
      <div className="flex justify-around bg-white py-2.5 border-t">
        <button
          className="text-emerald-500"
          onClick={() => navigate("/home")}
        >
          <IoHomeOutline />
        </button>

        <button onClick={() => navigate("/navigation")}>
          <IoListOutline />
        </button>

     <button
  onClick={() => {
    localStorage.removeItem("hostToken");
    localStorage.removeItem("role");
    navigate("/host/login");
  }}
>
  <IoAddCircleOutline />
</button>


        <button onClick={() => navigate("/profile")}>
          <IoPersonOutline />
        </button>
      </div>
    </div>
  );
}

export default Home;
