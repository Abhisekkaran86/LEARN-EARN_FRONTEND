import Button from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { NavLink, Link } from "react-router-dom";
import logo from "@/assets/desun.png";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { getAuthRole, isAuthenticated } from "@/utils/authStorage";
import useLogoutConfirmation from "@/hooks/useLogoutConfirmation";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    isLogoutModalOpen,
    isLoggingOut,
    openLogoutModal,
    closeLogoutModal,
    confirmLogout,
  } = useLogoutConfirmation({ redirectTo: "/" });

  const isLoggedIn = isAuthenticated();
  const role = getAuthRole();
  const dashboardPath =
    role === "admin" ? "/admin/dashboard" : "/student/dashboard";

  const handleLogoutClick = () => {
    setMobileOpen(false);
    openLogoutModal();
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Contests", path: "/contests" },
    ...(isLoggedIn
      ? [
        {
          name: role === "admin" ? "Dashboard" : " Dashboard",
          path: dashboardPath,
        },
      ]
      : []),
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[var(--theme-border)] bg-[var(--theme-surface)] backdrop-blur-xl shadow-sm">
      <div className="flex w-full items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src={logo}
            alt="Desun Academy"
            className="h-10 w-10 flex-shrink-0 object-contain sm:h-12 sm:w-12"
          />

          <div className="leading-tight">
            <h1 className="text-lg font-bold text-[var(--theme-text)] sm:text-xl lg:text-2xl">
              DESUN <span className="text-[#82c600]">ACADEMY</span>
            </h1>
            <p className="animate-typing overflow-hidden whitespace-nowrap pr-1 text-xs font-bold text-[#f8bd1b] sm:text-sm">
              Get Placed by Skills
            </p>
          </div>
        </Link>

        <div className="ml-auto hidden items-center gap-6 md:flex lg:gap-8">
          <nav className="flex items-center gap-6 text-sm font-medium lg:gap-8 lg:text-base">
            {menuItems.map((item) => (
              <NavLink key={item.name} to={item.path}>
                {({ isActive }) => (
                  <span
                    className={`transition ${isActive
                      ? "font-semibold text-[#82c600]"
                      : "text-[var(--theme-text-soft)] hover:text-[#82c600]"
                      }`}
                  >
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-2 rounded-full bg-[var(--theme-surface-muted)] border border-[var(--theme-border)]">
            <ThemeToggle />
          </div>

          {isLoggedIn ? (
            <Button onClick={handleLogoutClick} className="rounded-full px-5 py-2">
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="rounded-full px-5 py-2">Get Started</Button>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="theme-icon-button p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="theme-surface space-y-3 border-t border-[var(--theme-border)] px-4 py-4 md:hidden">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 transition ${isActive
                  ? "bg-[#82c600]/10 text-[#82c600]"
                  : "text-[var(--theme-text-soft)] hover:bg-[var(--theme-surface-hover)]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="border-t border-[var(--theme-border)] pt-3">
            {isLoggedIn ? (
              <Button onClick={handleLogoutClick} className="w-full">
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button className="w-full">Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Logout now?"
        message="Are you sure you want to logout?"
        confirmLabel="Logout"
        cancelLabel="Stay"
        isLoading={isLoggingOut}
        onCancel={closeLogoutModal}
        onConfirm={confirmLogout}
      />
    </header>
  );
};

export default Header;
