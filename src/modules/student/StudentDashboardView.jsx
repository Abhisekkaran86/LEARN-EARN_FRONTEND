


// import Card from "../../components/ui/Card";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "../../features/contestSlice";

// // ✅ Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import { useNavigate } from "react-router-dom";

// const StudentDashboardView = ({ config }) => {
//   const dispatch = useDispatch();

//   // ✅ Redux user (may be null after refresh)
//   const { user } = useSelector((state) => state.auth);

//   const navigate = useNavigate();

//   // ✅ 🔥 ADD THIS (LOCAL STORAGE LOGIN FIX)
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
//               modules={[Autoplay, Navigation]}
//               spaceBetween={20}
//               slidesPerView={1}
//               navigation
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
//                             // ✅ FIXED LOGIN CHECK (NO UI CHANGE)
//                             if (!isLoggedIn) {
//                               navigate("/login");
//                               return;
//                             }

//                             // ❌ Not student
//                             if (role !== "student") {
//                               alert("Only students can participate ❌");
//                               return;
//                             }

//                             // ✅ Navigate
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


// import Card from "../../components/ui/Card";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "../../features/contestSlice";

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

import Card from "../../components/ui/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContests } from "../../features/contestSlice";
import axios from "axios";

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const StudentDashboardView = ({ config }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // ✅ FIXED AUTH (USE COOKIES ONLY)
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const isLoggedIn = !!token;

  // ✅ Contest
  const { contests = [], loading } = useSelector(
    (state) => state.contest
  );

  // ✅ Participation state
  const [history, setHistory] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
  dispatch(fetchContests());

  const fetchParticipation = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("❌ No token found");
        return;
      }

      const res = await axios.get(
        "https://learn-earn-contest-2.onrender.com/api/v1/participations/my-history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ API DATA:", res.data);

      // ✅ SAFE DATA SET
      const historyData = Array.isArray(res.data?.history)
        ? res.data.history
        : [];

      setHistory(historyData);
      setSummary(res.data?.summary || {});

    } catch (err) {
      console.log("❌ API ERROR:", err?.response || err);

      // 🔥 HANDLE TOKEN EXPIRE
      if (err?.response?.status === 401) {
        console.log("🔴 Token expired → login again");

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        
      }
    }
  };

  fetchParticipation(); // ✅ always call

}, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white rounded-2xl p-6 md:p-8 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          {config.hero.title.replace(
            "{name}",
            user?.name || "Student"
          )}
        </h1>

        <p className="mt-2 text-sm md:text-base opacity-90">
          {config.hero.subtitle.replace(
            "{active}",
            user?.active || 0
          )}
        </p>

        <div className="flex gap-4 mt-5 flex-wrap">
          {config.stats.map((item, i) => (
            <div key={i} className="bg-white/20 px-4 py-2 rounded-xl">
              <p className="text-xs">{item.label}</p>
              <p className="font-semibold">
                {user?.[item.key] || "-"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* FEATURED */}
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {config.featured.title}
              </h2>
              <span className="text-[#82C600] text-sm cursor-pointer">
                {config.featured.action}
              </span>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 1.2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
              }}
            >
              {contests.length === 0 ? (
                <p>No contests found</p>
              ) : (
                contests.map((item, i) => (
                  <SwiperSlide key={i}>
                    <Card className="overflow-hidden p-0 shadow hover:shadow-lg transition">

                      <div
                        className="h-40 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${item.image || "/default.jpg"})`,
                        }}
                      />

                      <div className="p-4">
                        <div className="flex gap-2 text-xs mb-2">
                          <span className="bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded">
                            {item.category || "Contest"}
                          </span>
                          <span className="bg-[#FFD700]/30 px-2 py-1 rounded">
                            {item.status || "Live"}
                          </span>
                        </div>

                        <h3 className="font-semibold">
                          {item.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {item.description || "No description"}
                        </p>

                        <button
                          onClick={() => {
                            if (!isLoggedIn) {
                              navigate("/login");
                              return;
                            }

                            if (role !== "student") {
                              alert("Only students can participate ❌");
                              return;
                            }

                            navigate(`/student/contest/${item._id}`);
                          }}
                          className="mt-4 w-full bg-[#82C600] text-white py-2 rounded-xl hover:bg-[#6ea800] transition"
                        >
                          Participate Now
                        </button>
                      </div>

                    </Card>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>

          {/* PARTICIPATION */}
          <Card>
            <h2 className="font-semibold mb-4">
              {config.participation.title}
            </h2>

            {history.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No participation found
              </p>
            ) : (
              <div className="space-y-3">
                {history.map((item) => {
                  if (!item || !item.contest) return null;

                  return (
                    <div key={item._id} className="border rounded-xl p-3 flex gap-3">

                      <img
                        src={item.contest.image}
                        alt="contest"
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">
                          {item.contest.title}
                        </h4>

                        <p className="text-xs text-gray-500">
                          {item.participationType === "team"
                            ? `Team: ${item.team?.teamName}`
                            : "Solo Participation"}
                        </p>

                        <p className="text-xs mt-1 text-gray-400">
                          Deadline:{" "}
                          {new Date(item.contest.deadline).toLocaleDateString()}
                        </p>
                      </div>

                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded h-fit">
                        Pending
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <Card>
            <h3 className="font-semibold mb-3">
              {config.sidebar.deadlines}
            </h3>

            {history.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No deadlines
              </p>
            ) : (
              <div className="space-y-3">
                {history.map((item) => {
                  if (!item || !item.contest) return null;

                  return (
                    <div key={item._id} className="flex justify-between items-center border-b pb-2">

                      <div>
                        <p className="text-sm font-medium">
                          {item.contest.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          {new Date(item.contest.deadline).toLocaleDateString()}
                        </p>
                      </div>

                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Upcoming
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          <Card>
            <h3 className="font-semibold mb-3">
              {config.sidebar.progress}
            </h3>

            <p className="text-gray-400 text-sm">
              No progress data
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardView;