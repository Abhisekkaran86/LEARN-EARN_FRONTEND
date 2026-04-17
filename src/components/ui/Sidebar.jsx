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
import Button from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import useLogoutConfirmation from "@/hooks/useLogoutConfirmation";

const Sidebar = ({ menu = [], title = "Panel", role = "admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    isLogoutModalOpen,
    isLoggingOut,
    openLogoutModal,
    closeLogoutModal,
    confirmLogout,
  } = useLogoutConfirmation({ redirectTo: "/login" });

  const active = location.pathname;

  const handleMenuClick = (item) => {
    if (item.key) {
      navigate(item.key);
      setMobileOpen(false);
    }
  };

  const handleLogoutClick = () => {
    setMobileOpen(false);
    openLogoutModal();
  };

  const createPath =
    role === "admin" ? "/admin/create-contest" : "/student/create";

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="dashboard-header-surface fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b px-4 py-2 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="theme-icon-button rounded-lg p-2"
        >
          <Menu size={22} />
        </button>
        <div className="w-8" />
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-[var(--theme-overlay)] backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen
          bg-[var(--theme-surface-muted)]
          flex flex-col justify-between p-4
          transition-all duration-300
          border-r border-[var(--theme-border)] z-50
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* TOP */}
        <div className="pt-4">

          {/* LOGO + TOGGLE */}
          <div className="flex items-center justify-between mb-6">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow">
                  D
                </div>
                <div>
                  <h2 className="theme-text text-sm font-semibold">
                    {title}
                  </h2>
                  <p className="theme-text-muted text-xs">
                    {role === "admin" ? "Command Center" : "Student Panel"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="theme-icon-button hidden rounded-lg p-2 lg:block"
              >
                {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="theme-icon-button rounded-lg p-2 lg:hidden"
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
                        ? "theme-surface text-[#82C600] border-l-4 border-[#82C600]"
                        : "theme-text-muted hover:bg-[var(--theme-surface-hover)]"
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                  {collapsed && (
                    <div className="theme-surface theme-text absolute left-14 rounded px-2 py-1 text-xs opacity-0 shadow-sm group-hover:opacity-100">
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="space-y-4">

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

          {/* LOGOUT BUTTON */}
          <div className="theme-border pt-2 border-t">
            <button
              onClick={handleLogoutClick}
              className={`
                theme-brand-button w-full flex items-center
                ${collapsed ? "justify-center" : "justify-between"}
                px-3 sm:px-4 py-2.5 sm:py-3
                rounded-xl
                active:scale-[0.98] transition-all duration-200 group
              `}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-lg bg-white/20">
                  <LogOut size={16} />
                </div>
                {!collapsed && (
                  <span className="text-sm font-medium">Logout</span>
                )}
              </div>
              {!collapsed && (
                <span className="text-sm opacity-70 group-hover:translate-x-1 transition">
                  
                </span>
              )}
            </button>
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
    </>
  );
};

export default Sidebar;
