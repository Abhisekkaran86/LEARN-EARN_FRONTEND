
// import heroImg from "../assets/Hero1.png";
// import { FaPaperPlane, FaStar } from "react-icons/fa";

// const Hero = () => {
//   return (
//     <section
//       className="relative h-screen w-full bg-cover bg-center flex items-center"
//       style={{
//         backgroundImage: `url(${heroImg})`,
//       }}
//     >

//       {/* CONTENT */}
//       <div className="relative z-10 max-w-[1300px] mx-auto px-6 lg:px-12 w-full">

//         <div className="max-w-xl">

//           {/* TAG */}
//           <div className="inline-flex items-center gap-2 bg-[#82c600] text-white px-4 py-1 rounded-full text-sm font-medium">
//             <FaPaperPlane className="text-xs" />
//             LEADING STUDENT NETWORK
//           </div>

//           {/* TITLE */}
//           <h1 className="text-[48px] lg:text-[60px] font-bold mt-6 leading-tight text-gray-900">
//             Unlock Your <br />
//             <span className="text-[#2e7d32]">
//               Academic Potential
//             </span>
//           </h1>

//           {/* DESC */}
//           <p className="text-gray-600 mt-6 max-w-lg text-[16px]">
//             Join India's premier platform for student contests and challenges.
//           </p>

//           {/* BUTTONS */}
//           <div className="flex gap-4 mt-8">

//             <button className="bg-[#1d5fd0] text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-[#174bb0] transition">
//               Explore Contests →
//             </button>

//             <button className="bg-white border border-gray-300 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition">
//               Learn More
//             </button>

//           </div>

//           {/* STATS */}
//           <div className="flex gap-12 mt-12 text-gray-600">

//             <div>
//               <p className="text-3xl font-bold text-gray-900">10K+</p>
//               <p className="text-sm mt-1">Students</p>
//             </div>

//             <div>
//               <p className="text-3xl font-bold text-gray-900">500+</p>
//               <p className="text-sm mt-1">Contests</p>
//             </div>

//             <div>
//               <p className="text-3xl font-bold text-gray-900">100+</p>
//               <p className="text-sm mt-1">Institutes</p>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* FLOAT CARDS */}
//       <div className="absolute buttom-60 right-150 bg-white px-10 py-5 rounded-xl shadow flex items-center gap-2 text-sm">
//         <FaStar className="text-yellow-400" />
//         44k+ Participating
//       </div>

//       <div className="absolute bottom-12 right-16 bg-white p-4 rounded-xl shadow-lg w-[220px]">
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

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "contain",
        backgroundPosition: "right center",
      }}
    >

      {/* LEFT CONTENT */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="max-w-xl">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-[#82c600]/10 text-[#82c600] px-4 py-1 rounded-full text-sm font-semibold">
            <FaPaperPlane className="text-[10px]" />
            LEADING STUDENT NETWORK
          </div>

          {/* TITLE */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mt-6 leading-tight text-gray-900">
            Unlock Your <br />

            {/* 🔥 GRADIENT TEXT */}
            <span className="bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#fbd300] bg-clip-text text-transparent">
              Academic Potential
            </span>

          </h1>

          {/* DESC */}
          <p className="text-gray-600 mt-5 text-sm sm:text-base leading-relaxed">
            Join India's most advanced platform for student contests, real-world challenges, and career growth opportunities.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">

            <button className="px-6 py-3 rounded-xl font-medium text-white bg-[#82c600] hover:opacity-90 transition shadow-md flex items-center gap-2">
              Explore Contests →
            </button>

            <button className="px-6 py-3 rounded-xl font-medium bg-[#fbd300] text-black hover:opacity-90 transition shadow-sm">
              Learn More
            </button>

          </div>

          {/* STATS */}
          <div className="flex gap-8 sm:gap-10 mt-10 border-t pt-6">

            <div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">10K+</p>
              <p className="text-sm text-gray-500">Students</p>
            </div>

            <div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-500">Contests</p>
            </div>

            <div>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">100+</p>
              <p className="text-sm text-gray-500">Institutes</p>
            </div>

          </div>

        </div>
      </div>

      {/* 🔥 FLOAT CARD 1 (TOP RIGHT EXACT) */}
      <div className="hidden md:flex absolute buttom-[120px] right-[80px] bg-white px-4 py-2 rounded-xl shadow-md items-center gap-2 text-sm">
        <FaStar className="text-yellow-400" />
        44k+ Participating
      </div>

      {/* 🔥 FLOAT CARD 2 (BOTTOM RIGHT EXACT) */}
      <div className="hidden md:block absolute bottom-[96px] right-[80px] bg-white p-4 rounded-xl shadow-xl w-[220px]">

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
