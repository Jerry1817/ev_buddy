import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  Zap,
  Star,
  Clock,
  DollarSign,
  TrendingUp,
  Activity,
  Users,
  ChevronRight,
  CheckCircle,
  XCircle,
  Timer
} from "lucide-react";

export default function HostDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedSessions: 0,
    totalEarnings: 0,
    averageRating: 0,
    totalReviews: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);

  // Get host data from localStorage safely
  const getUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        return JSON.parse(storedUser);
      }
      return {};
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return {};
    }
  };

  const user = getUserFromStorage();
  const stationName = user?.evStation?.name || "My Station";
  const pricePerUnit = user?.evStation?.chargingPricePerUnit || 0;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("hosttoken");
      if (!token) {
        navigate("/host/login");
        return;
      }

      // Fetch requests
      const requestsRes = await api.get(
        "http://localhost:5000/api/host/allrequests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const requests = requestsRes.data.requests || [];
      
      // Calculate stats
      const completed = requests.filter(r => r.status === "COMPLETED");
      const pending = requests.filter(r => r.status === "REQUESTED");
      const totalEarnings = completed.reduce((sum, r) => sum + (r.totalCost || 0), 0);

      // Fetch reviews
      let reviewStats = { averageRating: 0, totalReviews: 0 };
      try {
        const reviewsRes = await api.get(
          "http://localhost:5000/api/host/reviews",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (reviewsRes.data.success) {
          reviewStats = reviewsRes.data.data.stats;
        }
      } catch (err) {
        console.log("No reviews yet");
      }

      setStats({
        totalRequests: requests.length,
        pendingRequests: pending.length,
        completedSessions: completed.length,
        totalEarnings,
        averageRating: reviewStats.averageRating || 0,
        totalReviews: reviewStats.totalReviews || 0,
      });

      // Get recent 5 requests
      setRecentRequests(requests.slice(0, 5));
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      REQUESTED: "bg-amber-100 text-amber-700",
      ACCEPTED: "bg-blue-100 text-blue-700",
      ARRIVED: "bg-purple-100 text-purple-700",
      ACTIVE: "bg-emerald-100 text-emerald-700",
      COMPLETED: "bg-green-100 text-green-700",
      REJECTED: "bg-red-100 text-red-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-emerald-100">
          Here's what's happening with <span className="font-semibold">{stationName}</span> today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Requests */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.totalRequests}</p>
          <p className="text-sm text-slate-500">Total Requests</p>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            {stats.pendingRequests > 0 && (
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                Action needed
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.pendingRequests}</p>
          <p className="text-sm text-slate-500">Pending Requests</p>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.completedSessions}</p>
          <p className="text-sm text-slate-500">Completed Sessions</p>
        </div>

        {/* Total Earnings */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">₹{stats.totalEarnings.toFixed(0)}</p>
          <p className="text-sm text-slate-500">Total Earnings</p>
        </div>
      </div>

      {/* Rating & Reviews Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Rating & Reviews</h2>
            <button
              onClick={() => navigate("/hostreviews")}
              className="text-emerald-600 text-sm font-medium flex items-center gap-1 hover:text-emerald-700"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                <span className="text-4xl font-bold text-slate-900">
                  {stats.averageRating || "N/A"}
                </span>
              </div>
              <p className="text-sm text-slate-500">Average Rating</p>
            </div>
            <div className="h-16 w-px bg-slate-200" />
            <div className="text-center">
              <p className="text-4xl font-bold text-slate-900">{stats.totalReviews}</p>
              <p className="text-sm text-slate-500">Total Reviews</p>
            </div>
          </div>
        </div>

        {/* Station Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Station Info</h2>
            <button
              onClick={() => navigate("/host/settings")}
              className="text-emerald-600 text-sm font-medium flex items-center gap-1 hover:text-emerald-700"
            >
              Edit
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Station Name</span>
              <span className="font-medium text-slate-900">{stationName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Price per kWh</span>
              <span className="font-medium text-emerald-600">₹{pricePerUnit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Available Chargers</span>
              <span className="font-medium text-slate-900">
                {user?.evStation?.availableChargers || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Requests</h2>
          <button
            onClick={() => navigate("/hostrequests")}
            className="text-emerald-600 text-sm font-medium flex items-center gap-1 hover:text-emerald-700"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {recentRequests.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Activity className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p>No requests yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentRequests.map((req) => (
              <div
                key={req._id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => navigate("/hostrequests")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {req.driver?.name || "Driver"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDate(req.requestedAt)}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(req.status)}`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
