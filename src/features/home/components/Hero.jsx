
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


// import heroImg from "@/assets/image 2.png";
// import { FaPaperPlane, FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Container from "@/components/ui/Container";
// import { getAuthRole, isAuthenticated } from "@/utils/authStorage";

// const Hero = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = isAuthenticated();
//   const role = getAuthRole();
//   const isAdmin = role === "admin";
//   const isStudent = role === "student";
//   const primaryAction = {
//     label: isAdmin
//       ? "Open Admin Dashboard"
//       : isStudent
//         ? "Go to Dashboard"
//         : "Explore Contests",
//     path: isAdmin
//       ? "/admin/dashboard"
//       : isStudent
//         ? "/student/dashboard"
//         : "/contests",
//   };
//   const secondaryAction = {
//     label: isLoggedIn ? "Browse Contests" : "Learn More",
//     path: isLoggedIn ? "/contests" : "/about",
//   };

//   return (
//     <section
//       className="
//       relative 
//       w-screen 
//       left-1/2 right-1/2 
//       -ml-[50vw] -mr-[50vw] 
//       h-[90vh] sm:h-screen 
//       flex items-center 
//       overflow-hidden
//     "
//     >
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

//       {/* 🔥 OVERLAY */}
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
//                   onClick={() => navigate(primaryAction.path)}
//                   className="px-6 py-3 rounded-xl font-medium text-white 
//                   bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300]
//                   shadow-lg hover:shadow-[0_10px_40px_rgba(163,230,53,0.5)]
//                   hover:scale-105 active:scale-95
//                   transition-all duration-300
//                   w-full sm:w-auto"
//                 >
//                   {primaryAction.label} →
//                 </button>

//                 <button
//                   onClick={() => navigate(secondaryAction.path)}
//                   className="px-6 py-3 rounded-xl font-medium text-white
//                   bg-white/10 backdrop-blur-md border border-white/20
//                   hover:bg-white/20 transition-all duration-300
//                   w-full sm:w-auto"
//                 >
//                   {secondaryAction.label}
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

//       {/* 🔥 DESKTOP CARDS */}
//       <div className="hidden lg:flex absolute right-8 xl:right-20 bottom-16 items-end gap-4">

//         <motion.div
//           animate={{ y: [0, -8, 0] }}
//           transition={{ duration: 4, repeat: Infinity }}
//           className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-gray-100"
//         >
//           <FaStar className="text-yellow-400" />
//           44k+ Participating
//         </motion.div>

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


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getAuthRole } from "@/utils/authStorage";
import { useTheme } from "@/context/ThemeContext";

import { FaArrowRight } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdGroups } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";

import heroImg from "../../../assets/image 2.png";      // 🌙 Dark desktop
import heroImg2 from "../../../assets/mobileimg.png";   // 🌙 Dark mobile
import lightHeroImg from "../../../assets/Hero1.webp"; // ☀️ Light image

const typingTexts = [
  "Programming is the Next Generation Skill",
  "Building the Next Generation of Developers",
  "Code Your Way to Innovation",
  "Empowering Future Software Engineers",
  "From Learning to Real-World Development",
];

const HeroSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
  const { dark } = useTheme();

  // ✅ AUTH
  const isLoggedIn = isAuthenticated();
  const role = getAuthRole();
  const dashboardPath =
    role === "admin" ? "/admin/dashboard" : "/student/dashboard";

  const handlePrimaryClick = () => {
    if (isLoggedIn) {
      navigate(dashboardPath);
    } else {
      navigate("/login");
    }
  };

  // ✅ TYPING EFFECT
  useEffect(() => {
    const currentText = typingTexts[textIndex];
    let speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentText.substring(0, prev.length - 1)
          : currentText.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % typingTexts.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* ✅ BACKGROUND */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src={dark ? heroImg : lightHeroImg}
          alt="hero"
          className={`w-full h-full object-cover  ${
            !dark ? "brightness-105 contrast-105" : ""
          }`}
        />
      </div>

      <div className="absolute inset-0 block md:hidden">
        <img
          src={dark ? heroImg2 : lightHeroImg}
          alt="hero"
          className={`w-full h-full object-cover object-right ${
            !dark ? "brightness-105 contrast-105" : ""
          }`}
        />
      </div>

      {/* ✅ OVERLAY (FIXED FOR LIGHT MODE) */}
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? `linear-gradient(
                to right,
                rgba(0,0,0,0.85) 0%,
                rgba(0,0,0,0.6) 40%,
                rgba(0,0,0,0.3) 70%,
                transparent 100%
              )`
            : `linear-gradient(
                to right,
                rgba(255,255,255,0.75) 0%,
                rgba(255,255,255,0.4) 40%,
                rgba(255,255,255,0.1) 70%,
                transparent 100%
              )`,
        }}
      />

      {/* ✅ CONTENT */}
      <div className="relative z-10 w-full md:w-1/2 min-h-screen flex items-start md:items-center pt-24 sm:pt-28 md:pt-0 px-5 sm:px-8 md:px-16">
        <div className="max-w-xl w-full">

          {/* BADGE */}
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[var(--theme-surface-muted)] text-[var(--theme-primary)] text-xs sm:text-sm border border-[var(--theme-border)]">
            <HiOutlineLightBulb className="text-lg" />
            LEADING STUDENT NETWORK
          </div>

          {/* HEADING */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[var(--theme-text)] leading-tight">
            Unlock Your <br />
            <span className="text-[var(--theme-primary)]">
              Academic Potential
            </span>
          </h1>

          {/* 🔥 AUTO TYPING */}
          <p className="mt-4 text-[var(--theme-primary)] text-sm sm:text-lg md:text-xl font-medium min-h-[50px]">
            {displayText}
            <span className="animate-pulse">|</span>
          </p>

          {/* DESCRIPTION */}
          <p className="mt-4 text-[var(--theme-text-soft)] text-xs sm:text-sm md:text-base leading-relaxed">
            Join India's most advanced platform for student contests,
            real-world challenges, and career growth opportunities.
          </p>

          {/* 🔥 BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">

            <button
              onClick={handlePrimaryClick}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl theme-brand-button text-sm sm:text-base"
            >
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              <FaArrowRight />
            </button>

            <button
              onClick={() => navigate("/contests")}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl theme-outline-button text-sm sm:text-base"
            >
              Explore Contests
            </button>

          </div>

          {/* STATS */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-6 sm:gap-10 text-[var(--theme-text)]">

            <div className="flex items-center gap-2">
              <MdGroups className="text-[var(--theme-primary)] text-xl" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold">10K+</h3>
                <p className="text-xs sm:text-sm text-[var(--theme-text-muted)]">
                  Students
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AiFillStar className="text-yellow-400 text-xl" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold">500%</h3>
                <p className="text-xs sm:text-sm text-[var(--theme-text-muted)]">
                  Contests
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <HiOutlineLightBulb className="text-[var(--theme-primary)] text-xl" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold">100+</h3>
                <p className="text-xs sm:text-sm text-[var(--theme-text-muted)]">
                  Institutes
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ⭐ PARTICIPATING */}
      <div className="absolute bottom-60 right-[35%] z-20 hidden lg:flex items-center gap-2 theme-surface px-3 py-4 rounded-2xl shadow-lg">
        <AiFillStar className="text-yellow-400" />
        <span className="text-sm font-medium">
          44k+ Participating
        </span>
      </div>

      {/* ⭐ RATING CARD */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 hidden md:block">
        <div className="theme-surface p-4 sm:p-5 rounded-2xl shadow-2xl w-[220px] sm:w-[260px]">

          <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--theme-text-muted)] mb-2">
            <AiFillStar className="text-yellow-400" />
            <span>4.9 Rating</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[var(--theme-text)]">
            Top Performer
          </h3>

          <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] mt-1 leading-snug">
            Building the Next <br /> Generation of Developers
          </p>

        </div>
      </div>

    </section>
  );
};

export default HeroSection;