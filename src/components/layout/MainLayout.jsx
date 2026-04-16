// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const MainLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const path = location.pathname;

//   const isAdmin = path.startsWith("/admin");
//   const isStudent = path.startsWith("/student");

//   const hideBack =
//     path === "/" ||
//     path === "/admin" ||
//     path === "/student";

//   return (
//     <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative dark:bg-gray-950">

//       {/* HEADER */}
//       <Header />

//       {/* BACK BUTTON */}
//       {!hideBack && (
//         <div className="sticky top-[70px] z-40 px-4 pt-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
//           <button
//             onClick={() => navigate(-1)}
//             className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             <ArrowLeft size={18} />
//           </button>
//         </div>
//       )}

//       {/* MAIN CONTENT */}
//       <main className="pt-20 pb-6 w-full dark:text-white overflow-x-hidden">
//         <Outlet />
//       </main>

//       {/* FOOTER */}
//       <Footer />
//     </div>
//   );
// };

// export default MainLayout;

// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Container from "@/components/ui/Container";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const MainLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const path = location.pathname;

//   // ✅ HIDE HEADER for contest details page
//   const hideHeader = path.startsWith("/student/contest/");

//   const hideBack =
//     path === "/" ||
//     path === "/admin" ||
//     path === "/student" ||
//     hideHeader; // optional (hide back also)

//   return (
//     <div className="flex flex-col min-h-screen w-full overflow-x-hidden dark:bg-gray-950">

//       {/* ✅ HEADER */}
//       {!hideHeader && <Header />}

//       {/* ✅ BACK BUTTON */}
//       {!hideBack && (
//         <div className="sticky top-[80px] z-40 px-3 sm:px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
//           <button
//             onClick={() => navigate(-1)}
//             className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             <ArrowLeft size={18} />
//           </button>
//         </div>
//       )}

//       {/* ✅ MAIN */}
//       <main
//         className={`flex-1 pb-6 w-full dark:text-white ${
//           hideHeader ? "pt-0" : "pt-[80px]"
//         }`}
//       >
//         <Container>
//           <Outlet />
//         </Container>
//       </main>

//       {/* ✅ FOOTER */}
//       {!hideHeader && <Footer />}
//     </div>
//   );
// };

// export default MainLayout;


import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  // ✅ Hide header for contest details page
  const hideHeader = path.startsWith("/student/contest/");

  const hideBack =
    path === "/" ||
    path === "/admin" ||
    path === "/student" ||
    hideHeader;

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden dark:bg-gray-950">

      {/* ✅ HEADER */}
      {!hideHeader && <Header />}

      {/* ✅ BACK BUTTON */}
      {!hideBack && (
        <div className="sticky top-[80px] z-40 px-3 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      )}

      {/* ✅ MAIN FULL WIDTH */}
      <main
        className={`flex-1 w-full pb-6 dark:text-white ${
          hideHeader ? "pt-0" : "pt-[80px]"
        }`}
      >
        {/* ✅ TRUE FULL WIDTH (NO SIDE SPACE) */}
        <Outlet />
      </main>

      {/* ✅ FOOTER */}
      {!hideHeader && <Footer />}
    </div>
  );
};

export default MainLayout;