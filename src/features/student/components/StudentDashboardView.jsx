




// import Card from "@/components/ui/Card";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "@/features/contest/contestSlice";

// // ✅ Swiper (Navigation REMOVED)
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import { useNavigate } from "react-router-dom";

// const StudentDashboardView = ({ config }) => {
//   const dispatch = useDispatch();

//   // ✅ Redux user
//   const { user } = useSelector((state) => state.auth);

//   const navigate = useNavigate();

//   // ✅ LocalStorage login
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const isLoggedIn = !!token;

//   // ✅ Contest Data
//   const { contests = [], loading } = useSelector(
//     (state) => state.contest
//   );

//   useEffect(() => {
//     dispatch(fetchContests());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="bg-[#f8fafc] min-h-screen p-4 md:p-6">

//       {/* HERO */}
//       <div className="bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white rounded-2xl p-6 md:p-8 mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold">
//           {config.hero.title.replace(
//             "{name}",
//             user?.name || "Student"
//           )}
//         </h1>

//         <p className="mt-2 text-sm md:text-base opacity-90">
//           {config.hero.subtitle.replace(
//             "{active}",
//             user?.active || 0
//           )}
//         </p>

//         <div className="flex gap-4 mt-5 flex-wrap">
//           {config.stats.map((item, i) => (
//             <div key={i} className="bg-white/20 px-4 py-2 rounded-xl">
//               <p className="text-xs">{item.label}</p>
//               <p className="font-semibold">
//                 {user?.[item.key] || "-"}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* LEFT */}
//         <div className="lg:col-span-2 space-y-6">

//           {/* FEATURED */}
//           <div>
//             <div className="flex justify-between mb-4">
//               <h2 className="text-xl font-semibold">
//                 {config.featured.title}
//               </h2>
//               <span className="text-[#82C600] text-sm cursor-pointer">
//                 {config.featured.action}
//               </span>
//             </div>

//             <Swiper
//               modules={[Autoplay]}
//               spaceBetween={20}
//               slidesPerView={1}
//               autoplay={{
//                 delay: 2500,
//                 disableOnInteraction: false,
//               }}
//               breakpoints={{
//                 640: { slidesPerView: 1.2 },
//                 768: { slidesPerView: 2 },
//                 1024: { slidesPerView: 2 },
//               }}
//             >
//               {contests.length === 0 ? (
//                 <p>No contests found</p>
//               ) : (
//                 contests.map((item, i) => (
//                   <SwiperSlide key={i}>
//                     <Card className="overflow-hidden p-0 shadow hover:shadow-lg transition">

//                       {/* IMAGE */}
//                       <div
//                         className="h-40 bg-cover bg-center"
//                         style={{
//                           backgroundImage: `url(${item.image || "/default.jpg"})`,
//                         }}
//                       />

//                       <div className="p-4">
//                         <div className="flex gap-2 text-xs mb-2">
//                           <span className="bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded">
//                             {item.category || "Contest"}
//                           </span>
//                           <span className="bg-[#FFD700]/30 px-2 py-1 rounded">
//                             {item.status || "Live"}
//                           </span>
//                         </div>

//                         <h3 className="font-semibold">
//                           {item.title}
//                         </h3>

//                         <p className="text-sm text-gray-500 mt-1">
//                           {item.description || "No description"}
//                         </p>

//                         <button
//                           onClick={() => {
//                             if (!isLoggedIn) {
//                               navigate("/login");
//                               return;
//                             }

//                             if (role !== "student") {
//                               alert("Only students can participate ❌");
//                               return;
//                             }

//                             navigate(`/student/contest/${item._id}`);
//                           }}
//                           className="mt-4 w-full bg-[#82C600] text-white py-2 rounded-xl hover:bg-[#6ea800] transition"
//                         >
//                           Participate Now
//                         </button>
//                       </div>

//                     </Card>
//                   </SwiperSlide>
//                 ))
//               )}
//             </Swiper>
//           </div>

//           {/* PARTICIPATION */}
//           <Card>
//             <h2 className="font-semibold mb-4">
//               {config.participation.title}
//             </h2>

//             <p className="text-gray-400 text-sm">
//               No participation data (connect API)
//             </p>
//           </Card>
//         </div>

//         {/* RIGHT */}
//         <div className="space-y-6">

//           <Card>
//             <h3 className="font-semibold mb-3">
//               {config.sidebar.deadlines}
//             </h3>

//             <p className="text-gray-400 text-sm">
//               No deadlines (connect API)
//             </p>
//           </Card>

//           <Card>
//             <h3 className="font-semibold mb-3">
//               {config.sidebar.progress}
//             </h3>

//             <p className="text-gray-400 text-sm">
//               No progress data
//             </p>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboardView;

// import Card from "@/components/ui/Card";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "@/features/contest/contestSlice";
// import API from "../../../services/axios";

// // ✅ Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const StudentDashboardView = ({ config }) => {
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);

//   const navigate = useNavigate();

//   // ✅ FIXED AUTH (USE COOKIES ONLY)
//   const token = Cookies.get("token");
//   const role = Cookies.get("role");
//   const isLoggedIn = !!token;

//   // ✅ Contest
//   const { contests = [], loading } = useSelector(
//     (state) => state.contest
//   );

//   // ✅ Participation state
//   const [history, setHistory] = useState([]);
//   const [summary, setSummary] = useState({});



// useEffect(() => {
//   dispatch(fetchContests());

//   const fetchParticipation = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.log("❌ No token found");
//         return;
//       }

//       const res = await API.get( // ✅ FIXED
//         "/participations/my-participations",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("✅ API DATA:", res.data);

//       const historyData = Array.isArray(res.data?.history)
//         ? res.data.history
//         : [];

//       setHistory(historyData);
//       setSummary(res.data?.summary || {});
//     } catch (err) {
//       console.log("❌ API ERROR:", err?.response || err);

//       if (err?.response?.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//       }
//     }
//   };

//   fetchParticipation();

// }, [dispatch]);


//   return (
//     <div className="bg-[#f8fafc] min-h-screen p-4 md:p-6">

//       {/* HERO */}
//       <div className="bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white rounded-2xl p-6 md:p-8 mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold">
//           {config.hero.title.replace(
//             "{name}",
//             user?.name || "Student"
//           )}
//         </h1>

//         <p className="mt-2 text-sm md:text-base opacity-90">
//           {config.hero.subtitle.replace(
//             "{active}",
//             user?.active || 0
//           )}
//         </p>

//         <div className="flex gap-4 mt-5 flex-wrap">
//           {config.stats.map((item, i) => (
//             <div key={i} className="bg-white/20 px-4 py-2 rounded-xl">
//               <p className="text-xs">{item.label}</p>
//               <p className="font-semibold">
//                 {user?.[item.key] || "-"}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* LEFT */}
//         <div className="lg:col-span-2 space-y-6">

//           {/* FEATURED */}
//           <div>
//             <div className="flex justify-between mb-4">
//               <h2 className="text-xl font-semibold">
//                 {config.featured.title}
//               </h2>
//               {/* <span className="text-[#82C600] text-sm cursor-pointer">
//                 {config.featured.action}
//               </span> */}
//               <button
//                 onClick={() => navigate("/student/contests")}
//                 className="text-[#82C600] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
//               >
//                 {config.featured.action} →
//               </button>
//             </div>

//             <Swiper
//               modules={[Autoplay]}
//               spaceBetween={20}
//               slidesPerView={1}
//               autoplay={{
//                 delay: 2500,
//                 disableOnInteraction: false,
//               }}
//               breakpoints={{
//                 640: { slidesPerView: 1.2 },
//                 768: { slidesPerView: 2 },
//                 1024: { slidesPerView: 2 },
//               }}
//             >
//               {contests.length === 0 ? (
//                 <p>No contests found</p>
//               ) : (
//                 contests.map((item, i) => (
//                   <SwiperSlide key={i}>
//                     <Card className="overflow-hidden p-0 shadow hover:shadow-lg transition">

//                       <div
//                         className="h-40 bg-cover bg-center"
//                         style={{
//                           backgroundImage: `url(${item.image || "/default.jpg"})`,
//                         }}
//                       />

//                       <div className="p-4">
//                         <div className="flex gap-2 text-xs mb-2">
//                           <span className="bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded">
//                             {item.category || "Contest"}
//                           </span>
//                           <span className="bg-[#FFD700]/30 px-2 py-1 rounded">
//                             {item.status || "Live"}
//                           </span>
//                         </div>

//                         <h3 className="font-semibold">
//                           {item.title}
//                         </h3>

//                         <p className="text-sm text-gray-500 mt-1">
//                           {item.description || "No description"}
//                         </p>

//                         <button
//                           onClick={() => {
//                             if (!isLoggedIn) {
//                               navigate("/login");
//                               return;
//                             }

//                             if (role !== "student") {
//                               alert("Only students can participate ❌");
//                               return;
//                             }

//                             navigate(`/student/contest/${item._id}`);
//                           }}
//                           className="mt-4 w-full bg-[#82C600] text-white py-2 rounded-xl hover:bg-[#6ea800] transition"
//                         >
//                           Participate Now
//                         </button>
//                       </div>

//                     </Card>
//                   </SwiperSlide>
//                 ))
//               )}
//             </Swiper>
//           </div>

//           {/* PARTICIPATION */}
//           <Card>
//             <h2 className="font-semibold mb-4">
//               {config.participation.title}
//             </h2>

//             {history.length === 0 ? (
//               <p className="text-gray-400 text-sm">
//                 No participation found
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {history.map((item) => {
//                   if (!item || !item.contest) return null;

//                   return (
//                     <div key={item._id} className="border rounded-xl p-3 flex gap-3">

//                       <img
//                         src={item.contest.image}
//                         alt="contest"
//                         className="w-16 h-16 rounded-lg object-cover"
//                       />

//                       <div className="flex-1">
//                         <h4 className="font-semibold text-sm">
//                           {item.contest.title}
//                         </h4>

//                         <p className="text-xs text-gray-500">
//                           {item.participationType === "team"
//                             ? `Team: ${item.team?.teamName}`
//                             : "Solo Participation"}
//                         </p>

//                         <p className="text-xs mt-1 text-gray-400">
//                           Deadline:{" "}
//                           {new Date(item.contest.deadline).toLocaleDateString()}
//                         </p>
//                       </div>

//                       <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded h-fit">
//                         Pending
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </Card>
//         </div>

//         {/* RIGHT */}
//         <div className="space-y-6">

//           <Card>
//             <h3 className="font-semibold mb-3">
//               {config.sidebar.deadlines}
//             </h3>

//             {history.length === 0 ? (
//               <p className="text-gray-400 text-sm">
//                 No deadlines
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {history.map((item) => {
//                   if (!item || !item.contest) return null;

//                   return (
//                     <div key={item._id} className="flex justify-between items-center border-b pb-2">

//                       <div>
//                         <p className="text-sm font-medium">
//                           {item.contest.title}
//                         </p>

//                         <p className="text-xs text-gray-500">
//                           {new Date(item.contest.deadline).toLocaleDateString()}
//                         </p>
//                       </div>

//                       <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
//                         Upcoming
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </Card>

//           <Card>
//             <h3 className="font-semibold mb-3">
//               {config.sidebar.progress}
//             </h3>

//             <p className="text-gray-400 text-sm">
//               No progress data
//             </p>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboardView;


// import Card from "@/components/ui/Card";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "@/features/contest/contestSlice";
// import API from "../../../services/axios";

// // ✅ Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const StudentDashboardView = ({ config }) => {
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);

//   const navigate = useNavigate();

//   const token = Cookies.get("token");
//   const role = Cookies.get("role");
//   const isLoggedIn = !!token;

//   const { contests = [], loading } = useSelector(
//     (state) => state.contest
//   );

//   const [history, setHistory] = useState([]);
//   const [summary, setSummary] = useState({});

//   // ✅ ADD (deadline logic)
//   const getRemainingTime = (deadline) => {
//     const now = new Date();
//     const end = new Date(deadline);
//     const diff = end - now;

//     if (diff <= 0) return "Expired";

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

//     if (days > 0) return `${days} day${days > 1 ? "s" : ""} left`;
//     if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} left`;

//     return "Ending soon";
//   };

//   useEffect(() => {
//     dispatch(fetchContests());

//     const fetchParticipation = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           console.log("❌ No token found");
//           return;
//         }

//         const res = await API.get(
//           "/participations/my-participations",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("✅ API DATA:", res.data);

//         // ✅ FIXED (ONLY CHANGE)
//         const historyData = Array.isArray(res.data?.participations)
//           ? res.data.participations
//           : [];

//         setHistory(historyData);
//         setSummary(res.data?.summary || {});

//       } catch (err) {
//         console.log("❌ API ERROR:", err?.response || err);

//         if (err?.response?.status === 401) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("role");
//         }
//       }
//     };

//     fetchParticipation();

//   }, [dispatch]);

//   return (
//     <div className="bg-[#f8fafc] min-h-screen p-4 md:p-6">

//       {/* HERO */}
//       <div className="bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white rounded-2xl p-6 md:p-8 mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold">
//           {config.hero.title.replace(
//             "{name}",
//             user?.name || "Student"
//           )}
//         </h1>

//         <p className="mt-2 text-sm md:text-base opacity-90">
//           {config.hero.subtitle.replace(
//             "{active}",
//             user?.active || 0
//           )}
//         </p>

//         <div className="flex gap-4 mt-5 flex-wrap">
//           {config.stats.map((item, i) => (
//             <div key={i} className="bg-white/20 px-4 py-2 rounded-xl">
//               <p className="text-xs">{item.label}</p>
//               <p className="font-semibold">
//                 {user?.[item.key] || "-"}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* LEFT */}
//         <div className="lg:col-span-2 space-y-6">

//           {/* FEATURED */}
//           <div>
//             <div className="flex justify-between mb-4">
//               <h2 className="text-xl font-semibold">
//                 {config.featured.title}
//               </h2>

//               <button
//                 onClick={() => navigate("/student/contests")}
//                 className="text-[#82C600] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
//               >
//                 {config.featured.action} →
//               </button>
//             </div>

//             <Swiper
//               modules={[Autoplay]}
//               spaceBetween={20}
//               slidesPerView={1}
//               autoplay={{
//                 delay: 2500,
//                 disableOnInteraction: false,
//               }}
//               breakpoints={{
//                 640: { slidesPerView: 1.2 },
//                 768: { slidesPerView: 2 },
//                 1024: { slidesPerView: 2 },
//               }}
//             >
//               {contests.length === 0 ? (
//                 <p>No contests found</p>
//               ) : (
//                 contests.map((item, i) => (
//                   <SwiperSlide key={i}>
//                     <Card className="overflow-hidden p-0 shadow hover:shadow-lg transition">

//                       <div
//                         className="h-40 bg-cover bg-center"
//                         style={{
//                           backgroundImage: `url(${item.image || "/default.jpg"})`,
//                         }}
//                       />

//                       <div className="p-4">
//                         <div className="flex gap-2 text-xs mb-2">
//                           <span className="bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded">
//                             {item.category || "Contest"}
//                           </span>
//                           <span className="bg-[#FFD700]/30 px-2 py-1 rounded">
//                             {item.status || "Live"}
//                           </span>
//                         </div>

//                         <h3 className="font-semibold">
//                           {item.title}
//                         </h3>

//                         <p className="text-sm text-gray-500 mt-1">
//                           {item.description || "No description"}
//                         </p>

//                         <button
//                           onClick={() => {
//                             if (!isLoggedIn) {
//                               navigate("/login");
//                               return;
//                             }

//                             if (role !== "student") {
//                               alert("Only students can participate ❌");
//                               return;
//                             }

//                             navigate(`/student/contest/${item._id}`);
//                           }}
//                           className="mt-4 w-full bg-[#82C600] text-white py-2 rounded-xl hover:bg-[#6ea800] transition"
//                         >
//                           Participate Now
//                         </button>
//                       </div>

//                     </Card>
//                   </SwiperSlide>
//                 ))
//               )}
//             </Swiper>
//           </div>

//           {/* PARTICIPATION */}
//           <Card>
//             <h2 className="font-semibold mb-4">
//               {config.participation.title}
//             </h2>

//             {history.length === 0 ? (
//               <p className="text-gray-400 text-sm">
//                 No participation found
//               </p>
//             ) : (
//               <div className="space-y-4">
//                 {history.map((item) => {
//                   if (!item || !item.contest) return null;

//                   const deadlineText = getRemainingTime(item.contest.deadline);
//                   const isUrgent = deadlineText.includes("hour") || deadlineText === "Ending soon";

//                   return (
//                     <div
//                       key={item._id}
//                       className="flex gap-4 p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
//                     >

//                       {/* IMAGE */}
//                       <img
//                         src={item.contest.image}
//                         alt="contest"
//                         className="w-16 h-16 rounded-xl object-cover"
//                       />

//                       {/* CONTENT */}
//                       <div className="flex-1 flex flex-col justify-between">

//                         <div>
//                           <h4 className="font-semibold text-gray-800 text-sm">
//                             {item.contest.title}
//                           </h4>

//                           <p className="text-xs text-gray-500 mt-1">
//                             {item.participationType === "team"
//                               ? `👥 Team: ${item.team?.teamName}`
//                               : "👤 Solo Participation"}
//                           </p>
//                         </div>

//                         {/* DEADLINE */}
//                         <p
//                           className={`text-xs mt-2 font-medium ${isUrgent
//                               ? "text-red-500"
//                               : "text-green-600"
//                             }`}
//                         >
//                           ⏳ {deadlineText}
//                         </p>
//                       </div>

//                       {/* STATUS */}
//                       <div className="flex flex-col justify-between items-end">
//                         <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
//                           Pending
//                         </span>

//                         <span className="text-[10px] text-gray-400">
//                           View →
//                         </span>
//                       </div>

//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </Card>
//         </div>

//         {/* RIGHT */}
//         <div className="space-y-6">

//           <Card>
//             <h3 className="font-semibold mb-3">
//               {config.sidebar.deadlines}
//             </h3>

//             {history.length === 0 ? (
//               <p className="text-gray-400 text-sm">
//                 No deadlines
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {history.map((item) => {
//                   if (!item || !item.contest) return null;

//                   return (
//                     <div key={item._id} className="flex justify-between items-center border-b pb-2">

//                       <div>
//                         <p className="text-sm font-medium">
//                           {item.contest.title}
//                         </p>

//                         {/* ✅ UPDATED DEADLINE */}
//                         <p className="text-xs text-gray-500">
//                           {getRemainingTime(item.contest.deadline)}
//                         </p>
//                       </div>

//                       <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
//                         Upcoming
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </Card>

//           <Card>
//             <h3 className="font-semibold mb-3">
//               {config.sidebar.progress}
//             </h3>

//             <p className="text-gray-400 text-sm">
//               No progress data
//             </p>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboardView;

// ✅ PRO LEVEL UI UPGRADE (Colorful + Modal Click + Premium Look)

// ✅ FIXED + YOUR BRAND COLOR + PRO DEADLINE UI + MODAL DATA FIX

import Card from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContests } from "@/features/contest/contestSlice";
import API from "../../../services/axios";
import { useNavigate } from "react-router-dom";

import { FiClock, FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const PRIMARY = "#82C600";

const StudentDashboardView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { contests = [] } = useSelector((state) => state.contest);

  const [history, setHistory] = useState([]);
  const [tab, setTab] = useState("active");

  // ✅ SAFE DEADLINE
  const getRemainingTime = (deadline) => {
    if (!deadline) return { text: "No deadline", color: "text-gray-400" };

    const now = new Date();
    const end = new Date(deadline);

    if (isNaN(end)) return { text: "Invalid date", color: "text-red-500" };

    const diff = end - now;

    if (diff <= 0) return { text: "Expired", color: "text-red-500" };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    if (days > 0) return { text: `${days}d left`, color: "text-green-600" };
    if (hours > 0) return { text: `${hours}h left`, color: "text-yellow-600" };

    return { text: "Ending soon", color: "text-red-500" };
  };

  const getStatusUI = (status) => {
    if (status === "active") {
      return {
        color: "text-green-500",
        icon: <FiLoader className="animate-spin" />,
      };
    }
    if (status === "completed") {
      return { color: "text-blue-500", icon: <FiCheckCircle /> };
    }
    return { color: "text-gray-400", icon: <FiAlertCircle /> };
  };

  const filteredContests = contests.filter((contest) => {
    const now = new Date();
    const start = contest.startDate ? new Date(contest.startDate) : null;
    const end = contest.deadline ? new Date(contest.deadline) : null;

    if (tab === "active") return start && end && start <= now && end > now;
    if (tab === "upcoming") return start && start > now;
    if (tab === "completed") return end && end < now;

    return true;
  });

  useEffect(() => {
    dispatch(fetchContests());

    const fetchParticipation = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/participations/my-participations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHistory(res.data.participations || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchParticipation();
  }, [dispatch]);

  return (
    <div className="bg-[#f8fafc] min-h-screen p-6">

      {/* HERO */}
      <div
        className="p-6 rounded-3xl text-white mb-6 shadow-xl"
        style={{ background: `linear-gradient(135deg, ${PRIMARY}, #6ea800)` }}
      >
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name || "Student"} 👋
        </h1>
        <p className="text-sm opacity-90 mt-1">
          Compete. Build. Win 🚀
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-6">
        {["active", "upcoming", "completed"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t
                ? "text-white shadow-lg"
                : "bg-white text-gray-500 border"
            }`}
            style={tab === t ? { background: PRIMARY } : {}}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* SLIDER */}
          <Card className="p-5 rounded-3xl shadow-lg">
            <h2 className="font-bold text-lg mb-4">🚀 Explore Contests</h2>

            <Swiper
              spaceBetween={20}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 2500 }}
              modules={[Autoplay]}
            >
              {filteredContests.map((contest) => {
                const time = getRemainingTime(contest.deadline);

                return (
                  <SwiperSlide key={contest._id}>
                    <div
                      onClick={() => navigate(`/contest/${contest._id}`)}
                      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition cursor-pointer group border hover:border-[#82C600]"
                    >
                      {/* IMAGE */}
                      <div className="relative">
                        <img
                          src={contest.image || "/default.jpg"}
                          className="w-full h-44 object-cover group-hover:scale-110 transition duration-300"
                        />

                        <span
                          className="absolute top-3 left-3 text-white text-xs px-3 py-1 rounded-full shadow"
                          style={{ background: PRIMARY }}
                        >
                          {contest.status}
                        </span>
                      </div>

                      {/* CONTENT */}
                      <div className="p-4">
                        <h3 className="text-sm font-semibold line-clamp-1">
                          {contest.title || "No title"}
                        </h3>

                        <p className={`text-xs flex items-center gap-2 mt-2 ${time.color}`}>
                          <FiClock /> {time.text}
                        </p>

                        {/* 🔥 BUTTON */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent card click conflict
                            navigate(`/contest/${contest._id}`);
                          }}
                          className="mt-4 w-full bg-[#82C600] hover:bg-[#6ea800] text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition"
                        >
                          View Details <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Card>

          {/* PARTICIPATION */}
          <Card className="p-5 rounded-3xl shadow-lg">
            <h2 className="font-bold text-lg mb-4">📜 My Participation</h2>

            <div className="space-y-4">
              {history.map((item) => {
                if (!item?.contest) return null;

                const statusUI = getStatusUI(item.contest.status);
                const time = getRemainingTime(item.contest.deadline);

                return (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/contest/${item.contest._id}`)}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-green-50 transition cursor-pointer border"
                  >
                    <img
                      src={item.contest.image || "/default.jpg"}
                      className="w-14 h-14 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">
                        {item.contest.title}
                      </h4>
                      <p className={`text-xs ${time.color}`}>
                        {time.text}
                      </p>
                    </div>

                    <span className={`text-xs flex items-center gap-1 ${statusUI.color}`}>
                      {statusUI.icon}
                      {item.contest.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

        </div>

        {/* RIGHT */}
        <div>
          <Card className="p-5 rounded-3xl shadow-lg">
            <h3 className="font-bold mb-3">⏳ Deadlines</h3>

            {history.map((item) => {
              if (!item?.contest) return null;

              const time = getRemainingTime(item.contest.deadline);

              return (
                <div
                  key={item._id}
                  className="flex justify-between py-2 border-b text-sm"
                >
                  <p>{item.contest.title}</p>
                  <span className={time.color}>{time.text}</span>
                </div>
              );
            })}
          </Card>
        </div>

      </div>

    </div>
  );
};

export default StudentDashboardView;