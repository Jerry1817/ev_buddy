import { User, Clock, LogOut, LogIn, ChevronRight, Zap, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ token, userName, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 ev-glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="font-bold text-slate-900">EV Buddy</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {token ? (
            <>
              {/* Profile */}

              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow border hover:scale-105 transition"
              >
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-slate-700">{userName ? userName : "Profile"}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* My Requests */}
              <button
                onClick={() => navigate("/myrequests")}
                className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow border hover:scale-105 transition"
              >
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-slate-700">My Requests</span>
              </button>

              {/* Complaints */}
              <button
                onClick={() => navigate("/complaints")}
                className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow border hover:scale-105 transition"
              >
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-slate-700">Complaints</span>
              </button>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full border hover:bg-red-100 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
