

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

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import API from "@/services/axios"; // ✅ ADD API

const AdminHeader = ({ onSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const dropdownRef = useRef(null);

  // ✅ REPLACE SOCKET WITH API POLLING
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get("/admin/requests"); // 👈 your API

        if (res.data?.requests?.length > 0) {
          setHasNotification(true);
        } else {
          setHasNotification(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    // initial call
    fetchRequests();

    // polling every 10 sec
    const interval = setInterval(fetchRequests, 10000);

    return () => clearInterval(interval);
  }, []);

  // outside click
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
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 rounded-2xl shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-4 w-full">

        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-400">
            {user?.name || "Admin"}
          </p>
        </div>

        <div className="flex items-center bg-[#f5f7fb] px-3 py-2 rounded-lg w-full max-w-xs">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* 🔔 Notification */}
        <div
          onClick={() => navigate("/admin/requests")}
          className="relative cursor-pointer"
        >
          <FaBell className="text-gray-500 text-lg" />

          {hasNotification && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#82C600] rounded-full"></span>
          )}
        </div>

        {/* 👤 PROFILE */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-2xl text-gray-600"
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