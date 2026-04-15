// import { useEffect, useRef, useState } from "react";
// import { FaBell, FaSearch, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import ConfirmModal from "@/components/ui/ConfirmModal";
// import useLogoutConfirmation from "@/hooks/useLogoutConfirmation";

// const AdminHeaderBar = ({ onSearch }) => {
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   const { user } = useSelector((state) => state.auth);
//   const [open, setOpen] = useState(false);
//   const [hasNotification] = useState(false);
//   const {
//     isLogoutModalOpen,
//     isLoggingOut,
//     openLogoutModal,
//     closeLogoutModal,
//     confirmLogout,
//   } = useLogoutConfirmation({ redirectTo: "/login" });

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogoutClick = () => {
//     setOpen(false);
//     openLogoutModal();
//   };

//   return (
//     <div className="flex flex-col gap-3 rounded-xl bg-white px-3 py-3 shadow-sm sm:rounded-2xl sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
//       <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
//         <div>
//           <h1 className="text-base font-semibold text-gray-800 sm:text-lg">
//             Admin Dashboard
//           </h1>
//           <p className="text-xs text-gray-400">{user?.name || "Admin"}</p>
//         </div>

//         <div className="flex w-full items-center rounded-lg bg-[#f5f7fb] px-3 py-2 lg:max-w-xs">
//           <FaSearch className="mr-2 text-sm text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             onChange={(e) => onSearch?.(e.target.value)}
//             className="w-full bg-transparent text-sm outline-none"
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-between gap-4 sm:justify-end">
//         <div
//           onClick={() => navigate("/admin/requests")}
//           className="relative cursor-pointer text-gray-500"
//         >
//           <FaBell className="text-base sm:text-lg" />

//           {hasNotification && (
//             <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#82C600]"></span>
//           )}
//         </div>

//         <div className="relative" ref={dropdownRef}>
//           <button
//             type="button"
//             onClick={() => setOpen((prev) => !prev)}
//             className="cursor-pointer text-xl text-gray-600 sm:text-2xl"
//             aria-label="Open admin profile menu"
//           >
//             <FaUserCircle />
//           </button>

//           <div
//             className={`absolute right-0 mt-2 w-44 rounded-xl border bg-white shadow-lg transition ${
//               open ? "opacity-100" : "pointer-events-none opacity-0"
//             }`}
//           >
//             <div className="px-3 py-2">
//               <p className="text-sm font-medium">{user?.name || "Admin"}</p>
//               <p className="text-xs text-gray-400">
//                 {user?.email || "admin"}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={handleLogoutClick}
//               className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
//             >
//               <FaSignOutAlt />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       <ConfirmModal
//         isOpen={isLogoutModalOpen}
//         title="Logout now?"
//         message="Are you sure you want to logout from your account?"
//         confirmLabel="Logout"
//         cancelLabel="Cancel"
//         isLoading={isLoggingOut}
//         onCancel={closeLogoutModal}
//         onConfirm={confirmLogout}
//       />
//     </div>
//   );
// };

// export default AdminHeaderBar;



import { useEffect, useRef, useState } from "react";
import { FaBell, FaMoon, FaSearch, FaSignOutAlt, FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ConfirmModal from "@/components/ui/ConfirmModal";
import UserAvatar from "@/components/ui/UserAvatar";
import useLogoutConfirmation from "@/hooks/useLogoutConfirmation";
import { useTheme } from "@/context/ThemeContext"; // ✅ ADD

import { formatRegistrationDate } from "@/utils/userProfile";

const AdminHeaderBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [hasNotification] = useState(false);

  // ✅ THEME
  const { dark, toggleTheme } = useTheme();

  const {
    isLogoutModalOpen,
    isLoggingOut,
    openLogoutModal,
    closeLogoutModal,
    confirmLogout,
  } = useLogoutConfirmation({ redirectTo: "/login" });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setOpen(false);
    openLogoutModal();
  };

  const registrationLabel = formatRegistrationDate(user);

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-gray-900 px-3 py-3 shadow-sm sm:rounded-2xl sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between">

      {/* LEFT */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div>
          <h1 className="text-base font-semibold text-gray-800 dark:text-white sm:text-lg">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-300">
            {user?.name || "Admin"}
          </p>
        </div>

        <div className="flex w-full items-center rounded-lg bg-[#f5f7fb] dark:bg-gray-800 px-3 py-2 lg:max-w-xs">
          <FaSearch className="mr-2 text-sm text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-transparent text-sm outline-none text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-between gap-4 sm:justify-end w-full sm:w-auto">

        {/* 🌙 THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md 
          bg-gray-200 dark:bg-gray-700 
          text-gray-700 dark:text-gray-200 
          flex-shrink-0 transition"
        >
          {dark ? <FaSun size={14} /> :<FaMoon size={14}  />}
        </button>

        {/* 🔔 Notification */}
        <div
          onClick={() => navigate("/admin/requests")}
          className="relative cursor-pointer text-gray-500 dark:text-gray-300"
        >
          <FaBell className="text-base sm:text-lg" />

          {hasNotification && (
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#82C600]"></span>
          )}
        </div>

        {/* 👤 PROFILE */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer"
            aria-label="Open admin profile menu"
          >
            <UserAvatar
              user={user}
              size="sm"
              className="border border-white/40 shadow-sm"
            />
          </button>

          <div
            className={`absolute right-0 mt-2 w-56 rounded-xl border bg-white dark:bg-gray-800 shadow-lg transition ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 px-3 py-3">
              <UserAvatar user={user} size="md" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-white">
                  {user?.name || "Admin"}
                </p>
                <p className="truncate text-xs text-gray-400 dark:text-gray-300">
                  {user?.email || "admin"}
                </p>
                <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-400">
                  Joined {registrationLabel}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogoutClick}
              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Logout now?"
        message="Are you sure you want to logout from your account?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        isLoading={isLoggingOut}
        onCancel={closeLogoutModal}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default AdminHeaderBar;
