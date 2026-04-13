import { Navigate, useLocation } from "react-router-dom";
import { getAuthRole, getAuthToken } from "@/utils/authStorage";

const ProtectedRoute = ({ children, role }) => {
  const token = getAuthToken();
  const userRole = getAuthRole();
  const location = useLocation();

  if (!token) {
    // Preserve the intended destination so the user returns after login
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  }

  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
