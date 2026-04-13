

// import { FaBell, FaSearch, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "@/features/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";

// const AdminHeader = ({ onSearch }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);

//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // ✅ Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ✅ Logout
//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 
//     bg-white px-3 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl shadow-sm">

//       {/* LEFT */}
//       <div className="flex items-center gap-2 sm:gap-4 w-full">

//         {/* TITLE */}
//         <div className="hidden sm:block">
//           <h1 className="text-base sm:text-xl font-semibold text-gray-800">
//             Admin Dashboard
//           </h1>
//           <p className="text-xs text-gray-400">
//             {user?.name || "Admin"}
//           </p>
//         </div>

//         {/* SEARCH */}
//         <div className="flex items-center bg-[#f5f7fb] px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg w-full sm:max-w-xs">
//           <FaSearch className="text-gray-400 mr-2 text-sm" />
//           <input
//             type="text"
//             placeholder="Search..."
//             onChange={(e) => onSearch?.(e.target.value)}
//             className="bg-transparent outline-none text-xs sm:text-sm w-full"
//           />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="flex items-center justify-between sm:justify-end gap-3">

//         {/* 🔔 Notification */}
//         <div className="relative cursor-pointer">
//           <FaBell className="text-gray-500 text-base sm:text-lg" />
//           <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#82C600] rounded-full"></span>
//         </div>

//         {/* 👤 Profile */}
//         <div className="relative" ref={dropdownRef}>
//           <div
//             onClick={() => setOpen(!open)}
//             className="cursor-pointer text-xl sm:text-2xl text-gray-600"
//           >
//             <FaUserCircle />
//           </div>

//           {/* 🔽 DROPDOWN */}
//           <div
//             className={`absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg transition-all duration-200 ${
//               open
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 -translate-y-2 pointer-events-none"
//             }`}
//           >
//             <div className="px-3 py-2">
//               <p className="text-sm font-medium text-gray-800">
//                 {user?.name || "Admin"}
//               </p>
//               <p className="text-xs text-gray-400">
//                 {user?.email || "admin@email.com"}
//               </p>
//             </div>

//             {/* Logout */}
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-500 hover:bg-red-50"
//             >
//               <FaSignOutAlt />
//               Logout
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminHeader;


import {
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import API from "@/services/axios"; // ✅ ADD API

const AdminHeader = ({ onSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [hasNotification] = useState(false);

  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white px-3 py-3 shadow-sm sm:rounded-2xl sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between">

      {/* LEFT */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">

        <div>
          <h1 className="text-base font-semibold text-gray-800 sm:text-lg">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-400">
            {user?.name || "Admin"}
          </p>
        </div>

        <div className="flex w-full items-center rounded-lg bg-[#f5f7fb] px-3 py-2 lg:max-w-xs">
          <FaSearch className="mr-2 text-sm text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-between gap-4 sm:justify-end">

        {/* 🔔 Notification */}
        <div
          onClick={() => navigate("/admin/requests")}
          className="relative cursor-pointer text-gray-500"
        >
          <FaBell className="text-base sm:text-lg" />

          {hasNotification && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#82C600] rounded-full"></span>
          )}
        </div>

        {/* 👤 PROFILE */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-xl text-gray-600 sm:text-2xl"
          >
            <FaUserCircle />
          </div>

          <div
            className={`absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg transition ${
              open
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-500 hover:bg-red-50"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHeader;
