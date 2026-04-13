import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "@/assets/desun.png";
import { logoutUser, logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { isAuthenticated } from "@/utils/authStorage";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = isAuthenticated();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch {
      /* silent */
    }
    dispatch(logout());
    navigate("/");
  };

  const menuItems = [
    { name: "Contests", path: "/contests" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border-b border-gray-200/40 dark:border-gray-700/40 transition-colors">
      <Container>
        <div className="flex items-center justify-between py-3">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Desun Academy"
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
            />
            <div>
              <h1 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                DESUN <span className="text-[#82c600]">ACADEMY</span>
              </h1>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Get Placed by Skills
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 font-semibold text-gray-800 dark:text-gray-200">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative group transition ${
                    isActive ? "text-[#82c600]" : "hover:text-[#82c600]"
                  }`
                }
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#82c600] transition-all group-hover:w-full"></span>
              </NavLink>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Auth Button (desktop) */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <Button onClick={handleLogout} size="sm">
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button size="sm">Get Started</Button>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

        </div>
      </Container>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-3 animate-[slideIn_0.3s_ease]">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-[#82c600]/10 text-[#82c600]"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            {isLoggedIn ? (
              <Button onClick={handleLogout} size="sm">
                Logout
              </Button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button size="sm">Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#82c600]/40 to-transparent"></div>
    </header>
  );
};

export default Header;
