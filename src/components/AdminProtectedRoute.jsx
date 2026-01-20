import { Navigate } from "react-router-dom";

/**
 * AdminProtectedRoute
 * Protects admin routes by checking for adminToken in localStorage
 */
const AdminProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  const role = localStorage.getItem("role");

  // Check if admin is authenticated
  if (!adminToken || role !== "ADMIN") {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminProtectedRoute;
