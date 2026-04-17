import { useEffect, useRef, useState } from "react";
import { FaMoon, FaSearch, FaSignOutAlt, FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ConfirmModal from "@/components/ui/ConfirmModal";
import NotificationBell from "@/components/ui/NotificationBell";
import UserAvatar from "@/components/ui/UserAvatar";
import useLogoutConfirmation from "@/hooks/useLogoutConfirmation";
import { useTheme } from "@/context/ThemeContext";
import { formatRegistrationDate } from "@/utils/userProfile";

const StudentPanelHeader = ({ onSearch }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { dark, toggleTheme } = useTheme();
  const registrationLabel = formatRegistrationDate(user);

  const {
    isLogoutModalOpen,
    isLoggingOut,
    openLogoutModal,
    closeLogoutModal,
    confirmLogout,
  } = useLogoutConfirmation({ redirectTo: "/login" });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogoutClick = () => {
    setIsProfileOpen(false);
    openLogoutModal();
  };

  return (
    <div className="dashboard-header-surface flex flex-col gap-3 rounded-2xl px-3 py-3 sm:px-5 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="min-w-0">
          <h1 className="theme-text truncate text-base font-semibold sm:text-xl">
            Student Dashboard
          </h1>
          <p className="theme-text-muted truncate text-xs">
            {user?.name || "Student"}
          </p>
        </div>

        <div className="theme-surface-muted theme-border flex w-full items-center rounded-xl border px-3 py-2 lg:max-w-xs">
          <FaSearch className="theme-text-muted mr-2 text-sm" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => onSearch?.(event.target.value)}
            className="theme-text w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
        <button
          type="button"
          onClick={toggleTheme}
          className=""
          aria-label="Toggle theme"
        >
          {dark ? <FaSun size={25} /> : <FaMoon size={25} />}
        </button>

        <NotificationBell />

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((previous) => !previous)}
            className="cursor-pointer"
            aria-label="Open profile menu"
          >
            <UserAvatar
              user={user}
              size="sm"
              className="border border-white/40 shadow-sm"
            />
          </button>

          <div
            className={`theme-surface theme-border absolute right-0 mt-2 w-56 rounded-xl border shadow-lg transition-all duration-200 ${
              isProfileOpen
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 px-3 py-3">
              <UserAvatar user={user} size="md" />
              <div className="min-w-0">
                <p className="theme-text truncate text-sm font-medium">
                  {user?.name || "Student"}
                </p>
                <p className="theme-text-muted truncate text-xs">
                  {user?.email || "student"}
                </p>
                <p className="theme-text-muted mt-1 text-[11px]">
                  Joined {registrationLabel}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(false);
                navigate("/student/my-invitations");
              }}
              className="theme-text-soft hover:bg-[var(--theme-surface-hover)] flex w-full items-center gap-2 px-3 py-2 text-xs"
            >
              My Invitations
            </button>

            <button
              type="button"
              onClick={handleLogoutClick}
              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-500 hover:bg-rose-50/70 dark:hover:bg-rose-900/35"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>

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

export default StudentPanelHeader;
