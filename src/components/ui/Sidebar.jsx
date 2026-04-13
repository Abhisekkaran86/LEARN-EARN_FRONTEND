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
import Button from "@/components/ui/Button";
import { clearAuthSession, getAuthToken } from "@/utils/authStorage";

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
      const token = getAuthToken();
      await axios.post(
        "https://learn-earn-contest-3.onrender.com/api/v1/auth/user/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch {
      /* silent */
    } finally {
      clearAuthSession();
      sessionStorage.clear();
      navigate("/");
    }
  };

  const createPath =
    role === "admin" ? "/admin/create-contest" : "/student/create";

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white dark:bg-gray-900 z-50 flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
        >
          <Menu size={22} />
        </button>
        <div className="w-8" />
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen
          bg-[#eef2f7] dark:bg-gray-900
          flex flex-col justify-between p-4
          transition-all duration-300
          border-r border-gray-200 dark:border-gray-700 z-50
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
                  ✦
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {title}
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {role === "admin" ? "Command Center" : "Student Panel"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:block p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
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
                        ? "bg-white dark:bg-gray-800 shadow-sm text-[#82C600] border-l-4 border-[#82C600]"
                        : "text-gray-500 dark:text-gray-400 hover:bg-white/70 dark:hover:bg-gray-800/70"
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
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
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
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
                  <span className="text-sm font-medium">Logout</span>
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
