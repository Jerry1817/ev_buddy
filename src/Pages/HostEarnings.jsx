import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { CreditCard, Wallet, Calendar, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

function HostEarnings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await api.get("http://localhost:5000/api/host/earnings");
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load earnings");
    } finally {
      setLoading(false);
    }
  };

  const transactions = data?.transactions || [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <TrendingUp className="w-8 h-8 text-emerald-600" /> My Earnings
      </h1>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Wallet size={120} />
          </div>
          <p className="text-emerald-100 font-medium mb-1 text-lg">Total Revenue</p>
          <h2 className="text-5xl font-bold tracking-tight">₹{data?.totalEarnings?.toLocaleString() || 0}</h2>
          <p className="mt-4 text-emerald-100 text-sm flex items-center gap-1">
             <CreditCard size={14} /> Only includes completed & paid sessions
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" /> Recent Payments
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <p>No earnings history yet.</p>
              <p className="text-sm mt-1">Payments from drivers will appear here.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Driver</th>
                  <th className="p-4 font-semibold text-right">Amount</th>
                  <th className="p-4 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((txn) => (
                  <tr key={txn._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(txn.createdAt).toLocaleDateString()}
                      <br />
                      <span className="text-xs text-gray-400">{new Date(txn.createdAt).toLocaleTimeString()}</span>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-800">{txn.driver?.name || "Unknown Driver"}</p>
                      <p className="text-xs text-gray-500">{txn.driver?.email}</p>
                    </td>
                    <td className="p-4 font-bold text-gray-800 text-right">
                      ₹{txn.totalCost?.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default HostEarnings;
