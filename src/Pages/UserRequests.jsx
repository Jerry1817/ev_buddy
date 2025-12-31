import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Login required");
        navigate("/");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/charging-request/user",
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

  if (loading) {
    return <p className="p-4">Loading your requests...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-[Poppins]">
      <h2 className="text-xl font-semibold mb-4">
        My Charging Requests
      </h2>

      {requests.length === 0 && (
        <p className="text-gray-500">
          You haven’t sent any charging requests yet
        </p>
      )}

      {requests.map((req) => (
        <div
          key={req._id}
          className="bg-white p-4 rounded-xl shadow mb-3"
        >
          <p className="font-semibold">
            🔌 {req.stationId?.name}
          </p>
          <p className="text-sm text-gray-600">
            {req.stationId?.address}
          </p>

          <p className="text-sm mt-2">
            Status:{" "}
            <span
              className={`font-semibold ${
                req.status === "accepted"
                  ? "text-green-600"
                  : req.status === "rejected"
                  ? "text-red-600"
                  : "text-orange-500"
              }`}
            >
              {req.status.toUpperCase()}
            </span>
          </p>

          {req.status === "accepted" && (
            <button
              className="mt-3 w-full bg-emerald-500 text-white py-2 rounded-lg"
              onClick={() => navigate("/charging")}
            >
              Start Charging
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserRequests;
