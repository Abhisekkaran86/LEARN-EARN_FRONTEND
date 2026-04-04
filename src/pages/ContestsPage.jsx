// import Card from "../components/ui/Card";
// import { challenges } from "../data/challengesData";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const ContestsPage = () => {
//   const navigate = useNavigate();

//   const token = Cookies.get("token");
//   const isLoggedIn = !!token;

//   // ✅ HANDLE PARTICIPATE CLICK
//   const handleParticipate = (item) => {
//     if (!isLoggedIn) {
//       navigate("/login"); // 🔥 redirect if not logged in
//     } else {
//       // 🔥 future: go to contest details page
//       navigate(`/contest/${item.id}`);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-[#f8fafc] to-[#eef2f7] min-h-screen px-4 md:px-8 py-10">

//       {/* HEADER */}
//       <div className="mb-10">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Explore <span className="text-[#82C600]">Contests</span>
//         </h1>
//         <p className="text-gray-500 mt-2">
//           Participate, compete, and improve your skills 🚀
//         </p>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {challenges.map((item) => (
//           <Card
//             key={item.id}
//             className="group overflow-hidden rounded-2xl p-0 bg-white/70 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//           >
            
//             {/* IMAGE */}
//             <div className="relative h-48 overflow-hidden">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

//               <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-[#FFD700] text-black font-semibold shadow">
//                 {item.prize}
//               </span>
//             </div>

//             {/* CONTENT */}
//             <div className="p-5">
//               <span className="text-xs font-semibold text-[#82C600] bg-[#82C600]/10 px-2 py-1 rounded">
//                 {item.category}
//               </span>

//               <h3 className="mt-3 text-lg font-bold text-gray-800 group-hover:text-[#82C600] transition">
//                 {item.title}
//               </h3>

//               {/* 🔥 BUTTON */}
//               <button
//                 onClick={() => handleParticipate(item)}
//                 className="mt-5 w-full bg-[#82C600] hover:bg-[#6da800] text-white py-2.5 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
//               >
//                 Participate
//               </button>
//             </div>

//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ContestsPage;
import Card from "../components/ui/Card";
import { challenges } from "../data/challengesData";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaArrowRight, FaTrophy } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContests } from "../features/contestSlice";

const ContestsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

const { contests = [] } = useSelector((state) => state.contest);

useEffect(() => {
  dispatch(fetchContests());
}, [dispatch]);

  const token = Cookies.get("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!token;

  const handleParticipate = (item) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (user?.role === "student") {
      navigate("/student/dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] px-4 md:px-10 py-12">

      {/* 🔥 HEADER */}
      <div className="mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Discover & Join <br />
          <span className="text-[#82C600]">Exciting Contests</span>
        </h1>

        <p className="text-gray-500 mt-4 text-sm md:text-base">
          Compete with top students, win rewards, and build your career profile 🚀
        </p>
      </div>

      {/* 🔥 GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {contests.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/20 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >

            {/* 🔥 IMAGE */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Prize badge */}
              <div className="absolute top-4 right-4 bg-[#FFD700] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <FaTrophy />
                {item.prize}
              </div>
            </div>

            {/* 🔥 CONTENT */}
            <div className="p-6">

              {/* Category */}
              <span className="text-xs font-semibold text-[#82C600] bg-[#82C600]/10 px-3 py-1 rounded-full">
                {item.category}
              </span>

              {/* Title */}
              <h3 className="mt-4 text-xl font-bold text-gray-800 group-hover:text-[#82C600] transition">
                {item.title}
              </h3>

              {/* Subtitle (optional if you have) */}
              <p className="text-sm text-gray-500 mt-2">
                Challenge yourself and compete with the best minds.
              </p>

              {/* 🔥 BUTTON */}
              <button
                onClick={() => handleParticipate(item)}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Participate <FaArrowRight />
              </button>
            </div>

            {/* 🔥 GLOW EFFECT */}
            <div className="absolute -z-10 inset-0 rounded-3xl bg-gradient-to-r from-[#82c600]/20 to-[#a3e635]/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ContestsPage;