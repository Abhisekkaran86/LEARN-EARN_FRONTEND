// import Card from "../components/ui/Card";
// import { FaTrophy, FaUsers, FaLightbulb, FaChartLine } from "react-icons/fa";

// const AboutPage = () => {
//   return (
//     <div className="bg-[#f8fafc] min-h-screen p-4 md:p-6">

//       {/* 🔥 HERO SECTION */}
//       <div className="bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white p-8 md:p-12 rounded-2xl mb-8 shadow-lg">
//         <h1 className="text-3xl md:text-4xl font-bold">
//           Empowering Students to Compete & Grow 🚀
//         </h1>

//         <p className="mt-4 max-w-2xl text-sm md:text-base opacity-90 leading-relaxed">
//           Our platform connects ambitious students with real-world challenges,
//           competitions, and opportunities to showcase their skills. We believe
//           learning should go beyond classrooms — it should be practical,
//           competitive, and rewarding.
//         </p>

//         {/* MINI STATS */}
//         <div className="flex gap-6 mt-6 text-sm">
//           <div>
//             <p className="font-bold text-lg">10K+</p>
//             <p className="opacity-80">Students</p>
//           </div>
//           <div>
//             <p className="font-bold text-lg">500+</p>
//             <p className="opacity-80">Competitions</p>
//           </div>
//           <div>
//             <p className="font-bold text-lg">100+</p>
//             <p className="opacity-80">Institutes</p>
//           </div>
//         </div>
//       </div>

//       {/* 🔥 MISSION + VISION */}
//       <div className="grid md:grid-cols-2 gap-6 mb-8">

//         <Card>
//           <h2 className="font-semibold text-lg mb-2">🎯 Our Mission</h2>
//           <p className="text-gray-600 text-sm leading-relaxed">
//             To create a powerful ecosystem where students can explore their
//             potential, compete with peers, and develop real-world skills that
//             prepare them for future careers.
//           </p>
//         </Card>

//         <Card>
//           <h2 className="font-semibold text-lg mb-2">🌍 Our Vision</h2>
//           <p className="text-gray-600 text-sm leading-relaxed">
//             To become India's most trusted and innovative student competition
//             platform, helping millions of learners unlock opportunities and
//             achieve excellence.
//           </p>
//         </Card>

//       </div>

//       {/* 🔥 WHY CHOOSE US */}
//       <div className="mb-8">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">
//           Why Choose Our Platform?
//         </h2>

//         <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

//           <Card className="text-center">
//             <FaTrophy className="text-[#82c600] text-2xl mx-auto mb-3" />
//             <h3 className="font-semibold text-sm">Real Competitions</h3>
//             <p className="text-xs text-gray-500 mt-1">
//               Participate in real-world challenges designed by experts.
//             </p>
//           </Card>

//           <Card className="text-center">
//             <FaUsers className="text-[#82c600] text-2xl mx-auto mb-3" />
//             <h3 className="font-semibold text-sm">Community</h3>
//             <p className="text-xs text-gray-500 mt-1">
//               Connect with top students across the country.
//             </p>
//           </Card>

//           <Card className="text-center">
//             <FaLightbulb className="text-[#82c600] text-2xl mx-auto mb-3" />
//             <h3 className="font-semibold text-sm">Skill Growth</h3>
//             <p className="text-xs text-gray-500 mt-1">
//               Learn by doing and improve your practical knowledge.
//             </p>
//           </Card>

//           <Card className="text-center">
//             <FaChartLine className="text-[#82c600] text-2xl mx-auto mb-3" />
//             <h3 className="font-semibold text-sm">Career Boost</h3>
//             <p className="text-xs text-gray-500 mt-1">
//               Build a strong profile for internships & placements.
//             </p>
//           </Card>

//         </div>
//       </div>

//       {/* 🔥 HOW IT WORKS */}
//       <div className="mb-8">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">
//           How It Works
//         </h2>

//         <div className="grid md:grid-cols-3 gap-6">

//           <Card>
//             <h3 className="font-semibold mb-2">1. Explore Contests</h3>
//             <p className="text-sm text-gray-600">
//               Browse competitions across different domains and skill levels.
//             </p>
//           </Card>

//           <Card>
//             <h3 className="font-semibold mb-2">2. Participate</h3>
//             <p className="text-sm text-gray-600">
//               Register, compete, and submit your best work.
//             </p>
//           </Card>

//           <Card>
//             <h3 className="font-semibold mb-2">3. Grow & Achieve</h3>
//             <p className="text-sm text-gray-600">
//               Get ranked, earn recognition, and improve your skills.
//             </p>
//           </Card>

//         </div>
//       </div>

//       {/* 🔥 CTA SECTION */}
//       <div className="bg-white rounded-2xl p-6 text-center shadow-md">
//         <h2 className="text-xl font-bold text-gray-800">
//           Ready to Start Your Journey?
//         </h2>

//         <p className="text-sm text-gray-500 mt-2">
//           Join thousands of students already competing and growing with us.
//         </p>

//         <button className="mt-4 px-6 py-3 rounded-xl bg-[#82c600] text-white font-medium hover:opacity-90 transition">
//           Explore Contests →
//         </button>
//       </div>

//     </div>
//   );
// };

// export default AboutPage;


import {
  FaTrophy,
  FaUsers,
  FaLightbulb,
  FaChartLine,
  FaRocket,
  FaMedal,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  const handleExplore = () => {
    if (!isAuthenticated) {
      navigate("/context");
    } else {
      navigate("/contests");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-4 md:p-8">

      {/* 🔥 HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#82c600] via-[#a3e635] to-[#6ea800] p-10 md:p-14 text-white shadow-xl">

        <div className="max-w-2xl z-10 relative">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Compete. Learn. <br />
            <span className="text-[#fbd300]">Achieve Greatness</span>
          </h1>

          <p className="mt-6 text-sm md:text-base opacity-90 leading-relaxed">
            Unlock your full potential through real-world competitions,
            hands-on challenges, and skill-based learning experiences.
          </p>

          <button
            onClick={handleExplore}
            className="mt-6 flex items-center gap-2 bg-black/20 backdrop-blur-lg px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <FaRocket />
            Explore Contests
          </button>
        </div>

        {/* 🔥 Glow Circle */}
        <div className="absolute w-[300px] h-[300px] bg-white/20 blur-3xl rounded-full top-[-50px] right-[-50px]" />
      </div>

      {/* 🔥 FEATURE GRID */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        {[
          {
            icon: <FaTrophy />,
            title: "Real Competitions",
            desc: "Solve real-world problems and compete nationally.",
          },
          {
            icon: <FaUsers />,
            title: "Strong Community",
            desc: "Connect with top-performing students.",
          },
          {
            icon: <FaLightbulb />,
            title: "Skill Growth",
            desc: "Learn practical skills beyond textbooks.",
          },
          {
            icon: <FaChartLine />,
            title: "Career Boost",
            desc: "Enhance your resume with achievements.",
          },
          {
            icon: <FaMedal />,
            title: "Recognition",
            desc: "Earn ranks, rewards, and certificates.",
          },
          {
            icon: <FaRocket />,
            title: "Fast Growth",
            desc: "Accelerate your learning journey.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group bg-white/70 backdrop-blur-xl border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="text-[#82c600] text-2xl mb-4 group-hover:scale-110 transition">
              {item.icon}
            </div>

            <h3 className="font-semibold text-gray-800">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              {item.desc}
            </p>
          </div>
        ))}

      </div>

      {/* 🔥 STATS WITH GLASS EFFECT */}
      <div className="grid grid-cols-3 gap-6 mt-12">

        {[
          { value: "10K+", label: "Students" },
          { value: "500+", label: "Contests" },
          { value: "100+", label: "Institutes" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/60 backdrop-blur-lg border p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition"
          >
            <p className="text-3xl font-bold text-[#82c600]">
              {item.value}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {item.label}
            </p>
          </div>
        ))}

      </div>

      {/* 🔥 CTA */}
      <div className="mt-12 bg-gradient-to-r from-[#82c600] to-[#a3e635] p-10 rounded-3xl text-center text-white shadow-lg">

        <h2 className="text-2xl md:text-3xl font-bold">
          Start Your Journey Today 🚀
        </h2>

        <p className="mt-3 text-sm opacity-90">
          Join thousands of students building their future with us.
        </p>

        <button
          onClick={handleExplore}
          className="mt-6 px-6 py-3 bg-[#fbd300] text-black rounded-xl font-medium hover:scale-105 transition"
        >
          Explore Now →
        </button>

      </div>

    </div>
  );
};

export default AboutPage;