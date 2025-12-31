import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  // Logged in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Stations state
  const [stations, setStations] = useState([]);

  const handleNavigate = () => {
    navigate("/navigation");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Fetch stations from backend
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stations");
        setStations(res.data);
      } catch (err) {
        console.error("Failed to fetch stations");
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

      {/* 🔍 Search + Filter */}
      <div className="px-3">
        <div className="flex items-center bg-white rounded-xl shadow-sm px-3 py-2">
          <IoSearchOutline className="text-gray-400 mr-2 text-lg" />

          <input
            type="text"
            placeholder="Search for location or EV station..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
          />

          <button className="ml-2 p-1.5 rounded-full bg-slate-100 active:scale-95 transition">
            <IoFilterOutline className="text-gray-600 text-xl" />
          </button>
        </div>
      </div>

      {/* 🗺️ Map Placeholder */}
      <div className="flex-1 bg-slate-200 mx-3 mt-3 rounded-xl flex items-center justify-center text-gray-500 text-sm">
        <p>Map area (will show nearby EV Hosts)</p>
      </div>

      {/* 🔋 SWIPEABLE STATION LIST */}
      <div className="mt-4 px-3">
        {stations.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No charging stations available
          </p>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {stations.map((station) => (
              <div
                key={station._id}
                className="min-w-[85%] bg-white p-4 rounded-2xl shadow-md"
              >
                <div className="flex justify-between text-xs mb-2">
                  <span
                    className={`font-medium ${
                      station.status === "Online"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {station.status}
                  </span>
                  <span className="text-blue-500">
                    {station.type}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-slate-900">
                  {station.name}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {station.address}
                </p>

                <div className="flex justify-between mt-2 text-sm text-slate-700">
                  <p>⚡ {station.power}</p>
                  <p>📍 {station.distance}</p>
                </div>

                <p className="text-xs mt-1 text-slate-600">
                  🔌 {station.chargersAvailable} of{" "}
                  {station.totalChargers} chargers
                </p>

                <button
  className="w-full bg-emerald-500 text-white py-2.5 rounded-lg mt-3 font-semibold text-sm hover:bg-emerald-600 active:scale-[0.98] transition"
  onClick={() =>
    navigate(`/station/${station._id}`, { state: station })
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
      <div className="flex justify-around bg-white py-2.5 border-t border-gray-200">
        <button
          className="flex flex-col items-center gap-0.5 text-[13px] text-emerald-500 font-semibold"
          onClick={() => navigate("/home")}
        >
          <IoHomeOutline size={16} />
          <span className="h-1 w-1 rounded-full bg-emerald-500" />
        </button>

        <button
          className="flex flex-col items-center gap-0.5 text-[13px] text-gray-600"
          onClick={handleNavigate}
        >
          <IoListOutline size={16} />
        </button>

        <button
          className="flex flex-col items-center gap-0.5 text-[13px] text-gray-600"
          onClick={() => navigate("/host/login")}
        >
          <IoAddCircleOutline size={16} />
        </button>

        <button
          className="flex flex-col items-center gap-0.5 text-[13px] text-gray-600"
          onClick={() => navigate("/profile")}
        >
          <IoPersonOutline size={16} />
        </button>
      </div>
    </div>
  );
}

export default Home;
