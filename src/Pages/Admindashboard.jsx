import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  Users, Zap, MessageSquare, CreditCard, Menu, X,
  LayoutDashboard, LogOut, Loader2, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Data states
  const [stats, setStats] = useState({ totalUsers: 0, totalHosts: 0, openComplaints: 0, totalRevenue: 0 });
  const [users, setUsers] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'hosts', label: 'Hosts', icon: Zap },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
  ];

  // Get admin token for API requests
  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const res = await api.get('http://localhost:5000/api/admin/stats');
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get('http://localhost:5000/api/admin/users');
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  // Fetch hosts
  const fetchHosts = async () => {
    try {
      const res = await api.get('http://localhost:5000/api/admin/hosts');
      if (res.data.success) {
        setHosts(res.data.hosts);
      }
    } catch (error) {
      console.error('Failed to fetch hosts:', error);
    }
  };

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await api.get('http://localhost:5000/api/admin/complaints');
      if (res.data.success) {
        setComplaints(res.data.complaints);
      }
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await api.get('http://localhost:5000/api/admin/transactions');
      if (res.data.success) {
        setTransactions(res.data.transactions);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  // Update complaint status
  const updateComplaintStatus = async (id, status) => {
    try {
      const res = await api.put(
        `http://localhost:5000/api/admin/complaints/${id}`,
        { status }
      );
      if (res.data.success) {
        toast.success('Complaint status updated');
        fetchComplaints();
        fetchStats();
      }
    } catch (error) {
      toast.error('Failed to update complaint');
    }
  };

  // Toggle block/unblock user or host
  const toggleBlockUser = async (id, isCurrentlyBlocked) => {
    try {
      const action = isCurrentlyBlocked ? 'unblock' : 'block';
      const res = await api.put(
        `http://localhost:5000/api/admin/users/${id}/${action}`,
        {}
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchUsers();
        fetchHosts();
      }
    } catch (error) {
      toast.error(`Failed to ${isCurrentlyBlocked ? 'unblock' : 'block'} user`);
    }
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchUsers(), fetchHosts(), fetchComplaints(), fetchTransactions()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₹${(amount || 0).toFixed(2)}`;
  };

  const renderPageContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Loading data...</span>
        </div>
      );
    }

    switch(activePage) {
      case 'dashboard':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <button 
                onClick={() => fetchStats()}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
                  </div>
                  <Users className="text-green-700" size={32} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active Hosts</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalHosts}</p>
                  </div>
                  <Zap className="text-green-500" size={32} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Open Complaints</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.openComplaints}</p>
                  </div>
                  <MessageSquare className="text-orange-500" size={32} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p>
                  </div>
                  <CreditCard className="text-purple-500" size={32} />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Users Management</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {users.length === 0 ? (
                <p className="p-6 text-gray-500 text-center">No users found</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className={user.isBlocked ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.phone || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.isVerified ? 'Verified' : 'Pending'}
                            </span>
                            {user.isBlocked && (
                              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                                Blocked
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(user.createdAt)}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleBlockUser(user._id, user.isBlocked)}
                            className={`px-3 py-1 text-xs rounded font-medium ${
                              user.isBlocked 
                                ? 'bg-green-600 text-white hover:bg-green-700' 
                                : 'bg-red-600 text-white hover:bg-red-700'
                            }`}
                          >
                            {user.isBlocked ? 'Unblock' : 'Block'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );
      
      case 'hosts':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Charging Station Hosts</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {hosts.length === 0 ? (
                <p className="p-6 text-gray-500 text-center">No hosts found</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Host Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Station</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {hosts.map((host) => (
                      <tr key={host._id} className={host.isBlocked ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 text-sm text-gray-800">{host.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{host.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{host.evStation?.name || 'Not Set'}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{host.averageRating?.toFixed(1) || '0.0'} ⭐</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              host.isHostActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {host.isHostActive ? 'Active' : 'Inactive'}
                            </span>
                            {host.isBlocked && (
                              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                                Blocked
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleBlockUser(host._id, host.isBlocked)}
                            className={`px-3 py-1 text-xs rounded font-medium ${
                              host.isBlocked 
                                ? 'bg-green-600 text-white hover:bg-green-700' 
                                : 'bg-red-600 text-white hover:bg-red-700'
                            }`}
                          >
                            {host.isBlocked ? 'Unblock' : 'Block'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );
      
      case 'complaints':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Complaints</h1>
            <div className="space-y-4">
              {complaints.length === 0 ? (
                <p className="p-6 bg-white rounded-lg shadow text-gray-500 text-center">No complaints found</p>
              ) : (
                complaints.map((complaint) => (
                  <div key={complaint._id} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{complaint.subject}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Submitted by: {complaint.user?.name || 'Unknown'} ({complaint.user?.email})
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Category: {complaint.category} | Priority: {complaint.priority} | {formatDate(complaint.createdAt)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        complaint.status === 'OPEN' ? 'bg-red-100 text-red-800' :
                        complaint.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-3">{complaint.description}</p>
                    <div className="mt-4 flex gap-2">
                      {complaint.status !== 'IN_PROGRESS' && (
                        <button 
                          onClick={() => updateComplaintStatus(complaint._id, 'IN_PROGRESS')}
                          className="px-4 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                        >
                          Mark In Progress
                        </button>
                      )}
                      {complaint.status !== 'RESOLVED' && (
                        <button 
                          onClick={() => updateComplaintStatus(complaint._id, 'RESOLVED')}
                          className="px-4 py-2 bg-green-700 text-white rounded text-sm hover:bg-green-800"
                        >
                          Resolve
                        </button>
                      )}
                      {complaint.status !== 'OPEN' && (
                        <button 
                          onClick={() => updateComplaintStatus(complaint._id, 'OPEN')}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                        >
                          Reopen
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      
      case 'transactions':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {transactions.length === 0 ? (
                <p className="p-6 text-gray-500 text-center">No transactions found</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Session ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Host</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((txn) => (
                      <tr key={txn._id}>
                        <td className="px-6 py-4 text-sm text-gray-800 font-mono">
                          #{txn._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{txn.driver?.name || 'Unknown'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{txn.host?.name || 'Unknown'}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 font-semibold">
                          {formatCurrency(txn.totalCost)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(txn.createdAt)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            txn.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {txn.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-black text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          <h2 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>EV Admin</h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-green-800 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activePage === item.id ? 'bg-green-900' : 'hover:bg-green-800'
                }`}
              >
                <Icon size={20} />
                <span className={`${!sidebarOpen && 'hidden'}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-2 border-t border-green-600">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-800 transition-colors"
          >
            <LogOut size={20} />
            <span className={`${!sidebarOpen && 'hidden'}`}>Logout</span>
          </button>
        </div>      
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
}