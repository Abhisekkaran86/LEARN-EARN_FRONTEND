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

  const isAdmin = path.startsWith("/admin");
  const isStudent = path.startsWith("/student");

  const hideBack =
    path === "/" ||
    path === "/admin" ||
    path === "/student";

  const getFallbackRoute = () => {
    if (isAdmin) return "/admin";
    if (isStudent) return "/student";
    return "/";
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">

      {/* HEADER */}
      <Header />

      {/* BACK BUTTON */}
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

      {/* 🔥 FIXED MAIN */}
      <main className="pt-20 pb-6 w-full">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default MainLayout;