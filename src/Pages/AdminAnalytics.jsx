import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  Zap,
  DollarSign,
  TrendingUp,
  Building2,
} from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.get("http://localhost:5000/api/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-slate-400">Loading analytics...</div>;
  }

  const stats = data?.stats || {};
  const dailySessions = data?.dailySessions || [];
  const popularStations = data?.popularStations || [];

  // Find max for bar chart scaling
  const maxCount = Math.max(...dailySessions.map((d) => d.count), 1);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <BarChart3 className="w-7 h-7 text-emerald-600" />
        Platform Analytics
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <Users className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.totalUsers || 0}</span>
          </div>
          <p className="mt-2 text-blue-100 font-medium">Total Users</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <Building2 className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.totalHosts || 0}</span>
          </div>
          <p className="mt-2 text-purple-100 font-medium">Total Hosts</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <Zap className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.totalSessions || 0}</span>
          </div>
          <p className="mt-2 text-emerald-100 font-medium">Total Sessions</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">₹{stats.totalRevenue?.toLocaleString() || 0}</span>
          </div>
          <p className="mt-2 text-amber-100 font-medium">Total Revenue</p>
        </div>
      </div>

      {/* Usage Trend */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Sessions (Last 7 Days)
        </h2>
        {dailySessions.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No session data available</p>
        ) : (
          <div className="flex items-end gap-2 h-40">
            {dailySessions.map((day) => (
              <div key={day._id} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-emerald-500 rounded-t-lg transition-all"
                  style={{ height: `${(day.count / maxCount) * 100}%`, minHeight: "4px" }}
                ></div>
                <span className="text-xs text-slate-500 mt-2">{day._id.slice(5)}</span>
                <span className="text-xs font-semibold text-slate-700">{day.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Stations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-600" />
          Top 5 Popular Stations
        </h2>
        {popularStations.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No station data available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-500 uppercase border-b">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Station</th>
                  <th className="py-3 px-4">Host</th>
                  <th className="py-3 px-4 text-right">Sessions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {popularStations.map((station, index) => (
                  <tr key={station.hostId} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-600">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{station.stationName || "N/A"}</td>
                    <td className="py-3 px-4 text-slate-600">{station.hostName}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600">{station.sessionCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
