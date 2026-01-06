import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HostRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* 🔐 AUTH CHECK + FETCH */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "HOST") {
      alert("Please login as host");
      navigate("/host/login");
      return;
    }

    fetchRequests(token);
  }, [navigate]);

  /* 📥 FETCH HOST REQUESTS */
  const fetchRequests = async (token) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/charging-request/host",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ ACCEPT REQUEST */
  const acceptRequest = async (requestId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/charging-request/accept/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("hostToken")}`,
          },
        }
      );

      alert("Request accepted");
      fetchRequests(localStorage.getItem("hostToken"));
    } catch (error) {
      console.error(error);
      alert("Failed to accept request");
    }
  };

  /* ❌ REJECT REQUEST */
  const rejectRequest = async (requestId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/charging-request/reject/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("hostToken")}`,
          },
        }
      );

      alert("Request rejected");
      fetchRequests(localStorage.getItem("hostToken"));
    } catch (error) {
      console.error(error);
      alert("Failed to reject request");
    }
  };

  if (loading) {
    return <p className="p-4">Loading requests...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-[Poppins]">
      <h2 className="text-xl font-semibold mb-4">Host Requests</h2>

      {requests.length === 0 && (
        <p className="text-gray-500">No charging requests yet</p>
      )}

      {requests.map((req) => (
        <div
          key={req._id}
          className="bg-white rounded-xl shadow p-4 mb-4"
        >
          <p className="font-semibold">
            User: {req.userId?.name}
          </p>
          <p className="text-sm text-gray-600">
            📧 {req.userId?.email}
          </p>
          <p className="text-sm text-gray-600">
            📞 {req.userId?.phone}
          </p>

          <hr className="my-2" />

          <p className="text-sm">
            🔌 Station: {req.stationId?.name}
          </p>
          <p className="text-sm text-gray-600">
            {req.stationId?.address}
          </p>

          <p className="mt-2 text-sm">
            Status:{" "}
            <span className="font-semibold text-orange-500">
              {req.status}
            </span>
          </p>

          {/* 🎯 ACTION BUTTONS */}
          {req.status === "pending" && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => acceptRequest(req._id)}
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700"
              >
                Accept
              </button>

              <button
                onClick={() => rejectRequest(req._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HostRequests;
