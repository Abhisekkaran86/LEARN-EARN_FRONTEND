// import { Bell, Search } from "lucide-react";

// const AdminHeader = ({ user = {}, onSearch }) => {
//   return (
//     <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-sm">
      
//       {/* LEFT: Title + Search */}
//       <div className="flex items-center gap-4 w-full max-w-xl">
        
//         {/* Title */}
//         <div>
//           <h1 className="text-xl font-semibold text-gray-800">
//             Dashboard
//           </h1>
//           <p className="text-xs text-gray-400">
//             Welcome back, Admin 👋
//           </p>
//         </div>

//         {/* Search */}
//         <div className="flex items-center bg-[#f5f7fb] px-3 py-2 rounded-lg w-full">
//           <Search size={16} className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search anything..."
//             onChange={(e) => onSearch?.(e.target.value)}
//             className="bg-transparent outline-none text-sm w-full"
//           />
//         </div>
//       </div>

//       {/* RIGHT: Actions */}
//       <div className="flex items-center gap-4">
        
//         {/* Notification */}
//         <div className="relative cursor-pointer">
//           <Bell className="text-gray-500" />
//           <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#82C600] rounded-full"></span>
//         </div>

//         {/* Profile */}
//         <div className="flex items-center gap-3 cursor-pointer">
          
//           {/* Avatar */}
//           <div className="w-10 h-10 rounded-full bg-[#82C600]/20 text-[#82C600] flex items-center justify-center font-semibold">
//             {user?.name?.charAt(0) || "A"}
//           </div>

//           {/* Name + Role */}
//           <div className="hidden sm:block">
//             <p className="text-sm font-medium text-gray-800">
//               {user?.name || "Admin"}
//             </p>
//             <p className="text-xs text-gray-400">
//               {user?.role || "Super Admin"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminHeader;

import { Bell, Search, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/authSlice"; // adjust path if needed
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const AdminHeader = ({ onSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Redux user
  const { user } = useSelector((state) => state.auth);

  // ✅ Dropdown state
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Close on outside click
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

  // ✅ Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-sm">
      
      {/* LEFT */}
      <div className="flex items-center gap-4 w-full max-w-xl">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Dashboard
          </h1>
          <p className="text-xs text-gray-400">
            Welcome back, {user?.name || "Admin"} 👋
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center bg-[#f5f7fb] px-3 py-2 rounded-lg w-full">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search anything..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        
        {/* Notification */}
        <div className="relative cursor-pointer hover:scale-105 transition">
          <Bell className="text-gray-500" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#82C600] rounded-full"></span>
        </div>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          
          {/* Profile Button */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#82C600]/20 text-[#82C600] flex items-center justify-center font-semibold">
              {user?.name?.charAt(0) || "A"}
            </div>

            {/* Name + Role */}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-400">
                {user?.role || "Admin"}
              </p>
            </div>
          </div>

          {/* 🔥 DROPDOWN */}
          <div
            className={`absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 ${
              open
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            {/* Profile Info */}
            <div className="px-4 py-3 border-b bg-gray-50">
              <p className="text-sm font-medium text-gray-800">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-400">
                {user?.email || "admin@email.com"}
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminHeader;