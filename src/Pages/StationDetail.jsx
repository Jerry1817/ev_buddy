import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios";

function StationDetail() {
  const navigate = useNavigate();
  const { state: station } = useLocation();

  // 🛡 Safety check
  if (!station) {
    return (
      <div className="p-4">
        <p>Station data not found.</p>
        <button
          className="mt-3 text-blue-600 underline"
          onClick={() => navigate("/home")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleSendRequest = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      navigate("/");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/charging-request/send", // ✅ CORRECT
      {
        stationId: station._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Charging request sent successfully ⚡");
    navigate("/home");
  } catch (error) {
    console.error("Send request error:", error.response?.data || error);
    alert(
      error.response?.data?.message ||
        "Failed to send request. Please try again."
    );
  }
};


  return (
    <div className="min-h-screen bg-slate-50 p-4 font-[Poppins]">
      {/* 🔙 Back */}
      <button
        className="flex items-center gap-2 text-sm text-gray-600 mb-4"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackOutline />
        Back
      </button>

      {/* 🏷 Station Card */}
      <div className="bg-white rounded-2xl shadow-md p-5">
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
          <span className="text-blue-500">{station.type}</span>
        </div>

        <h2 className="text-xl font-semibold text-slate-900">
          {station.name}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {station.address}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-slate-700">
          <div>⚡ Power: {station.power}</div>
          <div>📍 Distance: {station.distance}</div>
          <div>
            🔌 Chargers: {station.chargersAvailable} /{" "}
            {station.totalChargers}
          </div>
          <div>🏷 Type: {station.type}</div>
        </div>

        {/* 🔘 SEND REQUEST BUTTON */}
        <button
          className="w-full bg-emerald-500 text-white py-3 rounded-xl mt-6 font-semibold hover:bg-emerald-600 transition"
          onClick={handleSendRequest}
        >
          Send Charging Request
        </button>
      </div>
    </div>
  );
}

export default StationDetail;
