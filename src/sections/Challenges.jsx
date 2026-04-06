
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


// import Container from "../components/Container";
// import Button from "../components/ui/Button";
// import { challenges } from "../data/challengesData";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchContests } from "../features/contestSlice";

// import { useNavigate } from "react-router-dom"; // ✅ added

// import "swiper/css";
// import "swiper/css/navigation";

// const Challenges = () => {
//   const navigate = useNavigate(); // ✅ added
//   const dispatch = useDispatch();

// const { contests = [] } = useSelector((state) => state.contest);

// useEffect(() => {
//   dispatch(fetchContests());
// }, [dispatch]);

//   return (
//     <section className="py-24 bg-[#f6f7fb]">
//       <Container>

//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-3xl font-bold">Active Challenges</h2>
//             <p className="text-gray-500 text-sm mt-1">
//               Explore live contests and boost your skills
//             </p>
//           </div>

//           <Button variant="ghost" full={false}>
//             View all →
//           </Button>
//         </div>

//         <div className="mt-10">
//           <Swiper
//             modules={[Autoplay, Navigation]}
//             spaceBetween={20}
//             slidesPerView={1}
//             navigation
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}
//             breakpoints={{
//               640: { slidesPerView: 1.2 },
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//           >
//             {contests.map((item, i) => (
//               <SwiperSlide key={i}>
//                 <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

//                   <div
//                     className="h-44 bg-cover bg-center"
//                     style={{ backgroundImage: `url(${item.image})` }}
//                   />

//                   <div className="p-5">
//                     <span className="text-xs bg-[#82c600]/10 text-[#82c600] px-2 py-1 rounded">
//                       {item.category}
//                     </span>

//                     <h3 className="font-semibold mt-3">
//                       {item.title}
//                     </h3>

//                     <p className="text-[#82c600] mt-2 font-medium">
//                       {item.prize}
//                     </p>

//                     {/* ✅ Navigation added */}
//                     <Button
//                       size="sm"
//                       className="mt-4"
//                       onClick={() => navigate("/login")}
//                     >
//                       View Details
//                     </Button>

//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//       </Container>
//     </section>
//   );
// };

// export default Challenges;


import Container from "../components/Container";
import Button from "../components/ui/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContests } from "../features/contestSlice";

import { useNavigate } from "react-router-dom";

import "swiper/css";

const Challenges = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { contests = [] } = useSelector((state) => state.contest);

  useEffect(() => {
    dispatch(fetchContests());
  }, [dispatch]);

  const activeContests = contests.filter(
    (item) => item.status === "active"
  );

  const upcomingContests = contests.filter(
    (item) => item.status === "upcoming"
  );

  const mergedContests = [...activeContests, ...upcomingContests];

  return (
    <section className="py-24 bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] overflow-hidden">
      <Container>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Explore{" "}
              <span className="bg-gradient-to-r from-[#82C600] to-[#a3e635] bg-clip-text text-transparent">
                Live Challenges
              </span>
            </h2>

            <p className="text-gray-500 mt-4 max-w-md">
              Compete with top students, win rewards, and level up your career 🚀
            </p>
          </div>
        </div>

        <div className="mt-14">
          {mergedContests.length === 0 ? (
            <p className="text-center text-gray-500">
              No active contests available 😔
            </p>
          ) : (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={25}
              slidesPerView={1}
              loop={true}
              speed={2000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {mergedContests.map((item) => (
                <SwiperSlide key={item._id}>
                  
                  {/* ✅ FULL CARD CLICKABLE */}
                  <div
                    onClick={() => navigate("/contests")}
                    className="h-[380px] flex flex-col justify-between relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
                  >

                    <div
                      className="h-44 bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url(${item.image || item.thumbnail || "https://via.placeholder.com/300"})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold bg-[#82C600] text-white shadow">
                        Active
                      </span>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-1">

                      <div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#82C600] transition">
                          {item.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                          {item.description}
                        </p>

                        <p className="mt-3 text-sm font-semibold text-[#82C600]">
                          🎁 {item.rewards?.[0] || "No reward"}
                        </p>

                        <div className="text-xs text-gray-400 mt-2 space-y-1">
                          <p>📅 {new Date(item.startDate).toLocaleDateString()}</p>
                          <p>⏳ {new Date(item.deadline).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* ✅ BUTTON CLICK (STOP PROPAGATION) */}
                      <Button
                        size="sm"
                        className="mt-4 w-full bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white"
                        onClick={(e) => {
                          e.stopPropagation(); // 🛑 prevent parent click
                          navigate("/contests");
                        }}
                      >
                        View Details →
                      </Button>

                    </div>

                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#82c600]/20 to-[#a3e635]/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

                  </div>

                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

      </Container>
    </section>
  );
};

export default Challenges;