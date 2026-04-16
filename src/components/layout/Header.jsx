




// import Container from "@/components/ui/Container";
// import Button from "@/components/ui/Button";
// import ConfirmModal from "@/components/ui/ConfirmModal";
// import ThemeToggle from "@/components/ui/ThemeToggle";
// import { NavLink, Link } from "react-router-dom";
// import logo from "@/assets/desun.png";
// import { useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi";
// import { getAuthRole, isAuthenticated } from "@/utils/authStorage";
// import useLogoutConfirmation from "@/hooks/useLogoutConfirmation";

// const Header = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const {
//     isLogoutModalOpen,
//     isLoggingOut,
//     openLogoutModal,
//     closeLogoutModal,
//     confirmLogout,
//   } = useLogoutConfirmation({ redirectTo: "/" });

//   const isLoggedIn = isAuthenticated();
//   const role = getAuthRole();
//   const dashboardPath =
//     role === "admin" ? "/admin/dashboard" : "/student/dashboard";

//   const handleLogoutClick = () => {
//     setMobileOpen(false);
//     openLogoutModal();
//   };

//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "Contests", path: "/contests" },
//     ...(isLoggedIn
//       ? [
//           {
//             name: role === "admin" ? "Dashboard" : "Go to Dashboard",
//             path: dashboardPath,
//           },
//         ]
//       : []),
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 
//       backdrop-blur-xl bg-white/70 dark:bg-gray-900/70
//       border-b border-gray-200/30 dark:border-gray-700/30 shadow-sm">

//       <Container>
//         <div className="flex items-center justify-between w-full py-4">

//           {/* LOGO */}
//           <Link to="/" className="flex items-center gap-3">
//             <img
//               src={logo}
//               alt="Desun Academy"
//               className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
//             />
//             <div>
//               <h1 className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-white">
//                 DESUN <span className="text-[#82c600]">ACADEMY</span>
//               </h1>
//               <p className="text-xl font-bold text-[#f8bd1b] overflow-hidden whitespace-nowrap  border-[#82c600] pr-1 animate-typing">
//                 Get Placed by Skills
//               </p>
//             </div>
//           </Link>

//           {/* NAV */}
//           <nav className="hidden md:flex items-center gap-8 font-medium text-base lg:text-lg">
//             {menuItems.map((item) => (
//               <NavLink key={item.name} to={item.path}>
//                 {({ isActive }) => (
//                   <span
//                     className={`transition ${isActive
//                         ? "text-[#82c600] font-semibold"
//                         : "text-gray-700 dark:text-gray-200 hover:text-[#82c600]"
//                       }`}
//                   >
//                     {item.name}
//                   </span>
//                 )}
//               </NavLink>
//             ))}
//           </nav>

//           {/* RIGHT */}
//           <div className="flex items-center gap-3">

//             <ThemeToggle />

//             <div className="hidden md:block">
//               {isLoggedIn ? (
//                 <Button
//                   onClick={handleLogoutClick}
//                   className="rounded-full px-6 py-2"
//                 >
//                   Logout
//                 </Button>
//               ) : (
//                 <Link to="/login">
//                   <Button
//                     className="rounded-full px-6 py-2"
//                   >
//                     Get Started
//                   </Button>
//                 </Link>
//               )}
//             </div>

//             {/* MOBILE */}
//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               className="md:hidden p-2 text-gray-700 dark:text-gray-200"
//             >
//               {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//             </button>
//           </div>

//         </div>
//       </Container>

//       {/* MOBILE MENU */}
//       {mobileOpen && (
//         <div className="md:hidden bg-white dark:bg-gray-900 border-t px-4 py-4 space-y-3">

//           {menuItems.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               onClick={() => setMobileOpen(false)}
//               className={({ isActive }) =>
//                 `block py-2 px-3 rounded ${isActive
//                   ? "bg-[#82c600]/10 text-[#82c600]"
//                   : "text-gray-700 dark:text-gray-300"
//                 }`
//               }
//             >
//               {item.name}
//             </NavLink>
//           ))}

//           <div className="pt-2 border-t">
//             {isLoggedIn ? (
//               <Button onClick={handleLogoutClick} className="w-full">
//                 Logout
//               </Button>
//             ) : (
//               <Link to="/login">
//                 <Button className="w-full">Get Started</Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       )}

//       {/* MODAL */}
//       <ConfirmModal
//         isOpen={isLogoutModalOpen}
//         title="Logout now?"
//         message="Are you sure you want to logout?"
//         confirmLabel="Logout"
//         cancelLabel="Stay"
//         isLoading={isLoggingOut}
//         onCancel={closeLogoutModal}
//         onConfirm={confirmLogout}
//       />
//     </header>
//   );
// };

// export default Header;


import Container from "@/components/ui/Container";
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
            name: role === "admin" ? "Dashboard" : "Go to Dashboard",
            path: dashboardPath,
          },
        ]
      : []),
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 
      backdrop-blur-xl 
      bg-[var(--theme-surface)]/80 
      border-b border-[var(--theme-border)] 
      shadow-sm"
    >
      {/* ✅ FULL WIDTH WRAPPER (NO CONTAINER FOR LOGO) */}
      <div className="flex items-center justify-between w-full py-3 sm:py-4 px-3 sm:px-6 lg:px-10">

        {/* ✅ LOGO (TRUE LEFT EDGE) */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src={logo}
            alt="Desun Academy"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0"
          />

          <div className="leading-tight">
            <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-[var(--theme-text)]">
              DESUN <span className="text-[#82c600]">ACADEMY</span>
            </h1>

            <p className="text-xs sm:text-sm font-bold text-[#f8bd1b] overflow-hidden whitespace-nowrap pr-1 animate-typing">
              Get Placed by Skills
            </p>
          </div>
        </Link>

        {/* ✅ DESKTOP NAV + ACTIONS */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">

          <nav className="flex items-center gap-6 lg:gap-8 font-medium text-sm lg:text-base">
            {menuItems.map((item) => (
              <NavLink key={item.name} to={item.path}>
                {({ isActive }) => (
                  <span
                    className={`transition ${
                      isActive
                        ? "text-[#82c600] font-semibold"
                        : "text-[var(--theme-text-soft)] hover:text-[#82c600]"
                    }`}
                  >
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />

          {isLoggedIn ? (
            <Button
              onClick={handleLogoutClick}
              className="rounded-full px-5 py-2"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="rounded-full px-5 py-2">
                Get Started
              </Button>
            </Link>
          )}
        </div>

        {/* ✅ MOBILE RIGHT */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[var(--theme-text)]"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

      </div>

      {/* ✅ MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden 
          bg-[var(--theme-surface)] 
          border-t border-[var(--theme-border)] 
          px-4 py-4 space-y-3">

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#82c600]/10 text-[#82c600]"
                    : "text-[var(--theme-text-soft)] hover:bg-[var(--theme-surface-hover)]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-[var(--theme-border)]">
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

      {/* ✅ LOGOUT MODAL */}
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