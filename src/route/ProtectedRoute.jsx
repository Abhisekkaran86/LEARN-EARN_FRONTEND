// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" />;

//   if (role && userRole !== role.toLowerCase()) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isAuth = true; // 🔁 replace with real auth logic

//   if (!isAuth) {
//     return <Navigate to="/login" />;
//   }

//   return children; // ✅ MUST return children
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, role }) => {
  const token = Cookies.get("token");
  const userRole = Cookies.get("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ❌ Role mismatch
  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;