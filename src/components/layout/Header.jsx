
// components/Header.jsx
// components/Header.jsx
// import Container from "../Container";
// import Button from "../ui/Button";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/desun.png";
// import Cookies from "js-cookie";
// import { logoutUser, logout } from "../../features/authSlice";

// const Header = () => {
//   const navigate = useNavigate();

//   const token = Cookies.get("token");
//   const isLoggedIn = !!token;

  
// const LogoutButton = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser()).unwrap(); // API logout
//     } catch (err) {
//       console.log("API failed");
//     }

//     dispatch(logout()); // fallback (always run)
//     navigate("/login");
//   };

//   return <button onClick={handleLogout}>Logout</button>;
// };

// export default LogoutButton;
//   const menuItems = [
//     { name: "Contests", path: "/contests" },
    
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/Contact" },
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
//       <Container>
//         <div className="flex items-center justify-between py-3">
          
//           {/* LOGO */}
//           <Link to="/" className="flex items-center gap-3">
//             <img
//               src={logo}
//               alt="Desun Academy"
//               className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
//             />
//             <div>
//               <h1 className="font-bold text-base sm:text-lg">
//                 DESUN <span className="text-[#82c600]">ACADEMY</span>
//               </h1>
//               <p className="text-[11px] text-gray-500">
//                 Get Placed by Skills
//               </p>
//             </div>
//           </Link>

//           {/* NAV */}
//           <nav className="hidden md:flex items-center gap-10 font-semibold text-gray-800">
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
//           <div>
//             {isLoggedIn ? (
//               <Button onClick={handleLogout} size="sm">
//                 Logout
//               </Button>
//             ) : (
//               <Link to="/login">
//                 <Button size="sm">Get Started</Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </Container>

//       <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#82c600]/40 to-transparent"></div>
//     </header>
//   );
// };

// export default Header;

// import Container from "../Container";
// import Button from "../ui/Button";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/desun.png";
// import Cookies from "js-cookie";
// import { logoutUser, logout } from "../../features/authSlice";
// import { useDispatch } from "react-redux"; // ✅ ADD

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // ✅ ADD

//   const token = Cookies.get("token");
//   const isLoggedIn = !!token;

//   // ✅ FIX: move logout logic here
//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser()).unwrap(); // API logout
//     } catch (err) {
//       console.log("API failed");
//     }

//     dispatch(logout()); // fallback
//     navigate("/login");
//   };

//   const menuItems = [
//     { name: "Contests", path: "/contests" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/Contact" },
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
//       <Container>
//         <div className="flex items-center justify-between py-3">
          
//           {/* LOGO */}
//           <Link to="/" className="flex items-center gap-3">
//             <img
//               src={logo}
//               alt="Desun Academy"
//               className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
//             />
//             <div>
//               <h1 className="font-bold text-base sm:text-lg">
//                 DESUN <span className="text-[#82c600]">ACADEMY</span>
//               </h1>
//               <p className="text-[11px] text-gray-500">
//                 Get Placed by Skills
//               </p>
//             </div>
//           </Link>

//           {/* NAV */}
//           <nav className="hidden md:flex items-center gap-10 font-semibold text-gray-800">
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
//           <div>
//             {isLoggedIn ? (
//               <Button onClick={handleLogout} size="sm">
//                 Logout
//               </Button>
//             ) : (
//               <Link to="/login">
//                 <Button size="sm">Get Started</Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </Container>

//       <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#82c600]/40 to-transparent"></div>
//     </header>
//   );
// };

// export default Header;

import Container from "../Container";
import Button from "../ui/Button";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/desun.png";
// ❌ removed Cookies
import { logoutUser, logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ get token from localStorage
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // ✅ logout handler
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // API logout
    } catch (err) {
      console.log("API failed");
    }

    dispatch(logout()); // redux clear
    localStorage.removeItem("token"); // ✅ remove token
    navigate("/login");
  };

  const menuItems = [
    { name: "Contests", path: "/contests" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
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
              <h1 className="font-bold text-base sm:text-lg">
                DESUN <span className="text-[#82c600]">ACADEMY</span>
              </h1>
              <p className="text-[11px] text-gray-500">
                Get Placed by Skills
              </p>
            </div>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-10 font-semibold text-gray-800">
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

          {/* RIGHT */}
          <div>
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
        </div>
      </Container>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#82c600]/40 to-transparent"></div>
    </header>
  );
};

export default Header;