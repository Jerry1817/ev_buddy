import { useEffect, useState } from "react";
import {
  User,
  Edit3,
  Zap,
  Wallet,
  Users,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
  Award,
  Activity,
  Bell,
  Settings,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  X,
  Camera,
  Save,
  ArrowLeft,
  Star,
  Car,
  Receipt
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {

const navigate=useNavigate()


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState({
    totalCharges: 0,
    totalEnergy: 0,
  });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    vehicleModel: "",
    vehicleReg: ""
  });  
  
  console.log(user?.name,"user");

    useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        address: "",
        vehicleModel: "",
        vehicleReg: "",
      });
    }
  }, [user]);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          navigate("/login");
          return;
        }
        
        const res = await api.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(res.data.data);

        // Fetch user stats
        const statsRes = await api.get("http://localhost:5000/api/auth/homestats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (statsRes.data.success) {
          setStats({
            totalCharges: statsRes.data.data.usercharged || 0,
            totalEnergy: Math.round((statsRes.data.data.usercharged || 0) * 15), // Approx 15 kWh per charge
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [navigate]);
  
  
  if (loading) {
    return <p className="text-center text-slate-500">Loading profile...</p>;
  }  
  
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }


if (!user){
  return null; 
}

  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditModalOpen(false);
      // You can add toast notification here
      toast.success("Profile updated successfully!");
    }, 1500);
  };

  // Logout handler - clears all localStorage and navigates to login
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    localStorage.removeItem("hosttoken");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  // Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const token = localStorage.getItem("userToken");
      const res = await api.post("http://localhost:5000/api/auth/upload-avatar", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${token}`
        },
      });

      if (res.data.success) {
        toast.success("Profile image updated!");
        // Update local user state with new image path
        // Ensure path starts with slash if not already or absolute URL
        const imagePath = res.data.profileImage;
        setUser((prev) => ({ ...prev, profileImage: imagePath }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    }
  };
  
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .profile-card {
          transition: all 0.3s ease;
        }

        .profile-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .menu-item {
          transition: all 0.2s ease;
        }

        .menu-item:hover {
          transform: translateX(4px);
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
        }

        .menu-item:hover .icon-bg {
          background: rgba(255, 255, 255, 0.2);
        }

        .menu-item:hover svg {
          color: white;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.15);
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fade-in 0.2s ease-out;
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slide-up 0.3s ease-out;
        }

        .modal-content::-webkit-scrollbar {
          width: 6px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: #059669;
          border-radius: 10px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
        }

        .input-group input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .input-group input:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }
      `}</style>

      {/* Header with Profile */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 pt-8 pb-24 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          {/* Top Actions */}
          {/* <div className="flex justify-between items-center mb-8">
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div> */}

          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white p-1 shadow-xl">
                <img
                  src={user.profileImage ? `http://localhost:5000${user.profileImage}` : "https://via.placeholder.com/120"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-emerald-500" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <Award className="w-4 h-4" />
                  Gold Member
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-4 text-emerald-50 text-sm mb-4">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                
              </div>

              <button className="bg-white text-emerald-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-2 mx-auto md:mx-0"
                onClick={() => setIsEditModalOpen(true)}>
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Overlapping */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 mb-6 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Charges */}
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-slate-500 font-medium">Completed</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{stats.totalCharges}</p>
            <p className="text-sm text-slate-600">Total Charges</p>
          </div>

          {/* Energy Consumed */}
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-slate-500 font-medium">Estimated</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{stats.totalEnergy} kWh</p>
            <p className="text-sm text-slate-600">Energy Used</p>
          </div>

          {/* Average Rating */}
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-slate-500 font-medium">Rating</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">
              {user.averageRating ? user.averageRating.toFixed(1) : "N/A"}
            </p>
            <p className="text-sm text-slate-600">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* My EV Section - Only show if user has evModel */}
        {user.evModel && (
          <div className="mb-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">My Electric Vehicle</h2>
            </div>

            <div className="profile-card bg-white rounded-2xl p-5 border border-slate-200 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center">
                  <Car className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-emerald-600 font-semibold mb-1">ELECTRIC VEHICLE</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{user.evModel}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="mb-6 animate-slide-up">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {/* Invite Friends */}
            <div    onClick={() => navigate("/invite")}
          className="menu-item bg-white rounded-xl p-4 border border-slate-200 shadow-md cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="icon-bg w-11 h-11 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Invite Friends</p>
                  <p className="text-xs text-slate-500">Earn rewards together</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            {/* Transaction History */}
            <div onClick={() => navigate("/transactions")}
              className="menu-item bg-white rounded-xl p-4 border border-slate-200 shadow-md cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="icon-bg w-11 h-11 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Transaction History</p>
                  <p className="text-xs text-slate-500">View past payments</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            {/* Submit Complaint */}
            <div    onClick={() => navigate("/complaints")}
             className="menu-item bg-white rounded-xl p-4 border border-slate-200 shadow-md cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="icon-bg w-11 h-11 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Submit Complaint</p>
                  <p className="text-xs text-slate-500">Report an issue</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            {/* Privacy Policy */}
            <div   onClick={() => navigate("/privacy")}
             className="menu-item bg-white rounded-xl p-4 border border-slate-200 shadow-md cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="icon-bg w-11 h-11 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Privacy Policy</p>
                  <p className="text-xs text-slate-500">Terms & conditions</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="animate-slide-up">
          <button 
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold shadow-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* App Version */}
        <div className="text-center mt-6 text-sm text-slate-400">
          <p>EV Charge Finder v1.0.0</p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold mb-1">Edit Profile</h2>
                <p className="text-emerald-100 text-sm">Update your personal information</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden">
                    <img
                      src={user.profileImage ? `http://localhost:5000${user.profileImage}` : "https://via.placeholder.com/120"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label htmlFor="file-upload" className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-all cursor-pointer">
                    <Camera className="w-4 h-4" />
                  </label>
                  <input 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">Click camera icon to change photo</p>
              </div>

              {/* Form Fields */}
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* <div className="input-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                />
              </div> */}

              {/* Vehicle Information */}
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                {/* <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  Vehicle Information
                </h3> */}
                
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group mb-0">
                    <label htmlFor="vehicleModel">Model</label>
                    <input
                      type="text"
                      id="vehicleModel"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleInputChange}
                      placeholder="e.g., ATHER 450 Apex"
                    />
                  </div>

                  <div className="input-group mb-0">
                    <label htmlFor="vehicleReg">Registration No.</label>
                    <input
                      type="text"
                      id="vehicleReg"
                      name="vehicleReg"
                      value={formData.vehicleReg}
                      onChange={handleInputChange}
                      placeholder="e.g., KL-XX-XXXX"
                    />
                  </div>
                </div> */}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}