


// import Container from "../components/Container";
// import Button from "../components/ui/Button";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "../features/contestSlice";

// import { useNavigate } from "react-router-dom";

// import "swiper/css";

// const Challenges = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { contests = [] } = useSelector((state) => state.contest);

//   useEffect(() => {
//     dispatch(fetchContests());
//   }, [dispatch]);

//   const activeContests = contests.filter(
//     (item) => item.status === "active"
//   );

//   const upcomingContests = contests.filter(
//     (item) => item.status === "upcoming"
//   );

//   const mergedContests = [...activeContests, ...upcomingContests];

//   return (
//     <section className="py-24 bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] overflow-hidden">
//       <Container>

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//           <div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//               Explore{" "}
//               <span className="bg-gradient-to-r from-[#82C600] to-[#a3e635] bg-clip-text text-transparent">
//                 Live Challenges
//               </span>
//             </h2>

//             <p className="text-gray-500 mt-4 max-w-md">
//               Compete with top students, win rewards, and level up your career 🚀
//             </p>
//           </div>
//         </div>

//         <div className="mt-14">
//           {mergedContests.length === 0 ? (
//             <p className="text-center text-gray-500">
//               No active contests available 😔
//             </p>
//           ) : (
//             <Swiper
//               modules={[Autoplay]}
//               spaceBetween={25}
//               slidesPerView={1}
//               loop={true}
//               speed={2000}
//               autoplay={{
//                 delay: 0,
//                 disableOnInteraction: false,
//               }}
//               breakpoints={{
//                 640: { slidesPerView: 2 },
//                 768: { slidesPerView: 2 },
//                 1024: { slidesPerView: 3 },
//               }}
//             >
//               {mergedContests.map((item) => (
//                 <SwiperSlide key={item._id}>

//                   {/* ✅ FULL CARD CLICKABLE */}
//                   <div
//                     onClick={() => navigate("/contests")}
//                     className="h-[380px] flex flex-col justify-between relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
//                   >

//                     <div
//                       className="h-44 bg-cover bg-center relative"
//                       style={{
//                         backgroundImage: `url(${item.image || item.thumbnail || "https://via.placeholder.com/300"})`,
//                       }}
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

//                       <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold bg-[#82C600] text-white shadow">
//                         Active
//                       </span>
//                     </div>

//                     <div className="p-5 flex flex-col justify-between flex-1">

//                       <div>
//                         <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#82C600] transition">
//                           {item.title}
//                         </h3>

//                         <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                           {item.description}
//                         </p>

//                         <p className="mt-3 text-sm font-semibold text-[#82C600]">
//                           🎁 {item.rewards?.[0] || "No reward"}
//                         </p>

//                         <div className="text-xs text-gray-400 mt-2 space-y-1">
//                           <p>📅 {new Date(item.startDate).toLocaleDateString()}</p>
//                           <p>⏳ {new Date(item.deadline).toLocaleDateString()}</p>
//                         </div>
//                       </div>

//                       {/* ✅ BUTTON CLICK (STOP PROPAGATION) */}
//                       <Button
//                         size="sm"
//                         className="mt-4 w-full bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white"
//                         onClick={(e) => {
//                           e.stopPropagation(); // 🛑 prevent parent click
//                           navigate("/contests");
//                         }}
//                       >
//                         View Details →
//                       </Button>

//                     </div>

//                     <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#82c600]/20 to-[#a3e635]/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

//                   </div>

//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           )}
//         </div>

//       </Container>
//     </section>
//   );
// };

// export default Challenges;

import Container from "../components/Container";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContests } from "../features/contestSlice";

import { useNavigate } from "react-router-dom";

import { FiClock, FiCalendar } from "react-icons/fi";
import { FaGift } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";

import "swiper/css";

const Challenges = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { contests = [], loading } = useSelector((state) => state.contest);

  const [tab, setTab] = useState("active");
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    dispatch(fetchContests());

    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // ⏳ Countdown
  const getTimeLeft = (deadline) => {
    const total = new Date(deadline) - new Date();
    if (total <= 0) return null;

    const s = Math.floor((total / 1000) % 60);
    const m = Math.floor((total / 1000 / 60) % 60);
    const h = Math.floor((total / (1000 * 60 * 60)) % 24);
    const d = Math.floor(total / (1000 * 60 * 60 * 24));

    return { d, h, m, s };
  };

  const filtered = contests.filter((c) => c.status === tab);

  return (
    <section className="py-24 bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5]">
      <Container>

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold">
            Explore{" "}
            <span className="bg-gradient-to-r from-[#82C600] to-[#a3e635] bg-clip-text text-transparent">
              Challenges
            </span>
          </h2>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-10">
          {["active", "upcoming"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition
                ${tab === t
                  ? "bg-[#82C600] text-white"
                  : "bg-gray-100 text-gray-600"
                }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* SKELETON */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[480px] rounded-3xl bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        ) : (

          <Swiper
            key={tab}
            modules={[Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={1}
            loop={filtered.length > 3}
            freeMode={true}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onMouseEnter={(swiper) => swiper.autoplay.stop()}
            onMouseLeave={(swiper) => swiper.autoplay.start()}
          >

            {filtered.map((item) => {
              const t = getTimeLeft(item.deadline);

              return (
                <SwiperSlide key={item._id}>

                  {/* CARD */}
                  <div
                    onClick={() => navigate(`/contest/${item._id}`)}
                    className="group relative h-[480px] flex flex-col rounded-[28px] overflow-hidden 
                    bg-white/70 backdrop-blur-2xl border border-white/30
                    shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_25px_70px_rgba(130,198,0,0.25)]
                    transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]
                    cursor-pointer"
                  >

                    {/* IMAGE */}
                    <div className="h-52 relative flex-shrink-0 overflow-hidden">

                      <img
                        src={item.image || item.thumbnail}
                        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-30"
                      />

                      <img
                        src={item.image || item.thumbnail}
                        alt={item.title}
                        className="relative w-full h-full object-contain p-4"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      {/* STATUS */}
                      <span className="absolute top-4 right-4 flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#82C600] text-white">
                        <HiOutlineStatusOnline />
                        {item.status}
                      </span>

                      {/* TYPE */}
                      <span className="absolute bottom-4 left-4 text-xs px-3 py-1 rounded-full bg-white/90 font-semibold">
                        {item.participationType}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col flex-1 p-5">

                      <div className="flex-1 flex flex-col">

                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#82C600]">
                          {item.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                          {item.description}
                        </p>

                        {/* REWARD */}
                        <div className="mt-3 flex items-center gap-2 text-[#82C600] text-sm font-semibold">
                          <FaGift />
                          {item.rewards?.[0] || "No reward"}
                        </div>

                        {/* DATE */}
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                          <FiCalendar />
                          {new Date(item.startDate).toLocaleDateString()}
                        </div>

                        {/* COUNTDOWN */}
                        {t && item.status === "active" && (
                          <div className="mt-3 flex items-center justify-between bg-gray-100 px-3 py-2 rounded-xl text-xs font-semibold">
                            <div className="flex items-center gap-1">
                              <FiClock /> Ends in
                            </div>
                            <div className="flex gap-1">
                              <span>{t.d}d</span>
                              <span>{t.h}h</span>
                              <span>{t.m}m</span>
                              <span>{t.s}s</span>
                            </div>
                          </div>
                        )}

                        <div className="mt-auto" />
                      </div>

                      {/* 🔥 PROFESSIONAL CTA */}
                      <div className="pt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/contest/${item._id}`);
                          }}
                          className="w-full py-2.5 rounded-xl text-sm font-semibold 
                          bg-gradient-to-r from-[#82C600] to-[#a3e635] 
                          text-white shadow-md hover:shadow-xl 
                          transition-all duration-300 hover:scale-[1.02]"
                        >
                          View Contest →
                        </button>
                      </div>

                    </div>

                    {/* GLOW */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                    bg-gradient-to-r from-[#82c600]/20 to-[#a3e635]/20 blur-2xl"></div>

                  </div>

                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

      </Container>
    </section>
  );
};

export default Challenges;