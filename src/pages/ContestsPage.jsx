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
// import { useNavigate } from "react-router-dom";
// import { FaArrowRight, FaTrophy } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "../features/contestSlice";

// const ContestsPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { contests = [] } = useSelector((state) => state.contest);

//   // ✅ FIXED LOGIN STATE (REDUX)
//   // const { user } = useSelector((state) => state.auth);
//   // const isLoggedIn = !!user;

//   const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

// const isLoggedIn = !!token;

//   useEffect(() => {
//     dispatch(fetchContests());
//   }, [dispatch]);

//   // ✅ COMMON FUNCTION
//   // const handleParticipate = (item) => {
//   //   if (!isLoggedIn) {
//   //     navigate("/login");
//   //     return;
//   //   }

//   //   if (user?.role === "student") {
//   //     navigate("/student/dashboard");
//   //   } else if (user?.role === "admin") {
//   //     navigate("/admin/dashboard");
//   //   } else {
//   //     navigate("/");
//   //   }
//   // };

//   const handleParticipate = (item) => {
//   if (!isLoggedIn) {
//     navigate("/login");
//     return;
//   }

//   if (role === "student") {
//     navigate(`/student/contest/${item._id}`);
//   } else if (role === "admin") {
//     navigate("/admin/dashboard");
//   } else {
//     navigate("/");
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] px-4 md:px-10 py-10">

//       {/* 🔥 HEADER WITH PERFECT BACK BUTTON */}
//       <div className="flex items-center gap-4 mb-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm"
//         >
//           <ArrowLeft size={18} />
//         </button>

//         <div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//             Discover Contests
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Compete, win rewards, and grow 🚀
//           </p>
//         </div>
//       </div>

//       {/* 🔥 GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

//         {contests.map((item) => {
//           const daysLeft = Math.ceil(
//             (new Date(item.deadline) - new Date()) / (1000 * 60 * 60 * 24)
//           );

//           return (
//             <div
//               key={item._id}

//               // ✅ CARD CLICK
//               onClick={() => handleParticipate(item)}

//               className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 cursor-pointer"
//             >
//               {/* IMAGE */}
//               <div className="relative h-52 overflow-hidden">
//                 <img
//                   src={item.image || "https://via.placeholder.com/400"}
//                   alt={item.title}
//                   className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

//                 <div className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold bg-green-500 text-white shadow">
//                   {item.status || "Active"}
//                 </div>

//                 <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
//                   <FaTrophy />
//                   {item.rewards?.[0] || "Reward"}
//                 </div>

//                 <h3 className="absolute bottom-3 left-4 right-4 text-white font-bold text-lg">
//                   {item.title}
//                 </h3>
//               </div>

//               {/* CONTENT */}
//               <div className="p-5 flex flex-col justify-between">

//                 <p className="text-sm text-gray-500 line-clamp-2">
//                   {item.description}
//                 </p>

//                 <div className="flex flex-wrap gap-2 mt-3">
//                   <span className="text-xs bg-[#82C600]/10 text-[#82C600] px-2 py-1 rounded">
//                     {item.category || "General"}
//                   </span>

//                   {item.level && (
//                     <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
//                       {item.level}
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-xs text-red-500 mt-2">
//                   ⏳ {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
//                 </p>

//                 <div className="grid grid-cols-2 gap-3 mt-4 text-xs">

//                   <div className="bg-gray-50 p-3 rounded-xl">
//                     <p className="text-gray-400">Start</p>
//                     <p className="font-semibold text-gray-700">
//                       {new Date(item.startDate).toLocaleDateString()}
//                     </p>
//                   </div>

//                   <div className="bg-gray-50 p-3 rounded-xl">
//                     <p className="text-gray-400">Deadline</p>
//                     <p className="font-semibold text-gray-700">
//                       {new Date(item.deadline).toLocaleDateString()}
//                     </p>
//                   </div>

//                   <div className="bg-gray-50 p-3 rounded-xl col-span-2">
//                     <p className="text-gray-400">Participants</p>
//                     <p className="font-semibold text-gray-700">
//                       👥 {item.participants?.length || 0}+ Joined
//                     </p>

//                     <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
//                       <div
//                         className="bg-[#82C600] h-2 rounded-full"
//                         style={{
//                           width: `${Math.min(
//                             (item.participants?.length || 0) * 10,
//                             100
//                           )}%`,
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* BUTTON */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleParticipate(item);
//                   }}
//                   className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
//                 >
//                   Participate <FaArrowRight />
//                 </button>
//               </div>

//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#82c600]/10 to-[#a3e635]/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ContestsPage;

// import { useNavigate } from "react-router-dom";
// import { FaArrowRight, FaTrophy } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "../features/contestSlice";

// const ContestsPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { contests = [] } = useSelector((state) => state.contest);

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const isLoggedIn = !!token;

//   useEffect(() => {
//     dispatch(fetchContests());
//   }, [dispatch]);

//   const handleParticipate = (item) => {
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }

//     if (role === "student") {
//       navigate(`/student/contest/${item._id}`);
//     } else if (role === "admin") {
//       navigate("/admin/dashboard");
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] px-4 md:px-10 py-10">

//       {/* HEADER */}
//       <div className="flex items-center gap-4 mb-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm"
//         >
//           <ArrowLeft size={18} />
//         </button>

//         <div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//             Discover Contests
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Compete, win rewards, and grow 🚀
//           </p>
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

//         {contests.map((item) => {
//           const daysLeft = Math.ceil(
//             (new Date(item.deadline) - new Date()) / (1000 * 60 * 60 * 24)
//           );

//           return (
//             <div
//               key={item._id}

              
//               onClick={() => navigate(`/contest/${item._id}`)}

//               className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 cursor-pointer"
//             >
//               {/* IMAGE */}
//               <div className="relative h-52 overflow-hidden">
//                 <img
//                   src={item.image || "https://via.placeholder.com/400"}
//                   alt={item.title}
//                   className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

//                 <div className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold bg-green-500 text-white shadow">
//                   {item.status || "Active"}
//                 </div>

//                 <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
//                   <FaTrophy />
//                   {item.rewards?.[0] || "Reward"}
//                 </div>

//                 <h3 className="absolute bottom-3 left-4 right-4 text-white font-bold text-lg">
//                   {item.title}
//                 </h3>
//               </div>

//               {/* CONTENT */}
//               <div className="p-5 flex flex-col justify-between">

//                 <p className="text-sm text-gray-500 line-clamp-2">
//                   {item.description}
//                 </p>

//                 <div className="flex flex-wrap gap-2 mt-3">
//                   <span className="text-xs bg-[#82C600]/10 text-[#82C600] px-2 py-1 rounded">
//                     {item.category || "General"}
//                   </span>

//                   {item.level && (
//                     <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
//                       {item.level}
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-xs text-red-500 mt-2">
//                   ⏳ {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
//                 </p>

//                 <div className="grid grid-cols-2 gap-3 mt-4 text-xs">

//                   <div className="bg-gray-50 p-3 rounded-xl">
//                     <p className="text-gray-400">Start</p>
//                     <p className="font-semibold text-gray-700">
//                       {new Date(item.startDate).toLocaleDateString()}
//                     </p>
//                   </div>

//                   <div className="bg-gray-50 p-3 rounded-xl">
//                     <p className="text-gray-400">Deadline</p>
//                     <p className="font-semibold text-gray-700">
//                       {new Date(item.deadline).toLocaleDateString()}
//                     </p>
//                   </div>

//                   <div className="bg-gray-50 p-3 rounded-xl col-span-2">
//                     <p className="text-gray-400">Participants</p>
//                     <p className="font-semibold text-gray-700">
//                       👥 {item.participants?.length || 0}+ Joined
//                     </p>

//                     <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
//                       <div
//                         className="bg-[#82C600] h-2 rounded-full"
//                         style={{
//                           width: `${Math.min(
//                             (item.participants?.length || 0) * 10,
//                             100
//                           )}%`,
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* BUTTON */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleParticipate(item);
//                   }}
//                   className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white py-2.5 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
//                 >
//                   Participate <FaArrowRight />
//                 </button>
//               </div>

//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#82c600]/10 to-[#a3e635]/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ContestsPage;

import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaTrophy } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContests } from "../features/contestSlice";

const ContestsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { contests = [] } = useSelector((state) => state.contest);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;

  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  const handleParticipate = (item) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (role === "student") {
      navigate(`/student/contest/${item._id}`);
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] px-3 sm:px-4 md:px-6 lg:px-10 py-6 sm:py-8 md:py-10">

      {/* HEADER */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10 flex-wrap">

        {/* <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm"
        >
          <ArrowLeft size={18} />
        </button> */}

        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Discover Contests
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Compete, win rewards, and grow 🚀
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10">

        {contests.map((item) => {
          const daysLeft = Math.ceil(
            (new Date(item.deadline) - new Date()) / (1000 * 60 * 60 * 24)
          );

          return (
            <div
              key={item._id}
              onClick={() => navigate(`/contest/${item._id}`)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden">
                <img
                  src={item.image || "https://via.placeholder.com/400"}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-semibold bg-green-500 text-white shadow">
                  {item.status || "Active"}
                </div>

                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-yellow-400 text-black text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow flex items-center gap-1">
                  <FaTrophy />
                  {item.rewards?.[0] || "Reward"}
                </div>

                <h3 className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 text-white font-bold text-sm sm:text-base md:text-lg">
                  {item.title}
                </h3>
              </div>

              {/* CONTENT */}
              <div className="p-3 sm:p-4 md:p-5 flex flex-col justify-between">

                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-[10px] sm:text-xs bg-[#82C600]/10 text-[#82C600] px-2 py-1 rounded">
                    {item.category || "General"}
                  </span>

                  {item.level && (
                    <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {item.level}
                    </span>
                  )}
                </div>

                <p className="text-[10px] sm:text-xs text-red-500 mt-2">
                  ⏳ {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4 text-[10px] sm:text-xs">

                  <div className="bg-gray-50 p-2 sm:p-3 rounded-xl">
                    <p className="text-gray-400">Start</p>
                    <p className="font-semibold text-gray-700">
                      {new Date(item.startDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-2 sm:p-3 rounded-xl">
                    <p className="text-gray-400">Deadline</p>
                    <p className="font-semibold text-gray-700">
                      {new Date(item.deadline).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-2 sm:p-3 rounded-xl col-span-2">
                    <p className="text-gray-400">Participants</p>
                    <p className="font-semibold text-gray-700">
                      👥 {item.participants?.length || 0}+ Joined
                    </p>

                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                      <div
                        className="bg-[#82C600] h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (item.participants?.length || 0) * 10,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleParticipate(item);
                  }}
                  className="mt-4 sm:mt-5 w-full flex items-center justify-center gap-2 text-xs sm:text-sm bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white py-2 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  Participate <FaArrowRight />
                </button>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#82c600]/10 to-[#a3e635]/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContestsPage;