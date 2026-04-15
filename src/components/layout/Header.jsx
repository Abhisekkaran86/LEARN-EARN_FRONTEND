


// import Container from "@/components/ui/Container";
// import Button from "@/components/ui/Button";
// import ConfirmModal from "@/components/ui/ConfirmModal";
// import ThemeToggle from "@/components/ui/ThemeToggle";
// import { NavLink, Link } from "react-router-dom";
// import logo from "@/assets/desun.png";
// import { useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi";
// import { isAuthenticated } from "@/utils/authStorage";
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

//   const handleLogoutClick = () => {
//     setMobileOpen(false);
//     openLogoutModal();
//   };

//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "Contests", path: "/contests" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 h-[80px] backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border-b border-gray-200/40 dark:border-gray-700/40">

//       <Container>
//         <div className="flex items-center justify-between h-full">

//           {/* LOGO */}
//           <Link to="/" className="flex items-center gap-3">
//             <img
//               src={logo}
//               alt="Desun Academy"
//               className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
//             />
//             <div>
//               <h1 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
//                 DESUN <span className="text-[#82c600]">ACADEMY</span>
//               </h1>
//               <p className="text-[11px] text-gray-500 dark:text-gray-400">
//                 Get Placed by Skills
//               </p>
//             </div>
//           </Link>

//           {/* DESKTOP NAV */}
//           <nav className="hidden md:flex items-center gap-10 font-semibold text-gray-800 dark:text-gray-200">
//             {menuItems.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `relative group transition ${
//                     isActive ? "text-[#82c600]" : "hover:text-[#82c600]"
//                   }`
//                 }
//               >
//                 {item.name}
//                 <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#82c600] transition-all group-hover:w-full"></span>
//               </NavLink>
//             ))}
//           </nav>

//           {/* RIGHT */}
//           <div className="flex items-center gap-3">

//             <ThemeToggle />

//             <div className="hidden md:block">
//               {isLoggedIn ? (
//                 <Button onClick={handleLogoutClick} size="sm">
//                   Logout
//                 </Button>
//               ) : (
//                 <Link to="/login">
//                   <Button size="sm">Get Started</Button>
//                 </Link>
//               )}
//             </div>

//             {/* MOBILE */}
//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
//             >
//               {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
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
//               className="block py-2 px-3 rounded-lg"
//             >
//               {item.name}
//             </NavLink>
//           ))}

//           <div className="pt-2 border-t">
//             {isLoggedIn ? (
//               <Button onClick={handleLogoutClick} size="sm">
//                 Logout
//               </Button>
//             ) : (
//               <Link to="/login">
//                 <Button size="sm">Get Started</Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       )}

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
    <header className="fixed top-0 left-0 w-full z-50 
      backdrop-blur-xl bg-white/70 dark:bg-gray-900/70
      border-b border-gray-200/30 dark:border-gray-700/30 shadow-sm">

      <Container>
        <div className="flex items-center justify-between w-full py-4">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Desun Academy"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
            />
            <div>
              <h1 className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-white">
                DESUN <span className="text-[#82c600]">ACADEMY</span>
              </h1>
              <p className="text-xl font-bold text-[#ffd700] overflow-hidden whitespace-nowrap  border-[#82c600] pr-1 animate-typing">
                Get Placed by Skills
              </p>
            </div>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-base lg:text-lg">
            {menuItems.map((item) => (
              <NavLink key={item.name} to={item.path}>
                {({ isActive }) => (
                  <span
                    className={`transition ${isActive
                        ? "text-[#82c600] font-semibold"
                        : "text-gray-700 dark:text-gray-200 hover:text-[#82c600]"
                      }`}
                  >
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <ThemeToggle />

            <div className="hidden md:block">
              {isLoggedIn ? (
                <Button
                  onClick={handleLogoutClick}
                  className="rounded-full px-6 py-2"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button
                    className="rounded-full px-6 py-2"
                  >
                    Get Started
                  </Button>
                </Link>
              )}
            </div>

            {/* MOBILE */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-200"
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

        </div>
      </Container>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t px-4 py-4 space-y-3">

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 rounded ${isActive
                  ? "bg-[#82c600]/10 text-[#82c600]"
                  : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="pt-2 border-t">
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

      {/* MODAL */}
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
