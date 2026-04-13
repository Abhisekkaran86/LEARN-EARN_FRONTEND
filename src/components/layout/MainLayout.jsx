import Header from "@/components/layout/Header";
import AppFooter from "@/components/layout/AppFooter";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const hideBack =
    path === "/" ||
    path === "/admin" ||
    path === "/student";

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden dark:bg-gray-950">

      {/* HEADER */}
      <Header />

      {/* BACK BUTTON */}
      {!hideBack && (
        <div className="sticky top-[70px] z-40 px-4 pt-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="pt-20 pb-6 w-full dark:text-white">
        <Outlet />
      </main>

      {/* FOOTER */}
      <AppFooter />
    </div>
  );
};

export default MainLayout;
// import Header from "../layout/Header";
// import Footer from "../layout/Footer";
// import socket from "../../socket";

// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useEffect } from "react";

// const MainLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const path = location.pathname;

//   const hideBack =
//     path === "/" ||
//     path === "/admin" ||
//     path === "/student";

//   // ✅ SOCKET CONNECTION
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     if (userId) {
//       socket.emit("join_user", userId);
//     }

//     const handleConnect = () => {
//       console.log("✅ Socket Connected:", socket.id);
//     };

//     const handleDisconnect = () => {
//       console.log("❌ Socket Disconnected");
//     };

//     socket.on("connect", handleConnect);
//     socket.on("disconnect", handleDisconnect);

//     return () => {
//       socket.off("connect", handleConnect);
//       socket.off("disconnect", handleDisconnect);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white dark:bg-gray-950">

//       {/* HEADER */}
//       <div className="fixed top-0 left-0 w-full z-50">
//         <Header />
//       </div>

//       {/* BACK BUTTON */}
//       {!hideBack && (
//         <div className="sticky top-[64px] sm:top-[72px] z-40 px-4 pt-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
//           <button
//             onClick={() => navigate(-1)}
//             className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//           >
//             <ArrowLeft size={18} />
//           </button>
//         </div>
//       )}

//       {/* MAIN CONTENT */}
//       <main className="flex-1 pt-[70px] sm:pt-[80px] pb-6 w-full dark:text-white">
//         <Outlet />
//       </main>

//       {/* FOOTER */}
//       <Footer />
//     </div>
//   );
// };

// export default MainLayout;
