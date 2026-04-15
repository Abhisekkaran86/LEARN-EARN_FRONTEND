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
    const fallbackPath =
      userRole === "admin"
        ? "/admin/dashboard"
        : userRole === "student"
          ? "/student/dashboard"
          : "/";

    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
