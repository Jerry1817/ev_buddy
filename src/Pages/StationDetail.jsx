import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackOutline, IoLocationOutline } from "react-icons/io5";
import api from "../utils/api";
import toast from "react-hot-toast";

function StationDetail() {
  const navigate = useNavigate();
  const { state: station } = useLocation();

  // Safety check
  if (!station) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <p className="text-slate-600 mb-4">Station data not found.</p>
          <button
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold"
            onClick={() => navigate("/location")}
          >
            Go Back to Stations
          </button>
        </div>
      </div>
    );
  }

  const handleSendRequest = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("Please login again");
        navigate("/");
        return;
      }

      const response = await api.post(
        "http://localhost:5000/api/charging/send",
        {
          hostid: station._id,// This is USER id acting as host
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Charging request sent successfully ⚡");
      if(response.data){
  navigate("/myrequests");
}

    } catch (error) {
      console.error("Send request error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message ||
          "Failed to send request. Please try again."
      );
    }
  };

  // Extract data from station object
  const stationName = station.evStation.name || "Unknown Station";
  const address = station.evStation.address || "Address not available";
  const description=station.evStation?.description || "No description added"
  const power = station.evStation?.power || "N/A";
  const availableChargers = station.evStation.availableChargers || 0;
  const totalChargers = station.evStation?.totalChargers || 0;
  const rate = station.evStation?.chargingPricePerUnit || "N/A";
  const connectorType = station.evStation?.connectorType || "N/A";
  
  // Calculate distance if coordinates are available
  const getDistance = () => {
    // You can implement distance calculation here if needed
    // For now, return a placeholder
    return "Calculating...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-4 font-[Poppins]">
      {/* Back Button */}
      <button
        className="flex items-center gap-2 text-sm text-slate-600 mb-4 hover:text-slate-900 transition"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackOutline className="text-lg" />
        Back
      </button>

      {/* Station Card */}
      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-2xl mx-auto">
        {/* Header with Status */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">
              Available
            </span>
          </div>
          {connectorType !== "N/A" && (
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
              {connectorType}
            </span>
          )}
        </div>

        {/* Station Name */}
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {stationName}
        </h2>

        {/* Address */}
        <div className="flex items-start gap-2 text-slate-600 mb-6">
          <IoLocationOutline className="text-lg mt-0.5 flex-shrink-0" />
          <p className="text-sm">{address}</p>
        </div>

        <div className="flex items-start gap-2 text-slate-600 mb-6">
          <p className="text-sm">{description}</p>
        </div>

        {/* Station Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Power */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4">
            <p className="text-xs text-slate-600 mb-1">Power Output</p>
            <p className="text-2xl font-bold text-emerald-600">
              ⚡ {power} <span className="text-sm">kW</span>
            </p>
          </div>

          {/* Chargers */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
            <p className="text-xs text-slate-600 mb-1">Available Chargers</p>
            <p className="text-2xl font-bold text-blue-600">
              🔌 {availableChargers}/{totalChargers}
            </p>
          </div>

          {/* Rate */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4">
            <p className="text-xs text-slate-600 mb-1">Charging Rate</p>
            <p className="text-2xl font-bold text-amber-600">
              💰 ₹{rate}<span className="text-sm">/kWh</span>
            </p>
          </div>

          {/* Distance */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
            <p className="text-xs text-slate-600 mb-1">Distance</p>
            <p className="text-2xl font-bold text-purple-600">
              📍 {getDistance()}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        {station.evStation?.description && (
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <p className="text-xs font-semibold text-slate-700 mb-2">
              About this station
            </p>
            <p className="text-sm text-slate-600">
              {station.evStation.description}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center gap-2"
            onClick={handleSendRequest}
          >
            <span>⚡</span>
            Send Charging Request
          </button>

          <button
            className="w-full bg-white border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all"
            onClick={() => {
              // Open navigation to station
              if (station.location?.coordinates) {
                const [lng, lat] = station.location.coordinates;
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                  "_blank"
                );
              } else {
                toast.error("Location coordinates not available");
              }
            }}
          >
            🗺️ Navigate to Station
          </button>
        </div>
      </div>

      {/* Debug Info (Remove in production) */}
      <div className="mt-4 text-xs text-slate-400 text-center">
        <details className="max-w-2xl mx-auto">
          <summary className="cursor-pointer">Debug: View Raw Data</summary>
          <pre className="mt-2 bg-slate-100 p-4 rounded text-left overflow-auto">
            {JSON.stringify(station, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}

export default StationDetail;