// // sections/Hero.jsx
// import Container from "../components/Container";
// import Button from "../components/ui/Button";
// import heroImg from "../assets/hero.png";

// const Hero = () => {
//   return (
//     <section className="relative bg-[#f5f7fb] py-24 overflow-hidden">
//       <Container>

//         <div className="grid lg:grid-cols-2 items-center">

//           {/* LEFT */}
//           <div className="z-10">

//             {/* TAG */}
//             <span className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium">
//               ✈️ LEADING STUDENT NETWORK
//             </span>

//             {/* TITLE */}
//             <h1 className="text-5xl lg:text-6xl font-bold mt-6 leading-tight text-gray-900">
//               Unlock Your <br />
//               <span className="text-[#2e7d32]">
//                 Academic Potential
//               </span>
//             </h1>

//             {/* DESC */}
//             <p className="text-gray-500 mt-6 max-w-lg text-base">
//               Join India's premier platform for student contests and challenges.
//               Build your profile and compete globally.
//             </p>

//             {/* BUTTONS */}
//             <div className="flex gap-4 mt-8">

//               {/* BLUE BUTTON */}
//               <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-blue-700 transition">
//                 Explore Contests →
//               </button>

//               {/* OUTLINE BUTTON */}
//               <button className="border border-gray-300 px-6 py-3 rounded-xl text-gray-700 bg-white hover:bg-gray-100 transition">
//                 Learn More
//               </button>

//             </div>

//             {/* STATS */}
//             <div className="flex gap-10 mt-12 text-gray-600">
//               <div>
//                 <p className="text-3xl font-bold text-gray-900">10K+</p>
//                 Students
//               </div>
//               <div>
//                 <p className="text-3xl font-bold text-gray-900">500+</p>
//                 Contests
//               </div>
//               <div>
//                 <p className="text-3xl font-bold text-gray-900">100+</p>
//                 Institutes
//               </div>
//             </div>

//           </div>

//           {/* RIGHT */}
//           <div className="relative">

//             {/* IMAGE */}
//             <div className="relative h-[500px] w-full">
//               <img
//                 src={heroImg}
//                 alt="hero"
//                 className="absolute right-0 top-0 h-full w-full object-cover rounded-2xl shadow-xl"
//               />

//               {/* LEFT FADE (VERY IMPORTANT 🔥) */}
//               <div className="absolute inset-0 bg-gradient-to-r from-[#f5f7fb] via-[#f5f7fb]/70 to-transparent"></div>
//             </div>

//             {/* FLOAT CARD TOP */}
//             <div className="absolute top-16 right-10 bg-white px-4 py-2 rounded-xl shadow text-sm flex items-center gap-2">
//               ⭐ 44k+ Participating
//             </div>

//             {/* FLOAT CARD BOTTOM */}
//             <div className="absolute bottom-10 right-10 bg-white p-4 rounded-xl shadow w-[220px]">
//               <p className="text-sm text-gray-500">⭐ 4.9 Rating</p>
//               <h4 className="font-semibold mt-1">Top Performer</h4>
//               <p className="text-xs text-gray-400">
//                 Olympiad Winner 2024
//               </p>
//             </div>

//           </div>

//         </div>

//       </Container>
//     </section>
//   );
// };

// export default Hero;

import React from "react";
import { Star } from "lucide-react";

const Hero = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-between px-6 md:px-20 bg-[#f8fafc] overflow-hidden">
      
      {/* LEFT */}
      <div className="max-w-xl space-y-6 z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
          ✈️ LEADING STUDENT NETWORK
        </div>

        {/* Heading */}
        <h1 className="text-[42px] md:text-[56px] leading-tight font-bold text-gray-900">
          Unlock Your <br />
          <span className="text-green-600">
            Academic Potential
          </span>
        </h1>

        {/* Text */}
        <p className="text-gray-500 text-lg leading-relaxed">
          Join India's premier platform for student contests and challenges.
          Build your profile and compete globally.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md">
            Explore Contests →
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium bg-white hover:bg-gray-100">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-12 pt-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">10K+</h2>
            <p className="text-gray-500 text-sm">Students</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">500+</h2>
            <p className="text-gray-500 text-sm">Contests</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">100+</h2>
            <p className="text-gray-500 text-sm">Institutes</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex w-[55%] relative items-center justify-center">
        
        {/* Gradient Blur */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/70 to-white z-10"></div>

        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1603575448360-153f093fd0d7"
          alt="student"
          className="w-full h-[520px] object-cover rounded-3xl shadow-xl"
        />

        {/* Floating Small Card */}
        <div className="absolute top-24 left-6 bg-white/90 backdrop-blur-md shadow-lg rounded-xl px-4 py-2 flex items-center gap-2 z-20">
          <Star className="text-yellow-500 w-4 h-4" />
          <span className="text-sm font-medium text-gray-800">
            44k+ Participating
          </span>
        </div>

        {/* Floating Big Card */}
        <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4 w-56 z-20">
          <div className="flex items-center gap-2 text-yellow-500">
            <Star className="w-4 h-4" />
            <span className="text-sm font-semibold text-gray-800">
              4.9 Rating
            </span>
          </div>
          <h3 className="font-bold text-gray-900 mt-1">
            Top Performer
          </h3>
          <p className="text-xs text-gray-500">
            Olympiad Winner 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;