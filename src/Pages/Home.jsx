import React, { useEffect, useState } from "react";
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

  const user = JSON.parse(localStorage.getItem("user"));
  const [stations, setStations] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // ✅ Fetch stations from DB
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/stations/all"
        );
        setStations(res.data);
      } catch (err) {
        console.error("Failed to fetch stations", err);
      }
    };

    fetchStations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 font-[Poppins] pt-16 pb-16">

      {/* 👋 Welcome + Logout */}
      <div className="flex justify-between items-center px-4 mb-2">
        <h2 className="text-sm font-semibold text-slate-800">
          Welcome, {user?.name} 👋
        </h2>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-red-500 font-medium"
        >
          <IoLogOutOutline />
          Logout
        </button>
      </div>

      {/* 🔍 Search */}
      <div className="px-3">
        <div className="flex items-center bg-white rounded-xl shadow-sm px-3 py-2">
          <IoSearchOutline className="text-gray-400 mr-2 text-lg" />
          <input
            type="text"
            placeholder="Search for location or EV station..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button className="ml-2 p-1.5 rounded-full bg-slate-100">
            <IoFilterOutline className="text-gray-600 text-xl" />
          </button>
        </div>
      </div>

      {/* 🗺️ OPEN STREET MAP */}
      <div className="mx-3 mt-3 rounded-xl overflow-hidden">
        <HomeMap />
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
                className="min-w-[85%] bg-white p-4 rounded-2xl shadow-md"
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

      {/* 🌐 Bottom Nav */}
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

        <button onClick={() => navigate("/host/login")}>
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
