
// import heroImg from "../assets/Hero1.png";
// import { FaPaperPlane, FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Hero = () => {
//   const navigate = useNavigate();

//   // 🔐 Fake auth check (replace with context later)
//   const isAuthenticated = !!localStorage.getItem("token");

//   const handleExplore = () => {
//     if (!isAuthenticated) {
//       navigate("/contests"); // 🔥 login / context page
//     } else {
//       navigate("/contests"); // 🔥 contests page
//     }
//   };

//   const handleLearnMore = () => {
//     navigate("/about"); // 🔥 you can change route
//   };

//   return (
//     <section
//       className="relative min-h-screen flex items-center bg-no-repeat"
//       style={{
//         backgroundImage: `url(${heroImg})`,
//         backgroundSize: "contain",
//         backgroundPosition: "right center",
//       }}
//     >
//       {/* LEFT CONTENT */}
//       <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-12">
//         <div className="max-w-xl">

//           {/* BADGE */}
//           <div className="inline-flex items-center gap-2 bg-[#82c600]/10 text-[#82c600] px-4 py-1 rounded-full text-sm font-semibold">
//             <FaPaperPlane className="text-[10px]" />
//             LEADING STUDENT NETWORK
//           </div>

//           {/* TITLE */}
//           <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mt-6 leading-tight text-gray-900">
//             Unlock Your <br />
//             <span className="bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300] bg-clip-text text-transparent">
//               Academic Potential
//             </span>
//           </h1>

//           {/* DESC */}
//           <p className="text-gray-600 mt-5 text-sm sm:text-base leading-relaxed">
//             Join India's most advanced platform for student contests, real-world challenges, and career growth opportunities.
//           </p>

//           {/* BUTTONS */}
//           <div className="flex flex-wrap gap-4 mt-8">

//             {/* 🔥 EXPLORE BUTTON */}
//             <button
//               onClick={handleExplore}
//               className="px-6 py-3 rounded-xl font-medium text-white bg-[#82c600] hover:opacity-90 transition shadow-md flex items-center gap-2"
//             >
//               Explore Contests →
//             </button>

//             {/* 🔥 LEARN MORE BUTTON */}
//             <button
//               onClick={handleLearnMore}
//               className="px-6 py-3 rounded-xl font-medium bg-[#fbd300] text-black hover:opacity-90 transition shadow-sm"
//             >
//               Learn More
//             </button>

//           </div>

//           {/* STATS */}
//           <div className="flex gap-8 sm:gap-10 mt-10 border-t pt-6">
//             <div>
//               <p className="text-2xl lg:text-3xl font-bold text-gray-900">10K+</p>
//               <p className="text-sm text-gray-500">Students</p>
//             </div>

//             <div>
//               <p className="text-2xl lg:text-3xl font-bold text-gray-900">500+</p>
//               <p className="text-sm text-gray-500">Contests</p>
//             </div>

//             <div>
//               <p className="text-2xl lg:text-3xl font-bold text-gray-900">100+</p>
//               <p className="text-sm text-gray-500">Institutes</p>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* FLOAT CARD 1 */}
//       <div className="hidden md:flex absolute bottom-[120px] right-[80px] bg-white px-4 py-2 rounded-xl shadow-md items-center gap-2 text-sm">
//         <FaStar className="text-yellow-400" />
//         44k+ Participating
//       </div>

//       {/* FLOAT CARD 2 */}
//       <div className="hidden md:block absolute bottom-[96px] right-[80px] bg-white p-4 rounded-xl shadow-xl w-[220px]">
//         <div className="flex items-center gap-2 text-sm text-gray-600">
//           <FaStar className="text-yellow-400" />
//           4.9 Rating
//         </div>

//         <h4 className="font-semibold mt-2 text-gray-900">
//           Top Performer
//         </h4>

//         <p className="text-xs text-gray-500 mt-1">
//           Olympiad Winner 2024
//         </p>
//       </div>

//     </section>
//   );
// };

// export default Hero;

import heroImg from "../assets/Hero1.png";
import { FaPaperPlane, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  const handleExplore = () => {
    if (!isAuthenticated) {
      navigate("/contests");
    } else {
      navigate("/contests");
    }
  };

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <section
      className="relative min-h-screen flex items-center bg-no-repeat bg-cover lg:bg-contain overflow-hidden"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundPosition: "right center",
      }}
    >
      {/* OVERLAY FOR MOBILE */}
      <div className="absolute inset-0 bg-white/70 md:bg-transparent"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
        <div className="max-w-xl">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-[#82c600]/10 text-[#82c600] px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
            <FaPaperPlane className="text-[10px]" />
            LEADING STUDENT NETWORK
          </div>

          {/* TITLE */}
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mt-5 sm:mt-6 leading-tight text-gray-900">
            Unlock Your <br />
            <span className="bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300] bg-clip-text text-transparent">
              Academic Potential
            </span>
          </h1>

          {/* DESC */}
          <p className="text-gray-600 mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed">
            Join India's most advanced platform for student contests, real-world challenges, and career growth opportunities.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">

            {/* EXPLORE BUTTON */}
            <button
              onClick={handleExplore}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-white 
              bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300]
              hover:scale-[1.03] active:scale-95
              transition-all duration-300 
              shadow-lg hover:shadow-xl
              hover:shadow-[0_10px_30px_rgba(130,198,0,0.4)]
              flex items-center justify-center gap-2"
            >
              Explore Contests →
            </button>

            {/* LEARN MORE BUTTON */}
            <button
              onClick={handleLearnMore}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium 
              bg-gradient-to-r from-[#fbd300] via-[#fde047] to-[#82c600]
              text-black
              hover:scale-[1.03] active:scale-95
              transition-all duration-300 
              shadow-md hover:shadow-lg"
            >
              Learn More
            </button>

          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-8 sm:mt-10 border-t pt-5 sm:pt-6">
            <div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">10K+</p>
              <p className="text-xs sm:text-sm text-gray-500">Students</p>
            </div>

            <div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">500+</p>
              <p className="text-xs sm:text-sm text-gray-500">Contests</p>
            </div>

            <div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">100+</p>
              <p className="text-xs sm:text-sm text-gray-500">Institutes</p>
            </div>
          </div>

        </div>
      </div>

      {/* FLOAT CARD 1 */}
      <div className="hidden lg:flex absolute bottom-[120px] right-[80px] bg-white px-4 py-2 rounded-xl shadow-md items-center gap-2 text-sm">
        <FaStar className="text-yellow-400" />
        44k+ Participating
      </div>

      {/* FLOAT CARD 2 */}
      <div className="hidden lg:block absolute bottom-[40px] right-[80px] bg-white p-4 rounded-xl shadow-xl w-[220px]">
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
      </div>

    </section>
  );
};

export default Hero;