import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IoHomeOutline,
  IoListOutline,
  IoAddCircleOutline,
  IoPersonOutline,
  IoFilterOutline,
  IoSearchOutline,
} from "react-icons/io5";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/navigation");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 font-[Poppins] pt-16 pb-16">
      {/* 🔍 Search + Filter */}
      <div className="px-3">
        <div className="flex items-center bg-white rounded-xl shadow-sm px-3 py-2">
          {/* Search icon */}
          <IoSearchOutline className="text-gray-400 mr-2 text-lg" />

          <input
            type="text"
            placeholder="Search for location or EV station..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
          />

          {/* Filter button */}
          <button className="ml-2 p-1.5 rounded-full bg-slate-100 active:scale-95 transition">
            <IoFilterOutline className="text-gray-600 text-xl" />
          </button>
        </div>
      </div>

      {/* 🗺️ Map Placeholder */}
      <div className="flex-1 bg-slate-200 mx-3 mt-3 rounded-xl flex items-center justify-center text-gray-500 text-sm">
        <p>Map area (will show nearby EV Hosts)</p>
      </div>

      {/* 🔋 Station Card */}
      <div className="bg-white mx-3 my-3 p-4 rounded-2xl shadow-md">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-red-500 font-medium">Offline</span>
          <span className="text-blue-500">Public</span>
        </div>

        <h3 className="text-base font-semibold text-slate-900">
          ThunderPlus EV Charge Hub
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          43/146-A,B,C Pattarkulam, Manjeri
        </p>

        <div className="flex justify-between mt-2 text-sm text-slate-700">
          <p>⚡ 15.0 kW</p>
          <p>📍 9.49 km</p>
          <p>🔌 0 of 1 chargers available</p>
        </div>

        <button
          className="w-full bg-emerald-500 text-white border-none py-2.5 rounded-lg mt-3 cursor-pointer font-semibold text-sm hover:bg-emerald-600 active:scale-[0.98] transition"
          onClick={() => navigate("/HostCharging")}
        >
          Send Request
        </button>
      </div>

      {/* 🌐 Bottom Nav */}
      <div className="flex justify-around bg-white py-2.5 border-t border-gray-200">
        <button
          className="flex flex-col items-center gap-0.5 text-[13px] text-emerald-500 font-semibold"
          onClick={() => navigate("/")}
        >
          <IoHomeOutline size={16} />
          <span className="h-1 w-1 rounded-full bg-emerald-500" />
        </button>

        <button
          className="flex flex-col items-center gap-0.5 text-[13px] text-gray-600"
          onClick={handleNavigate}
        >
          <IoListOutline size={16} />
          <span className="h-1 w-1 rounded-full" />
        </button>

        <button
          className="flex flex-col items-center gap-0.5 text-[13px] text-gray-600"
          onClick={() => navigate("/hostregister")}
        >
          <IoAddCircleOutline size={16} />
          <span className="h-1 w-1 rounded-full" />
        </button>

        <button
          className="flex flex-col items-center gap-0.5 text-[13px] text-gray-600"
          onClick={() => navigate("/profile")}
        >
          <IoPersonOutline size={16} />
          <span className="h-1 w-1 rounded-full" />
        </button>
      </div>
    </div>
  );
}

export default Home;
