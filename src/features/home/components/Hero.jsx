
// import heroImg from "@/assets/image 2.png";
// import { FaPaperPlane, FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Container from "@/components/ui/Container";

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="relative w-full h-screen sm:min-h-screen flex items-center overflow-hidden">

//       {/* 🔥 BACKGROUND IMAGE */}
//       <motion.div
//         initial={{ scale: 1 }}
//         animate={{ scale: 1.05 }}
//         transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
//         className="absolute inset-0"
//       >
//         <img
//           src={heroImg}
//           alt="Hero"
//           className="w-full h-full object-cover object-center"
//         />
//       </motion.div>

//       {/* 🔥 DARK PREMIUM OVERLAY */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

//       {/* 🔥 CONTENT */}
//       <div className="relative z-10 w-full">
//         <Container>

//           <div className="py-12 sm:py-16 lg:py-20">
//             <div className="max-w-xl lg:max-w-2xl">

//               {/* BADGE */}
//               <div className="inline-flex items-center gap-2 bg-[#82c600]/20 text-[#a3e635] px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md">
//                 <FaPaperPlane className="text-[10px]" />
//                 LEADING STUDENT NETWORK
//               </div>

//               {/* TITLE */}
//               <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
//                 Unlock Your <br />
//                 <span className="bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(163,230,53,0.4)]">
//                   Academic Potential
//                 </span>
//               </h1>

//               {/* DESCRIPTION */}
//               <p className="mt-5 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
//                 Join India's most advanced platform for student contests,
//                 real-world challenges, and career growth opportunities.
//               </p>

//               {/* BUTTONS */}
//               <div className="flex flex-col sm:flex-row gap-4 mt-8">

//                 <button
//                   onClick={() => navigate("/contests")}
//                   className="px-6 py-3 rounded-xl font-medium text-white 
//                   bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300]
//                   shadow-lg hover:shadow-[0_10px_40px_rgba(163,230,53,0.5)]
//                   hover:scale-105 active:scale-95
//                   transition-all duration-300
//                   w-full sm:w-auto"
//                 >
//                   Explore Contests →
//                 </button>

//                 <button
//                   onClick={() => navigate("/about")}
//                   className="px-6 py-3 rounded-xl font-medium text-white
//                   bg-white/10 backdrop-blur-md border border-white/20
//                   hover:bg-white/20 transition-all duration-300
//                   w-full sm:w-auto"
//                 >
//                   Learn More
//                 </button>

//               </div>

//               {/* STATS */}
//               <div className="flex flex-wrap gap-8 mt-10 border-t border-white/20 pt-6">
//                 <div>
//                   <p className="text-2xl font-bold text-white">10K+</p>
//                   <p className="text-xs text-gray-400">Students</p>
//                 </div>

//                 <div>
//                   <p className="text-2xl font-bold text-white">500+</p>
//                   <p className="text-xs text-gray-400">Contests</p>
//                 </div>

//                 <div>
//                   <p className="text-2xl font-bold text-white">100+</p>
//                   <p className="text-xs text-gray-400">Institutes</p>
//                 </div>
//               </div>

//             </div>
//           </div>

//         </Container>
//       </div>

//       {/* 🔥 MOBILE CARD */}
//       <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%]">
//         <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg text-center">
//           <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
//             <FaStar className="text-yellow-400" />
//             4.9 Rating
//           </div>
//           <p className="text-sm font-semibold mt-1">Top Performer</p>
//         </div>
//       </div>

//       {/* 🔥 DESKTOP CARDS (SAME BOTTOM ALIGN) */}
//       <div className="hidden lg:flex absolute right-8 xl:right-20 bottom-16 items-end gap-4">

//         {/* SMALL CARD */}
//         <motion.div
//           animate={{ y: [0, -8, 0] }}
//           transition={{ duration: 4, repeat: Infinity }}
//           className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-gray-100"
//         >
//           <FaStar className="text-yellow-400" />
//           44k+ Participating
//         </motion.div>

//         {/* MAIN CARD */}
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 3, repeat: Infinity }}
//           className="bg-white p-5 rounded-2xl shadow-xl w-[230px] border border-gray-100"
//         >
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <FaStar className="text-yellow-400" />
//             4.9 Rating
//           </div>

//           <h4 className="font-semibold mt-2 text-gray-900">
//             Top Performer
//           </h4>

//           <p className="text-xs text-gray-500 mt-1">
//             Olympiad Winner 2024
//           </p>
//         </motion.div>

//       </div>

//     </section>
//   );
// };

// export default Hero;


import heroImg from "@/assets/image 2.png";
import { FaPaperPlane, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { getAuthRole, isAuthenticated } from "@/utils/authStorage";

const Hero = () => {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  const role = getAuthRole();
  const isAdmin = role === "admin";
  const isStudent = role === "student";
  const primaryAction = {
    label: isAdmin
      ? "Open Admin Dashboard"
      : isStudent
        ? "Go to Dashboard"
        : "Explore Contests",
    path: isAdmin
      ? "/admin/dashboard"
      : isStudent
        ? "/student/dashboard"
        : "/contests",
  };
  const secondaryAction = {
    label: isLoggedIn ? "Browse Contests" : "Learn More",
    path: isLoggedIn ? "/contests" : "/about",
  };

  return (
    <section
      className="
      relative 
      w-screen 
      left-1/2 right-1/2 
      -ml-[50vw] -mr-[50vw] 
      h-[90vh] sm:h-screen 
      flex items-center 
      overflow-hidden
    "
    >
      {/* 🔥 BACKGROUND IMAGE */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* 🔥 OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-xl lg:max-w-2xl">

              {/* BADGE */}
              <div className="inline-flex items-center gap-2 bg-[#82c600]/20 text-[#a3e635] px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md">
                <FaPaperPlane className="text-[10px]" />
                LEADING STUDENT NETWORK
              </div>

              {/* TITLE */}
              <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Unlock Your <br />
                <span className="bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(163,230,53,0.4)]">
                  Academic Potential
                </span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-5 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
                Join India's most advanced platform for student contests,
                real-world challenges, and career growth opportunities.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                  onClick={() => navigate(primaryAction.path)}
                  className="px-6 py-3 rounded-xl font-medium text-white 
                  bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300]
                  shadow-lg hover:shadow-[0_10px_40px_rgba(163,230,53,0.5)]
                  hover:scale-105 active:scale-95
                  transition-all duration-300
                  w-full sm:w-auto"
                >
                  {primaryAction.label} →
                </button>

                <button
                  onClick={() => navigate(secondaryAction.path)}
                  className="px-6 py-3 rounded-xl font-medium text-white
                  bg-white/10 backdrop-blur-md border border-white/20
                  hover:bg-white/20 transition-all duration-300
                  w-full sm:w-auto"
                >
                  {secondaryAction.label}
                </button>

              </div>

              {/* STATS */}
              <div className="flex flex-wrap gap-8 mt-10 border-t border-white/20 pt-6">
                <div>
                  <p className="text-2xl font-bold text-white">10K+</p>
                  <p className="text-xs text-gray-400">Students</p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-xs text-gray-400">Contests</p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">100+</p>
                  <p className="text-xs text-gray-400">Institutes</p>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </div>

      {/* 🔥 MOBILE CARD */}
      <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%]">
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg text-center">
          <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
            <FaStar className="text-yellow-400" />
            4.9 Rating
          </div>
          <p className="text-sm font-semibold mt-1">Top Performer</p>
        </div>
      </div>

      {/* 🔥 DESKTOP CARDS */}
      <div className="hidden lg:flex absolute right-8 xl:right-20 bottom-16 items-end gap-4">

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-gray-100"
        >
          <FaStar className="text-yellow-400" />
          44k+ Participating
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="bg-white p-5 rounded-2xl shadow-xl w-[230px] border border-gray-100"
        >
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaStar className="text-yellow-400" />
            4.9 Rating
          </div>

          <h4 className="font-semibold mt-2 text-gray-900">
            Top Performer
          </h4>

          <p className="text-xs text-gray-500 mt-1">
            Olympiad Winner 2024
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
