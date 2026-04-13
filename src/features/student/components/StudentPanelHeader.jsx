import { useEffect, useRef, useState } from "react";
import { FaSearch, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NotificationBell from "@/components/ui/NotificationBell";
import { logout } from "@/features/auth/authSlice";

const StudentPanelHeader = ({ onSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const goToInvitations = () => {
    setOpen(false);
    navigate("/student/my-invitations");
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white px-3 py-2 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:px-6 sm:py-4">
      <div className="flex w-full items-center gap-2 sm:gap-4">
        <div className="hidden sm:block">
          <h1 className="text-base font-semibold text-gray-800 sm:text-xl">
            Student Dashboard
          </h1>
          <p className="text-xs text-gray-400">{user?.name || "Student"}</p>
        </div>

        <div className="flex w-full items-center rounded-lg bg-[#f5f7fb] px-2 py-1.5 sm:max-w-xs sm:px-3 sm:py-2">
          <FaSearch className="mr-2 text-sm text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-transparent text-xs outline-none sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <NotificationBell />

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer text-xl text-gray-600 sm:text-2xl"
            aria-label="Open profile menu"
          >
            <FaUserCircle />
          </button>

          <div
            className={`absolute right-0 mt-2 w-44 rounded-xl border bg-white shadow-lg transition-all duration-200 ${
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-800">
                {user?.name || "Student"}
              </p>
              <p className="text-xs text-gray-400">{user?.email || "student"}</p>
            </div>

            <button
              type="button"
              onClick={goToInvitations}
              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
            >
              My Invitations
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
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

export default StudentPanelHeader;
