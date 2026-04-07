// layout/MainLayout.jsx
// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
// import { Outlet } from "react-router-dom";

// const MainLayout = ({ children }) => {
//   return (
//     <div className="flex flex-col min-h-screen">

//       {/* HEADER */}
//       <Header />

//       {/* MAIN CONTENT */}
//        <main className="flex-1">
//         <Outlet />
//       </main>
//       {/* FOOTER */}
//       <Footer />

//     </div>
//   );
// };

// export default MainLayout;

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  // 🔥 Detect role based on route
  const isAdmin = path.startsWith("/admin");
  const isStudent = path.startsWith("/student");

  // ❌ Hide back button on main pages
  const hideBack =
    path === "/" ||
    path === "/admin" ||
    path === "/student";

  // 🔥 Smart fallback
  const getFallbackRoute = () => {
    if (isAdmin) return "/admin";
    if (isStudent) return "/student";
    return "/";
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(getFallbackRoute());
    }
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* HEADER */}
      <Header />

      {/* 🔥 GLOBAL BACK BUTTON */}
      {!hideBack && (
        <div className="sticky top-[70px] z-40 px-4 pt-3 bg-white/80 backdrop-blur">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="pt-20 px-6 pb-6">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default MainLayout;