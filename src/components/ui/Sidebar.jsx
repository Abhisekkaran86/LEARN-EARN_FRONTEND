


// import {
//   Settings,
//   HelpCircle,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
// import Button from "../ui/Button";

// const Sidebar = ({ menu = [] }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [collapsed, setCollapsed] = useState(false);

//   // ✅ Active path
//   const active = location.pathname;

//   // ✅ Handle navigation
//   const handleMenuClick = (item) => {
//     if (item.key) navigate(item.key);
//   };

//   return (
//     <div
//       className={`h-screen bg-[#eef2f7] flex flex-col justify-between p-4 transition-all duration-300 ${
//         collapsed ? "w-20" : "w-64"
//       }`}
//     >
//       {/* 🔥 TOP */}
//       <div>
//         {/* Logo + Toggle */}
//         <div className="flex items-center justify-between mb-8">
//           {!collapsed && (
//             <div className="flex items-center gap-2">
//               <div className="w-9 h-9 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white font-bold">
//                 ✦
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-800">
//                   Admin Panel
//                 </h2>
//                 <p className="text-xs text-gray-400">
//                   Command Center
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Toggle Button */}
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="p-2 rounded-lg hover:bg-white"
//           >
//             {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//           </button>
//         </div>

//         {/* Menu */}
//         <div className="space-y-2">
//           {menu.map((item, i) => {
//             const isActive = active === item.key;

//             return (
//               <div
//                 key={i}
//                 onClick={() => handleMenuClick(item)}
//                 className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all
//                   ${
//                     isActive
//                       ? "bg-white shadow-sm text-[#82C600]"
//                       : "text-gray-500 hover:bg-white/70"
//                   }
//                 `}
//               >
//                 {/* Icon */}
//                 <span className="text-lg">{item.icon}</span>

//                 {/* Label */}
//                 {!collapsed && (
//                   <span className="text-sm font-medium">
//                     {item.label}
//                   </span>
//                 )}

//                 {/* Tooltip (when collapsed) */}
//                 {collapsed && (
//                   <div className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
//                     {item.label}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* 🔥 BOTTOM */}
//       <div className="space-y-4">

//         {/* Create Button */}
//         <Button
//           variant="primary"
//           size="md"
//           leftIcon={!collapsed && <Plus size={16} />}
//           onClick={() => navigate("/admin/create-contest")}
//         >
//           {!collapsed && "Create"}
//         </Button>

//         {/* Bottom Links */}
//         <div className="space-y-2 text-sm text-gray-500">
//           <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
//             <Settings size={16} />
//             {!collapsed && "Settings"}
//           </div>

//           <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
//             <HelpCircle size={16} />
//             {!collapsed && "Help"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import {
//   Settings,
//   HelpCircle,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
// import Button from "../ui/Button";

// const Sidebar = ({ menu = [], title = "Panel", role = "admin" }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [collapsed, setCollapsed] = useState(false);

//   const active = location.pathname;

//   const handleMenuClick = (item) => {
//     if (item.key) navigate(item.key);
//   };

//   // 🎯 Dynamic create route (only used for admin)
//   const createPath =
//     role === "admin"
//       ? "/admin/create-contest"
//       : "/student/create";

//   return (
//     <div
//       className={`h-screen bg-[#eef2f7] flex flex-col justify-between p-4 transition-all duration-300 ${
//         collapsed ? "w-20" : "w-64"
//       }`}
//     >
//       {/* 🔥 TOP */}
//       <div>
//         {/* Logo + Toggle */}
//         <div className="flex items-center justify-between mb-8">
//           {!collapsed && (
//             <div className="flex items-center gap-2">
//               <div className="w-9 h-9 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white font-bold">
//                 ✦
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-800">
//                   {title}
//                 </h2>

//                 <p className="text-xs text-gray-400">
//                   {role === "admin"
//                     ? "Command Center"
//                     : "Student Panel"}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Toggle */}
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="p-2 rounded-lg hover:bg-white"
//           >
//             {collapsed ? (
//               <ChevronRight size={18} />
//             ) : (
//               <ChevronLeft size={18} />
//             )}
//           </button>
//         </div>

//         {/* MENU */}
//         <div className="space-y-2">
//           {menu.map((item, i) => {
//             const isActive = active === item.key;

//             return (
//               <div
//                 key={i}
//                 onClick={() => handleMenuClick(item)}
//                 className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all
//                   ${
//                     isActive
//                       ? "bg-white shadow-sm text-[#82C600]"
//                       : "text-gray-500 hover:bg-white/70"
//                   }
//                 `}
//               >
//                 <span className="text-lg">{item.icon}</span>

//                 {!collapsed && (
//                   <span className="text-sm font-medium">
//                     {item.label}
//                   </span>
//                 )}

//                 {/* Tooltip when collapsed */}
//                 {collapsed && (
//                   <div className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
//                     {item.label}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* 🔥 BOTTOM */}
//       <div className="space-y-4">

//         {/* ✅ SHOW ONLY FOR ADMIN */}
//         {role === "admin" && (
//           <Button
//             variant="primary"
//             size="md"
//             leftIcon={!collapsed && <Plus size={16} />}
//             onClick={() => navigate(createPath)}
//           >
//             {!collapsed && "Create"}
//           </Button>
//         )}

//         {/* Bottom Links */}
//         <div className="space-y-2 text-sm text-gray-500">
//           <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
//             <Settings size={16} />
//             {!collapsed && "Settings"}
//           </div>

//           <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
//             <HelpCircle size={16} />
//             {!collapsed && "Help"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// import {
//   Settings,
//   HelpCircle,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import Button from "../ui/Button";

// const Sidebar = ({ menu = [], title = "Panel", role = "admin" }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [collapsed, setCollapsed] = useState(false);

//   const active = location.pathname;

//   const handleMenuClick = (item) => {
//     if (item.key) navigate(item.key);
//   };

//   // ✅ LOGOUT WITH API
//   const handleLogout = async () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (!confirmLogout) return;

//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "https://learn-earn-contest-2.onrender.com/api/v1/auth/user/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     } catch (error) {
//       console.log("Logout API error:", error);
//     } finally {
//       localStorage.removeItem("token");
//       sessionStorage.clear();
//       navigate("/");
//     }
//   };

//   const createPath =
//     role === "admin"
//       ? "/admin/create-contest"
//       : "/student/create";

//   return (
//     <div
//       className={`h-screen bg-[#eef2f7] flex flex-col justify-between p-4 transition-all duration-300 border-r
//       ${collapsed ? "w-20" : "w-64"}`}
//     >
//       {/* 🔥 TOP */}
//       <div>
//         {/* Logo + Toggle */}
//         <div className="flex items-center justify-between mb-8">
//           {!collapsed && (
//             <div className="flex items-center gap-2">
//               <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow">
//                 ✦
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-800">
//                   {title}
//                 </h2>
//                 <p className="text-xs text-gray-400">
//                   {role === "admin"
//                     ? "Command Center"
//                     : "Student Panel"}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Toggle */}
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="p-2 rounded-lg hover:bg-white transition"
//           >
//             {collapsed ? (
//               <ChevronRight size={18} />
//             ) : (
//               <ChevronLeft size={18} />
//             )}
//           </button>
//         </div>

//         {/* MENU */}
//         <div className="space-y-2">
//           {menu.map((item, i) => {
//             const isActive = active === item.key;

//             return (
//               <div
//                 key={i}
//                 onClick={() => handleMenuClick(item)}
//                 className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all
//                 ${
//                   isActive
//                     ? "bg-white shadow-sm text-[#82C600] border-l-4 border-[#82C600]"
//                     : "text-gray-500 hover:bg-white/70"
//                 }`}
//               >
//                 <span className="text-lg">{item.icon}</span>

//                 {!collapsed && (
//                   <span className="text-sm font-medium">
//                     {item.label}
//                   </span>
//                 )}

//                 {/* Tooltip */}
//                 {collapsed && (
//                   <div className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
//                     {item.label}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* 🔥 BOTTOM */}
//       <div className="space-y-4">

//         {/* Create Button */}
//         {role === "admin" && (
//           <Button
//             variant="primary"
//             size="md"
//             leftIcon={!collapsed && <Plus size={16} />}
//             onClick={() => navigate(createPath)}
//           >
//             {!collapsed && "Create"}
//           </Button>
//         )}

//         {/* Bottom Links */}
//         <div className="space-y-2 text-sm text-gray-500">
//           <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700 transition">
//             <Settings size={16} />
//             {!collapsed && "Settings"}
//           </div>

//           <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700 transition">
//             <HelpCircle size={16} />
//             {!collapsed && "Help"}
//           </div>
//         </div>

//         {/* 🔥 GREEN LOGOUT BUTTON */}
//         <div className="pt-3 border-t">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-between px-4 py-3 rounded-xl
//             bg-[#82C600] text-white shadow-sm
//             hover:bg-[#74b000] active:scale-[0.98]
//             transition-all duration-200 group"
//           >
//             <div className="flex items-center gap-3">
//               <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition">
//                 <LogOut size={16} />
//               </div>
//               {!collapsed && (
//                 <span className="font-medium">Logout</span>
//               )}
//             </div>

//             {!collapsed && (
//               <span className="opacity-70 group-hover:translate-x-1 transition">
//                 →
//               </span>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import {
  Plus,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Button from "../ui/Button";

const Sidebar = ({ menu = [], title = "Panel", role = "admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = location.pathname;

  const handleMenuClick = (item) => {
    if (item.key) {
      navigate(item.key);
      setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://learn-earn-contest-2.onrender.com/api/v1/auth/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Logout API error:", error);
    } finally {
      localStorage.removeItem("token");
      sessionStorage.clear();
      navigate("/");
    }
  };

  const createPath =
    role === "admin"
      ? "/admin/create-contest"
      : "/student/create";

  return (
    <>
      {/* 🔥 MOBILE HEADER */}
      <div className="lg:hidden fixed top- left-0 w-full  bg-white border-b z-50 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        {/* <h2 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">
          {title}
        </h2> */}

        <div className="w-8" />
      </div>

      {/* 🔥 OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen bg-[#eef2f7] flex flex-col justify-between p-4 transition-all duration-300 border-r z-50
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* 🔥 TOP */}
        <div className="pt-4">

          {/* LOGO + TOGGLE */}
          <div className="flex items-center justify-between mb-6">

            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow">
                  ✦
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-800">
                    {title}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {role === "admin"
                      ? "Command Center"
                      : "Student Panel"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              {/* Desktop Collapse */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:block p-2 rounded-lg hover:bg-white"
              >
                {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>

              {/* Mobile Close */}
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* MENU */}
          <div className="space-y-2">
            {menu.map((item, i) => {
              const isActive = active === item.key;

              return (
                <div
                  key={i}
                  onClick={() => handleMenuClick(item)}
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-white shadow-sm text-[#82C600] border-l-4 border-[#82C600]"
                      : "text-gray-500 hover:bg-white/70"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>

                  {!collapsed && (
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  )}

                  {collapsed && (
                    <div className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 🔥 BOTTOM */}
        <div className="space-y-4">

          {/* Create Button */}
          {role === "admin" && (
            <Button
              variant="primary"
              size="md"
              leftIcon={!collapsed && <Plus size={16} />}
              onClick={() => navigate(createPath)}
            >
              {!collapsed && "Create"}
            </Button>
          )}

          {/* 🔥 LOGOUT BUTTON */}
          <div className="pt-2 border-t">
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center 
                ${collapsed ? "justify-center" : "justify-between"}
                px-3 sm:px-4 py-2.5 sm:py-3 
                rounded-xl bg-[#82C600] text-white 
                shadow-sm hover:bg-[#74b000] 
                active:scale-[0.98] transition-all duration-200 group
              `}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-lg bg-white/20">
                  <LogOut size={16} />
                </div>

                {!collapsed && (
                  <span className="text-sm font-medium">
                    Logout
                  </span>
                )}
              </div>

              {!collapsed && (
                <span className="text-sm opacity-70 group-hover:translate-x-1 transition">
                  →
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;