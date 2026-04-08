

// import Card from "../../components/ui/Card";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "../../features/contestSlice";
// import {authUser} from "../../features/authSlice"

// // ✅ Swiper import
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// const StudentDashboardView = ({ data, config }) => {

//   if (!data) return <p>Loading...</p>;
//   const dispatch = useDispatch();

//   const { user: authUser } = useSelector((state) => state.auth);
//   const { contests = [] } = useSelector((state) => state.contest);

//   useEffect(() => {
//     dispatch(fetchContests());
//   }, [dispatch]);

//   const {
//   participation = [],
//   deadlines = [],
//   progress = [],
// } = data;

// const user = authUser || {};

//   return (
//     <div className="bg-[#f8fafc] min-h-screen p-4 md:p-6">

//       {/* HERO */}
//       <div className="bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white rounded-2xl p-6 md:p-8 mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold">
//           {config.hero.title.replace("{name}", user.name || "Student")}
//         </h1>

//         <p className="mt-2 text-sm md:text-base opacity-90">
//           {config.hero.subtitle.replace("{active}", user.active || 0)}
//         </p>

//         <div className="flex gap-4 mt-5 flex-wrap">
//           {config.stats.map((item, i) => (
//             <div key={i} className="bg-white/20 px-4 py-2 rounded-xl">
//               <p className="text-xs">{item.label}</p>
//               <p className="font-semibold">
//                 {user[item.key] || "-"}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* LEFT */}
//         <div className="lg:col-span-2 space-y-6">

//           {/* 🔥 FEATURED SLIDER */}
//           <div>
//             <div className="flex justify-between mb-4">
//               <h2 className="text-xl font-semibold">
//                 {config.featured.title}
//               </h2>
//               <span className="text-[#82C600] text-sm cursor-pointer">
//                 {config.featured.action}
//               </span>
//             </div>

//             {/* ✅ SWIPER */}
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
//               {challenges.map((item, i) => (
//                 <SwiperSlide key={i}>
//                   <Card className="overflow-hidden p-0 shadow hover:shadow-lg transition">

//                     {/* ✅ IMAGE */}
//                     <div
//                       className="h-40 bg-cover bg-center"
//                       style={{
//                         backgroundImage: `url(${item.image})`,
//                       }}
//                     />

//                     <div className="p-4">
//                       <div className="flex gap-2 text-xs mb-2">
//                         <span className="bg-[#82C600]/20 text-[#82C600] px-2 py-1 rounded">
//                           {item.category}
//                         </span>
//                         <span className="bg-[#FFD700]/30 px-2 py-1 rounded">
//                           {item.tag || "Live"}
//                         </span>
//                       </div>

//                       <h3 className="font-semibold">
//                         {item.title}
//                       </h3>

//                       <p className="text-sm text-gray-500 mt-1">
//                         {item.desc || item.subtitle}
//                       </p>

//                       <button className="mt-4 w-full bg-[#82C600] text-white py-2 rounded-xl hover:bg-[#6ea800] transition">
//                         Participate Now
//                       </button>
//                     </div>

//                   </Card>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* PARTICIPATION */}
//           <Card>
//             <h2 className="font-semibold mb-4">
//               {config.participation.title}
//             </h2>

//             {participation.length === 0 ? (
//               <p className="text-gray-400 text-sm">
//                 No participation yet
//               </p>
//             ) : (
//               participation.map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-between items-center py-3 border-b last:border-none"
//                 >
//                   <div>
//                     <p className="font-medium">{item.title}</p>
//                     <p className="text-xs text-gray-400">
//                       {item.subtitle}
//                     </p>
//                   </div>

//                   <span
//                     className={`text-xs px-3 py-1 rounded-full ${
//                       item.status === "submitted"
//                         ? "bg-[#82C600]/20 text-[#82C600]"
//                         : item.status === "pending"
//                         ? "bg-[#FFD700]/30"
//                         : "bg-blue-100 text-blue-600"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </div>
//               ))
//             )}
//           </Card>
//         </div>

//         {/* RIGHT */}
//         <div className="space-y-6">

//           {/* DEADLINES */}
//           <Card>
//             <h3 className="font-semibold mb-3">
//               {config.sidebar.deadlines}
//             </h3>

//             {deadlines.length === 0 ? (
//               <p className="text-gray-400 text-sm">
//                 No deadlines
//               </p>
//             ) : (
//               deadlines.map((d, i) => (
//                 <div key={i} className="flex gap-3 mb-3">
//                   <div className="bg-gray-100 px-2 py-1 rounded text-xs text-center">
//                     <p className="font-bold">{d.date}</p>
//                     <p>{d.month}</p>
//                   </div>

//                   <div>
//                     <p className="text-sm font-medium">
//                       {d.title}
//                     </p>
//                     {d.time && (
//                       <p className="text-xs text-red-500">
//                         Closes in {d.time}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </Card>

//           {/* PROGRESS */}
//           <Card>
//             <h3 className="font-semibold mb-3">
//               {config.sidebar.progress}
//             </h3>

//             {progress.length === 0 ? (
//               <p className="text-gray-400 text-sm">
//                 No progress data
//               </p>
//             ) : (
//               progress.map((p, i) => (
//                 <div key={i} className="mb-3">
//                   <p className="text-xs">{p.label}</p>
//                   <div className="h-2 bg-gray-200 rounded">
//                     <div
//                       className="h-2 bg-[#82C600]"
//                       style={{ width: `${p.value}%` }}
//                     />
//                   </div>
//                 </div>
//               ))
//             )}
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };


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

//   // ✅ Auth Data (student)
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   // ✅ Contest Data (featured)
//   const { contests = [], loading } = useSelector(
//     (state) => state.contest
//   );

//   // ✅ Fetch contests on load
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

//           {/* 🔥 FEATURED SLIDER */}
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
//                             // ❌ Not logged
//                             if (!user) {
//                               navigate("/login");
//                               return;
//                             }

//                             // ❌ Not student
//                             if (user.role !== "student") {
//                               alert("Only students can participate ❌");
//                               return;
//                             }

//                             // ✅ Go to student participate page
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

//           {/* PARTICIPATION (optional API later) */}
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

//           {/* DEADLINES */}
//           <Card>
//             <h3 className="font-semibold mb-3">
//               {config.sidebar.deadlines}
//             </h3>

//             <p className="text-gray-400 text-sm">
//               No deadlines (connect API)
//             </p>
//           </Card>

//           {/* PROGRESS */}
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


import Card from "../../components/ui/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContests } from "../../features/contestSlice";

// ✅ Swiper (Navigation REMOVED)
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

const StudentDashboardView = ({ config }) => {
  const dispatch = useDispatch();

  // ✅ Redux user
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // ✅ LocalStorage login
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;

  // ✅ Contest Data
  const { contests = [], loading } = useSelector(
    (state) => state.contest
  );

  useEffect(() => {
    dispatch(fetchContests());
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

                      {/* IMAGE */}
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

            <p className="text-gray-400 text-sm">
              No participation data (connect API)
            </p>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <Card>
            <h3 className="font-semibold mb-3">
              {config.sidebar.deadlines}
            </h3>

            <p className="text-gray-400 text-sm">
              No deadlines (connect API)
            </p>
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