import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

  // Get login token
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("jwtToken") ||
    localStorage.getItem("jwt");

  // Get logged-in user's role
  const role = localStorage.getItem("role");

  // No token = not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role is required for this route
  if (
    allowedRole &&
    role?.toUpperCase() !== allowedRole.toUpperCase()
  ) {
    // Send user to their own dashboard
    if (role?.toUpperCase() === "PASSENGER") {
      return <Navigate to="/passenger" replace />;
    }

    if (role?.toUpperCase() === "STAFF") {
      return <Navigate to="/staff" replace />;
    }

    if (role?.toUpperCase() === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;