import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

function HostRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* 🔐 AUTH CHECK + FETCH */
  useEffect(() => {
    const token = localStorage.getItem("hosttoken");
    const role = localStorage.getItem("role");

    if (!token || role !== "HOST") {
      alert("Please login as host");
      navigate("/host/login");
      return;
    }

    fetchRequests(token);
  }, []);

  /* 📥 FETCH HOST REQUESTS */
  const fetchRequests = async (token) => {
    console.log(token,"token");
    
    try {
      const res = await api.get(
        "http://localhost:5000/api/host/allrequests",{
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      console.log(res,"ress");
      

      setRequests(res.data.requests);
    } catch (error) {
      console.error(error);
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  /*  ACCEPT REQUEST */
  const acceptRequest = async (requestId) => {
        const token = localStorage.getItem("hosttoken");

    try {
      await api.patch(
        `http://localhost:5000/api/chargingrequest/accept/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Request accepted");
      fetchRequests(token);
    } catch (error) {
      console.error(error);
      alert("Failed to accept request");
    }
  };

  /*  REJECT REQUEST */
  const rejectRequest = async (requestId) => {
    console.log(requestId,"requestId");
    
        const token = localStorage.getItem("hosttoken");
        console.log(token,"token");
    try {
      await api.patch(
  `http://localhost:5000/api/chargingrequest/reject/${requestId}`,
  {}, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert("Request rejected");
      fetchRequests(token);;
    } catch (error) {
      console.error(error);
      alert("Failed to reject request");
    }
  };

  /* ▶ START CHARGING */
  const startCharging = async (requestId) => {
    const token = localStorage.getItem("hosttoken");
    try {
      await api.patch(
        `http://localhost:5000/api/host/start/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Charging started!");
      fetchRequests(token);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to start charging");
    }
  };

  /* ⏹ STOP CHARGING */
  const stopCharging = async (requestId) => {
    const token = localStorage.getItem("hosttoken");
    try {
      const res = await api.patch(
        `http://localhost:5000/api/host/stop/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { durationInMinutes, totalCost } = res.data.summary;
      alert(`Charging completed!\nDuration: ${durationInMinutes} mins\nTotal Cost: ₹${totalCost}`);
      fetchRequests(token);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to stop charging");
    }
  };

  if (loading) {
    return <p className="p-4">Loading requests...</p>;
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 font-[Poppins]">
    <div className="max-w-4xl mx-auto ">
        <button
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 font-medium transition-colors"
      >
        <span className="text-xl">←</span>
        <span>Back</span>
      </button>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 ">
        📋 Charging Requests
      </h2>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📭</span>
          </div>
          <p className="text-slate-500 text-lg">No charging requests yet</p>
          <p className="text-slate-400 text-sm mt-2">New requests will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border border-slate-200"
            >
              {/* Driver Info */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    👤 {req.driver?.name}
                  </p>
                  {req.driver?.email && (
                    <p className="text-sm text-slate-600 mt-1">
                      ✉️ {req.driver.email}
                    </p>
                  )}
                  {req.driver?.phone && (
                    <p className="text-sm text-slate-600 mt-1">
                      📞 {req.driver.phone}
                    </p>
                  )}
                </div>
                
                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  req.status === 'REQUESTED' ? 'bg-orange-100 text-orange-700' :
                  req.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                  req.status === 'ARRIVED' ? 'bg-blue-100 text-blue-700' :
                  req.status === 'ACTIVE' ? 'bg-purple-100 text-purple-700' :
                  req.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {req.status === 'ARRIVED' ? '🚗 ARRIVED' :
                   req.status === 'ACTIVE' ? '⚡ CHARGING' :
                   req.status === 'COMPLETED' ? '✅ COMPLETED' :
                   req.status.toUpperCase()}
                </span>
              </div>

              {/* Location */}
              {req.driver?.location?.coordinates && (
                
                 <a href={`https://www.google.com/maps?q=${req.driver.location.coordinates[1]},${req.driver.location.coordinates[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors mb-4"
                >
                  📍 View Driver Location
                  <span className="text-xs">→</span>
                </a>
              )}

              <hr className="my-4 border-slate-200" />

              {/* Station Info */}
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  🔌 {req.host?.evStation?.name}
                </p>
                {req.stationId?.address && (
                  <p className="text-xs text-slate-600">
                    {req.stationId.address}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              {req.status === "REQUESTED" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => acceptRequest(req._id)}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg"
                  >
                    ✓ Accept Request
                  </button>

                  <button
                    onClick={() => rejectRequest(req._id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                  >
                    ✗ Reject
                  </button>
                </div>
              )}

              {/* Driver Arrived - Start Charging */}
              {req.status === "ARRIVED" && (
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-blue-700 font-medium flex items-center gap-2">
                      <span>🚗</span> Driver has arrived! Please verify the charger connection.
                    </p>
                  </div>
                  <button
                    onClick={() => startCharging(req._id)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    ▶ Start Charging
                  </button>
                </div>
              )}

              {/* Charging Active - Stop Charging */}
              {req.status === "ACTIVE" && (
                <div className="space-y-3">
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <p className="text-purple-700 font-medium flex items-center gap-2">
                      <span className="animate-pulse">⚡</span> Charging in progress...
                    </p>
                    <p className="text-purple-600 text-sm mt-1">
                      Started at: {new Date(req.startedAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={() => stopCharging(req._id)}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    ⏹ Stop Charging
                  </button>
                </div>
              )}

              {/* Completed */}
              {req.status === "COMPLETED" && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-emerald-700 font-semibold flex items-center gap-2">
                    <span>✅</span> Charging Completed
                  </p>
                  {req.totalCost && (
                    <p className="text-emerald-600 text-sm mt-1">
                      Duration: {req.totalDuration} mins • Cost: ₹{req.totalCost}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}

export default HostRequests;
