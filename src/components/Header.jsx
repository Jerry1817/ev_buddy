import { User, Clock, LogOut, LogIn, ChevronRight, Zap, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ token, userName, onLogout }) {
  const navigate = useNavigate();

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
      style={{ position: 'fixed' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 hidden sm:inline">EV Buddy</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
          {token ? (
            <>
              {/* Profile */}
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex-shrink-0"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="font-medium text-slate-700 text-sm hidden md:inline">
                  {userName ? userName : "Profile"}
                </span>
              </button>

              {/* My Requests */}
              <button
                onClick={() => navigate("/myrequests")}
                className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex-shrink-0"
              >
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-slate-700 text-sm hidden md:inline">Requests</span>
              </button>

              {/* Complaints */}
              <button
                onClick={() => navigate("/complaints")}
                className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all flex-shrink-0"
              >
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-slate-700 text-sm hidden lg:inline">Complaints</span>
              </button>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-3 sm:px-4 py-2 rounded-full border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all flex-shrink-0"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span className="font-medium">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

