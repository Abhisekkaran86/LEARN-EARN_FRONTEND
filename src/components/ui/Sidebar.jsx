


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

import {
  Settings,
  HelpCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "../ui/Button";
const Sidebar = ({ menu = [], title = "Panel", role = "admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const active = location.pathname;

  const handleMenuClick = (item) => {
    if (item.key) navigate(item.key);
  };

  // 🎯 Dynamic create route
  const createPath =
    role === "admin"
      ? "/admin/create-contest"
      : "/student/create";

  return (
    <div
      className={`h-screen bg-[#eef2f7] flex flex-col justify-between p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* 🔥 TOP */}
      <div>
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white font-bold">
                ✦
              </div>
              <div>
                {/* ✅ Dynamic Title */}
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

          {/* Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* MENU */}
        <div className="space-y-2">
          {menu.map((item, i) => {
            const isActive = active === item.key;

            return (
              <div
                key={i}
                onClick={() => handleMenuClick(item)}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-white shadow-sm text-[#82C600]"
                      : "text-gray-500 hover:bg-white/70"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>

                {!collapsed && (
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                )}

                {collapsed && (
                  <div className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
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
        
        {/* ✅ Dynamic Create Button */}
        <Button
          variant="primary"
          size="md"
          leftIcon={!collapsed && <Plus size={16} />}
          onClick={() => navigate(createPath)}
        >
          {!collapsed && "Create"}
        </Button>

        {/* Bottom */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
            <Settings size={16} />
            {!collapsed && "Settings"}
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
            <HelpCircle size={16} />
            {!collapsed && "Help"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;