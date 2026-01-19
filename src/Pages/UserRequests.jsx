import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Login required");
        setLoading(false);
        navigate("/");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/auth/viewrequests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "oo");
      setRequests(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  console.log(requests, "requests");

  const markArrived = async (requestId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5000/api/auth/charging/arrived/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMyRequests();
    } catch (err) {
      alert("Failed to mark arrival");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "REQUESTED":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "ACCEPTED":
        return "bg-green-100 text-green-700 border-green-200";
      case "ARRIVED":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "ACTIVE":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "REJECTED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusMap = {
    pending: "REQUESTED",
    accepted: "ACCEPTED",
    rejected: "REJECTED",
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    return req.status === statusMap[filter];
  });

  const filterOptions = [
    { value: "all", label: "All", count: requests.length },
    {
      value: "pending",
      label: "Pending",
      count: requests.filter((r) => r.status === "REQUESTED").length,
    },
    {
      value: "accepted",
      label: "Accepted",
      count: requests.filter((r) => r.status === "ACCEPTED").length,
    },
    {
      value: "rejected",
      label: "Rejected",
      count: requests.filter((r) => r.status === "REJECTED").length,
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              border: "4px solid #059669",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          ></div>
          <p style={{ color: "#64748b", fontWeight: "500" }}>
            Loading your requests...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .request-card {
          animation: slide-up 0.5s ease-out;
        }

        button:hover {
          transform: scale(1.02);
        }

        button:active {
          transform: scale(0.98);
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ maxWidth: "896px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <button
              onClick={() => window.history.back()}
              style={{
                width: "40px",
                height: "40px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                transition: "all 0.2s",
              }}
            >
              ←
            </button>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                }}
              >
                My Requests
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "#d1fae5",
                  margin: "4px 0 0 0",
                }}
              >
                Track your charging requests
              </p>
            </div>
            <button
              onClick={fetchMyRequests}
              style={{
                width: "40px",
                height: "40px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                transition: "all 0.2s",
              }}
            >
              ↻
            </button>
          </div>

          {/* Quick Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
            }}
          >
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background:
                    filter === option.value ? "white" : "rgba(255,255,255,0.2)",
                  color: filter === option.value ? "#059669" : "white",
                  boxShadow:
                    filter === option.value
                      ? "0 4px 12px rgba(0,0,0,0.15)"
                      : "none",
                  transform:
                    filter === option.value ? "scale(1.05)" : "scale(1)",
                }}
              >
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {option.count}
                </div>
                <div style={{ fontSize: "12px", marginTop: "4px" }}>
                  {option.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div style={{ maxWidth: "896px", margin: "0 auto", padding: "24px" }}>
        {filteredRequests.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "48px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#f1f5f9",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "40px",
              }}
            >
              ⚡
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              No Requests Found
            </h3>
            <p style={{ color: "#64748b", marginBottom: "24px" }}>
              {filter === "all"
                ? "You haven't made any charging requests yet"
                : `No ${filter} requests at the moment`}
            </p>
            <button
              style={{
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "12px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(5,150,105,0.3)",
                transition: "all 0.2s",
              }}
            >
              Find Charging Stations
            </button>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {filteredRequests.map((req, index) => (
              <div
                key={req._id}
                className="request-card"
                style={{
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  transition: "all 0.3s",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Status Bar */}
                <div
                  style={{
                    height: "8px",
                    background:
                      req.status === "REQUESTED"
                        ? "#fb923c"
                        : req.status === "ACCEPTED"
                        ? "#34d399"
                        : req.status === "ARRIVED"
                        ? "#38bdf8"
                        : req.status === "ACTIVE"
                        ? "#f87171"
                        : "#60a5fa",
                  }}
                ></div>

                <div style={{ padding: "24px" }}>
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <span style={{ fontSize: "20px" }}>⚡</span>
                        <h3
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#0f172a",
                            margin: 0,
                          }}
                        >
                          {req.host?.evStation?.name || "Station Name"}
                        </h3>
                      </div>
                      {req.host?.evStation?.address && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "14px",
                            color: "#64748b",
                            marginBottom: "8px",
                          }}
                        >
                          <span>📍</span>
                          <span>{req.host.evStation.address}</span>
                        </div>
                      )}
                      {req.host?.evStation?.description && (
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#94a3b8",
                            margin: "8px 0 0 0",
                          }}
                        >
                          {req.host.evStation.description}
                        </p>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 16px",
                        borderRadius: "24px",
                        border: "2px solid",
                        height: "fit-content",
                      }}
                      className={getStatusColor(req.status)}
                    >
                      <span>
                        {req.status === "REQUESTED"
                          ? "🕐"
                          : req.status === "ACCEPTED"
                          ? "✓"
                          : req.status === "ARRIVED"
                          ? "🚗"
                          : req.status === "ACTIVE"
                          ? "⚡"
                          : req.status === "COMPLETED"
                          ? "✅"
                          : "✗"}
                      </span>
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          textTransform: "capitalize",
                        }}
                      >
                        {req.status === "ACTIVE" ? "CHARGING" : req.status}
                      </span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    {req.host?.evStation?.power && (
                      <div
                        style={{
                          background: "#d1fae5",
                          border: "1px solid #a7f3d0",
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#065f46",
                            marginBottom: "4px",
                          }}
                        >
                          <span>⚡</span>
                          <span style={{ fontSize: "12px", fontWeight: "500" }}>
                            Power
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#064e3b",
                            margin: 0,
                          }}
                        >
                          {req.host.evStation.power} kW
                        </p>
                      </div>
                    )}

                    {req.host?.evStation?.availableChargers !== undefined && (
                      <div
                        style={{
                          background: "#dbeafe",
                          border: "1px solid #bfdbfe",
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#1e40af",
                            marginBottom: "4px",
                          }}
                        >
                          <span>🔋</span>
                          <span style={{ fontSize: "12px", fontWeight: "500" }}>
                            Available
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#1e3a8a",
                            margin: 0,
                          }}
                        >
                          {req.host.evStation.availableChargers} Chargers
                        </p>
                      </div>
                    )}

                    {req.host?.evStation?.chargingPricePerUnit && (
                      <div
                        style={{
                          background: "#e9d5ff",
                          border: "1px solid #d8b4fe",
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#6b21a8",
                            marginBottom: "4px",
                          }}
                        >
                          <span>💰</span>
                          <span style={{ fontSize: "12px", fontWeight: "500" }}>
                            Price/Unit
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#581c87",
                            margin: 0,
                          }}
                        >
                          ₹{req.host.evStation.chargingPricePerUnit}
                        </p>
                      </div>
                    )}

                    {req.createdAt && (
                      <div
                        style={{
                          background: "#f1f5f9",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#475569",
                            marginBottom: "4px",
                          }}
                        >
                          <span>📅</span>
                          <span style={{ fontSize: "12px", fontWeight: "500" }}>
                            Requested At
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#0f172a",
                            margin: 0,
                          }}
                        >
                          {formatDate(req.requestedAt)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Connector Type */}
                  {req.host?.evStation?.connectorType && (
                    <div
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        padding: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            background: "#cbd5e1",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                          }}
                        >
                          🔌
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#64748b",
                              margin: 0,
                            }}
                          >
                            Connector Type
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#0f172a",
                              margin: 0,
                            }}
                          >
                            {req.host.evStation.connectorType}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status Messages */}
                  {req.status === "REQUESTED" && (
                    <div
                      style={{
                        background: "#ffedd5",
                        border: "1px solid #fed7aa",
                        borderRadius: "12px",
                        padding: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span>⏰</span>
                        <span style={{ fontSize: "14px", color: "#9a3412" }}>
                          Waiting for host approval...
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Accepted - Show arrive button */}
                  {req.status === "ACCEPTED" && (
                    <button
                      onClick={() => markArrived(req._id)}
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                        color: "white",
                        border: "none",
                        padding: "12px",
                        borderRadius: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginBottom: "16px",
                      }}
                    >
                      🚗 I've Arrived
                    </button>
                  )}

                  {/* Arrived - Waiting for host to start */}
                  {req.status === "ARRIVED" && (
                    <div
                      style={{
                        background: "#dbeafe",
                        border: "1px solid #bfdbfe",
                        borderRadius: "12px",
                        padding: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            background: "#3b82f6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            animation: "pulse 2s infinite",
                          }}
                        >
                          <span style={{ fontSize: "20px" }}>🔌</span>
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#1e40af",
                              margin: 0,
                            }}
                          >
                            Connect the charger to your EV
                          </p>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#3b82f6",
                              margin: "4px 0 0 0",
                            }}
                          >
                            Waiting for host to start charging...
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Active - Charging in progress */}
                  {req.status === "ACTIVE" && (
                    <div
                      style={{
                        background: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
                        border: "2px solid #c084fc",
                        borderRadius: "16px",
                        padding: "20px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "12px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "32px",
                            animation: "pulse 1s infinite",
                          }}
                        >
                          ⚡
                        </span>
                        <div>
                          <p
                            style={{
                              fontSize: "18px",
                              fontWeight: "700",
                              color: "#7c3aed",
                              margin: 0,
                            }}
                          >
                            Charging in Progress
                          </p>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#8b5cf6",
                              margin: "4px 0 0 0",
                            }}
                          >
                            Started at: {req.startedAt ? new Date(req.startedAt).toLocaleTimeString() : "--:--"}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          background: "rgba(255,255,255,0.7)",
                          borderRadius: "8px",
                          padding: "12px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#6b21a8",
                            margin: 0,
                            textAlign: "center",
                          }}
                        >
                          Please wait while your EV charges. The host will stop charging when complete.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Completed - Show payment/review */}
                  {req.status === "COMPLETED" && req.paymentStatus !== "PAID" && (
                    <div style={{ marginBottom: "16px" }}>
                      <div
                        style={{
                          background: "#ecfdf5",
                          border: "1px solid #a7f3d0",
                          borderRadius: "12px",
                          padding: "16px",
                          marginBottom: "12px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#065f46",
                            margin: "0 0 8px 0",
                          }}
                        >
                          ✅ Charging Completed!
                        </p>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "8px",
                          }}
                        >
                          <div>
                            <p style={{ fontSize: "12px", color: "#047857", margin: 0 }}>Duration</p>
                            <p style={{ fontSize: "16px", fontWeight: "600", color: "#064e3b", margin: 0 }}>
                              {req.totalDuration || "--"} mins
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: "12px", color: "#047857", margin: 0 }}>Total Cost</p>
                            <p style={{ fontSize: "16px", fontWeight: "600", color: "#064e3b", margin: 0 }}>
                              ₹{req.totalCost || "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          navigate(`/payment/${req._id}`, {
                            state: {
                              requestId: req._id,
                              totalCost: req.totalCost,
                              stationData: req.host?.evStation,
                            },
                          })
                        }
                        style={{
                          width: "100%",
                          background:
                            "linear-gradient(135deg, #059669 0%, #047857 100%)",
                          color: "white",
                          border: "none",
                          padding: "14px",
                          borderRadius: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          boxShadow: "0 4px 12px rgba(5,150,105,0.3)",
                          transition: "all 0.2s",
                        }}
                      >
                        💳 Proceed to Payment (₹{req.totalCost})
                      </button>
                    </div>
                  )}

                  {/* Charging completed & paid */}
                  {req.paymentStatus === "PAID" && (
                    <>
                      <div
                        style={{
                          background: "#dcfce7",
                          border: "1px solid #bbf7d0",
                          borderRadius: "12px",
                          padding: "12px",
                          marginBottom: "12px",
                          color: "#166534",
                          fontWeight: "600",
                        }}
                      >
                        Charging completed successfully. Payment confirmed.
                      </div>

                      <button
                        onClick={() =>
                          navigate(`/review/${req._id}`, {
                            state: {
                              stationData: req.host?.evStation,
                              requestId: req._id,
                            },
                          })
                        }
                        style={{
                          width: "100%",
                          background:
                            "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                          color: "white",
                          border: "none",
                          padding: "12px",
                          borderRadius: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          boxShadow: "0 2px 8px rgba(79,70,229,0.3)",
                          transition: "all 0.2s",
                        }}
                      >
                        ⭐ Add Review & Rating
                      </button>
                    </>
                  )}

                  {req.status === "REJECTED" && (
                    <div
                      style={{
                        background: "#fee2e2",
                        border: "1px solid #fecaca",
                        borderRadius: "12px",
                        padding: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "8px" }}>
                        <span></span>
                        <div>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#991b1b",
                              margin: "0 0 4px 0",
                            }}
                          >
                            Request Rejected
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#dc2626",
                              margin: 0,
                            }}
                          >
                            {req.rejectionReason ||
                              "The host rejected your charging request"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: "flex", gap: "12px" }}>
                    {req.status === "REQUESTED" && (
                      <button
                        style={{
                          flex: 1,
                          background: "#fee2e2",
                          color: "#dc2626",
                          border: "2px solid #fecaca",
                          padding: "12px",
                          borderRadius: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        Cancel Request
                      </button>
                    )}

                    {req.status === "ACCEPTED" && (
                      <>
                        {/* <button
                          style={{
                            flex: 1,
                            background:
                              "linear-gradient(135deg, #059669 0%, #047857 100%)",
                            color: "white",
                            border: "none",
                            padding: "12px",
                            borderRadius: "12px",
                            fontWeight: "600",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(5,150,105,0.3)",
                            transition: "all 0.2s",
                          }}
                        >
                          ▶ Start Charging
                        </button> */}
                        {/* <button
                          style={{
                            flex: 1,
                            background: "#dbeafe",
                            color: "#1d4ed8",
                            border: "2px solid #bfdbfe",
                            padding: "12px",
                            borderRadius: "12px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          🧭 Navigate
                        </button> */}
                      </>
                    )}

                    {req.status === "REJECTED" && (
                      <button
                        onClick={() => navigate("/location")}
                        style={{
                          flex: 1,
                          background:
                            "linear-gradient(135deg, #059669 0%, #047857 100%)",
                          color: "white",
                          border: "none",
                          padding: "12px",
                          borderRadius: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          boxShadow: "0 2px 8px rgba(5,150,105,0.3)",
                          transition: "all 0.2s",
                        }}
                      >
                        Find Another Station
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserRequests;
