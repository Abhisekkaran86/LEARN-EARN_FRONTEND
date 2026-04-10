// import { Bell, Search, LogOut } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../features/authSlice";
// import { useNavigate } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";

// const StudentHeader = ({ onSearch }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);

//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // ✅ Close on outside click
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
//     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-4 sm:px-6 py-4 rounded-2xl shadow-sm">

//       {/* LEFT */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">

//         {/* TITLE */}
//         <div>
//           <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
//             Student Dashboard
//           </h1>
//           <p className="text-xs text-gray-400">
//             Welcome back, {user?.name || "Student"} 👋
//           </p>
//         </div>

//         {/* SEARCH */}
//         <div className="flex items-center bg-[#f5f7fb] px-3 py-2 rounded-lg w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
//           <Search size={16} className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search contests..."
//             onChange={(e) => onSearch?.(e.target.value)}
//             className="bg-transparent outline-none text-sm w-full"
//           />
//         </div>

//       </div>

//       {/* RIGHT */}
//       <div className="flex items-center justify-between sm:justify-end gap-4">

//         {/* 🔔 Notification */}
//         <div className="relative cursor-pointer hover:scale-105 transition">
//           <Bell className="text-gray-500" />
//           <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#82C600] rounded-full"></span>
//         </div>

//         {/* 👤 Profile */}
//         <div className="relative" ref={dropdownRef}>

//           {/* Profile Button */}
//           <div
//             onClick={() => setOpen(!open)}
//             className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition"
//           >
//             {/* Avatar */}
//             <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#82C600]/20 text-[#82C600] flex items-center justify-center font-semibold text-sm sm:text-base">
//               {user?.name?.charAt(0) || "S"}
//             </div>

//             {/* Name + Role */}
//             <div className="hidden md:block">
//               <p className="text-sm font-medium text-gray-800">
//                 {user?.name || "Student"}
//               </p>
//               <p className="text-xs text-gray-400">
//                 {user?.role || "Student"}
//               </p>
//             </div>
//           </div>

//           {/* 🔽 DROPDOWN */}
//           <div
//             className={`absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 ${
//               open
//                 ? "opacity-100 scale-100 translate-y-0"
//                 : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
//             }`}
//           >
//             {/* Profile Info */}
//             <div className="px-4 py-3 border-b bg-gray-50">
//               <p className="text-sm font-medium text-gray-800 truncate">
//                 {user?.name || "Student"}
//               </p>
//               <p className="text-xs text-gray-400 truncate">
//                 {user?.email || "student@email.com"}
//               </p>
//             </div>

//             {/* 🔥 EXTRA STUDENT DETAILS */}
//             <div className="px-4 py-2 text-xs text-gray-500 space-y-1">
//               <p>ID: {user?._id || "N/A"}</p>
//               <p>Course: {user?.course || "Not Assigned"}</p>
//             </div>

//             {/* Logout */}
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
//             >
//               <LogOut size={16} />
//               Logout
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentHeader;

import { FaBell, FaSearch, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const StudentHeader = ({ onSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown
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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 
    bg-white px-3 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-4 w-full">

        {/* TITLE */}
        <div className="hidden sm:block">
          <h1 className="text-base sm:text-xl font-semibold text-gray-800">
            Student Dashboard
          </h1>
          <p className="text-xs text-gray-400">
            {user?.name || "Student"}
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex items-center bg-[#f5f7fb] px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg w-full sm:max-w-xs">
          <FaSearch className="text-gray-400 mr-2 text-sm" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="bg-transparent outline-none text-xs sm:text-sm w-full"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-between sm:justify-end gap-3">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-500 text-base sm:text-lg" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#82C600] rounded-full"></span>
        </div>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-xl sm:text-2xl text-gray-600"
          >
            <FaUserCircle />
          </div>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg transition-all duration-200 ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-800">
                {user?.name || "Student"}
              </p>
              <p className="text-xs text-gray-400">
                {user?.email || "student@email.com"}
              </p>
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

export default StudentHeader;