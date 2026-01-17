import React, { useState } from 'react';
import { Users, Zap, MessageSquare, CreditCard, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'hosts', label: 'Hosts', icon: Zap },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
  ];

  const renderPageContent = () => {
    switch(activePage) {
      case 'dashboard':
        return (
          <div>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-gray-800">1,234</p>
                  </div>
                  <Users className="text-green-700" size={32} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active Hosts</p>
                    <p className="text-2xl font-bold text-gray-800">456</p>
                  </div>
                  <Zap className="text-green-500" size={32} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Open Complaints</p>
                    <p className="text-2xl font-bold text-gray-800">23</p>
                  </div>
                  <MessageSquare className="text-orange-500" size={32} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">$12.5k</p>
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
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">John Doe</td>
                    <td className="px-6 py-4 text-sm text-gray-600">john@example.com</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span></td>
                    <td className="px-6 py-4"><button className="text-green-700 hover:text-green-900 text-sm">View</button></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">Jane Smith</td>
                    <td className="px-6 py-4 text-sm text-gray-600">jane@example.com</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span></td>
                    <td className="px-6 py-4"><button className="text-blue-600 hover:text-blue-800 text-sm">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'hosts':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Charging Station Hosts</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Host Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stations</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">EV Charge Point Alpha</td>
                    <td className="px-6 py-4 text-sm text-gray-600">New York, NY</td>
                    <td className="px-6 py-4 text-sm text-gray-800">5</td>
                    <td className="px-6 py-4"><button className="text-blue-600 hover:text-blue-800 text-sm">Manage</button></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">PowerHub Station</td>
                    <td className="px-6 py-4 text-sm text-gray-600">San Francisco, CA</td>
                    <td className="px-6 py-4 text-sm text-gray-800">8</td>
                    <td className="px-6 py-4"><button className="text-blue-600 hover:text-blue-800 text-sm">Manage</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'complaints':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Complaints</h1>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Charging station not working</h3>
                    <p className="text-sm text-gray-600 mt-1">Submitted by: John Doe</p>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">Open</span>
                </div>
                <p className="text-gray-700 mt-3">The charging station at location A is not responding...</p>
                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-green-700 text-white rounded text-sm hover:bg-green-800">Respond</button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">Close</button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Billing issue</h3>
                    <p className="text-sm text-gray-600 mt-1">Submitted by: Jane Smith</p>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
                </div>
                <p className="text-gray-700 mt-3">I was charged twice for the same session...</p>
                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Respond</button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">Close</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'transactions':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">#TXN-001234</td>
                    <td className="px-6 py-4 text-sm text-gray-600">John Doe</td>
                    <td className="px-6 py-4 text-sm text-gray-800">$25.50</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Jan 15, 2026</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-800">#TXN-001233</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Jane Smith</td>
                    <td className="px-6 py-4 text-sm text-gray-800">$18.75</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Jan 15, 2026</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></td>
                  </tr>
                </tbody>
              </table>
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
            onClick={() => alert('Logout clicked')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-800 transition-colors"
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