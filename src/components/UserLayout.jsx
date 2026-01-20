import { useNavigate } from "react-router-dom";
import Header from "./Header";

/**
 * UserLayout - Wrapper component that adds Header to user pages
 * Handles authentication state and provides consistent layout
 */
export default function UserLayout({ children }) {
  const navigate = useNavigate();
  
  // Get authentication data from localStorage
  const token = localStorage.getItem("userToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || "";

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    localStorage.removeItem("hosttoken");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <Header 
        token={token} 
        userName={userName} 
        onLogout={handleLogout} 
      />
      
      {/* Main Content - Add padding-top to account for fixed header */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
