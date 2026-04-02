// // components/Header.jsx
// import Container from "../Container";
// import Button from "../ui/Button";
// import { Link } from "react-router-dom";
// import logo from "../../assets/desun.png";

// const Header = () => {
//   return (
//     <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-white/20">

//       <Container>
//         <div className="flex items-center justify-between py-3">

//           {/* 🔥 LOGO */}
//           <div className="flex items-center gap-3">
//             <img
//               src={logo}
//               alt="Desun Academy"
//               className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain scale-110"
//             />

//             <div className="leading-tight">
//               <h1 className="font-bold text-base sm:text-lg">
//                 DESUN <span className="text-[#82c600]">ACADEMY</span>
//               </h1>
//               <p className="text-[11px] text-gray-500">
//                 Get Placed by Skills
//               </p>
//             </div>
//           </div>

//           {/* 🔥 NAV LINKS (BIGGER TEXT) */}
//           <nav className="hidden md:flex items-center gap-10 text-[16px] lg:text-[17px] font-semibold text-gray-800">

//             <a className="relative group cursor-pointer hover:text-[#82c600] transition">
//               Contests
//               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#82c600] transition-all group-hover:w-full"></span>
//             </a>

//             <a className="relative group cursor-pointer hover:text-[#82c600] transition">
//               Rankings
//               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#82c600] transition-all group-hover:w-full"></span>
//             </a>

//             <a className="relative group cursor-pointer hover:text-[#82c600] transition">
//               About
//               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#82c600] transition-all group-hover:w-full"></span>
//             </a>

//             <a className="relative group cursor-pointer hover:text-[#82c600] transition">
//               Support
//               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#82c600] transition-all group-hover:w-full"></span>
//             </a>

//           </nav>

//           {/* 🔥 RIGHT SIDE */}
//           <div className="flex items-center gap-5">

//             <Link
//               to="/login"
//                >
//               <Button
//               full={false}
//               size="sm"
//               className="shadow-md hover:scale-105 transition-transform"
//             >
//               Get Started
//             </Button>
//             </Link>

//             {/* BUTTON SAME */}
            

//           </div>

//         </div>
//       </Container>

//       {/* 🔥 PREMIUM BOTTOM LINE */}
//       <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#82c600]/40 to-transparent"></div>

//     </header>
//   );
// };

// export default Header;
// components/Header.jsx
// components/Header.jsx
import Container from "../Container";
import Button from "../ui/Button";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/desun.png";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const menuItems = [
    { name: "Contests", path: "/contests" },
    { name: "Rankings", path: "/rankings" },
    { name: "About", path: "/about" },
    { name: "Support", path: "/support" },
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