


// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaArrowRight, FaTrophy, FaUsers } from "react-icons/fa";
// import { FiCalendar, FiClock } from "react-icons/fi";

// const ContestDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { contests = [] } = useSelector((state) => state.contest);

//   const contest = contests.find((c) => c._id === id);

//   if (!contest) {
//     return <div className="text-center py-20">Contest not found</div>;
//   }

//   const daysLeft = Math.ceil(
//     (new Date(contest.deadline) - new Date()) / (1000 * 60 * 60 * 24)
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] px-4 md:px-10 py-10">

//       {/* 🔥 HERO PREMIUM */}
//       <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(130,198,0,0.2)] mb-14 group">

//         <img
//           src={contest.image}
//           alt={contest.title}
//           className="w-full h-[320px] md:h-[450px] object-cover group-hover:scale-105 transition duration-700"
//         />

//         {/* GRADIENT OVERLAY */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

//         {/* GREEN GLOW */}
//         <div className="absolute inset-0 bg-gradient-to-r from-[#82C600]/20 to-[#a3e635]/20 opacity-0 group-hover:opacity-100 transition"></div>

//         <div className="absolute bottom-0 p-6 md:p-10 text-white">

//           {/* TAGS */}
//           <div className="flex gap-3 mb-4 flex-wrap">
//             <span className="bg-gradient-to-r from-[#82C600] to-[#a3e635] px-4 py-1 rounded-full text-xs font-semibold shadow">
//               {contest.status}
//             </span>

//             <span className="bg-white/20 backdrop-blur px-4 py-1 rounded-full text-xs flex items-center gap-1">
//               <FaTrophy /> {contest.rewards?.[0] || "Reward"}
//             </span>
//           </div>

//           {/* TITLE */}
//           <h1 className="text-3xl md:text-5xl font-bold leading-tight">
//             {contest.title}
//           </h1>

//           {/* DESC */}
//           <p className="mt-3 text-gray-200 max-w-2xl text-sm md:text-base">
//             {contest.description}
//           </p>

//           {/* CTA */}
//           <button
//             onClick={() => navigate(`/student/contest/${contest._id}`)}
//             className="mt-6 flex items-center gap-2 
//             bg-gradient-to-r from-[#82C600] to-[#a3e635] 
//             px-7 py-3 rounded-xl font-semibold 
//             shadow-lg hover:shadow-[0_10px_30px_rgba(130,198,0,0.5)]
//             hover:scale-105 transition-all"
//           >
//             Participate Now <FaArrowRight />
//           </button>

//         </div>
//       </div>

//       {/* 🔥 STATS GRID PREMIUM */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">

//         {[
//           { label: "Category", value: contest.category || "General" },
//           { label: "Level", value: contest.level || "All" },
//           {
//             label: "Start",
//             value: new Date(contest.startDate).toLocaleDateString(),
//             icon: <FiCalendar />,
//           },
//           {
//             label: "Deadline",
//             value: new Date(contest.deadline).toLocaleDateString(),
//             icon: <FiClock />,
//           },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className="bg-white/60 backdrop-blur-xl p-5 rounded-2xl border 
//             shadow-md hover:shadow-xl hover:-translate-y-1 transition"
//           >
//             <p className="text-gray-400 text-xs">{item.label}</p>
//             <p className="font-semibold flex items-center gap-2 mt-1">
//               {item.icon} {item.value}
//             </p>
//           </div>
//         ))}

//         {/* PARTICIPANTS */}
//         <div className="col-span-2 bg-white/60 backdrop-blur-xl p-5 rounded-2xl border shadow-md">
//           <p className="text-gray-400 text-xs">Participants</p>

//           <p className="font-semibold flex items-center gap-2 mt-1">
//             <FaUsers /> {contest.participants?.length || 0}
//           </p>

//           {/* PROGRESS BAR */}
//           <div className="w-full bg-gray-200 h-2 rounded-full mt-3 overflow-hidden">
//             <div
//               className="bg-gradient-to-r from-[#82C600] to-[#a3e635] h-2 rounded-full transition-all"
//               style={{
//                 width: `${Math.min(
//                   (contest.participants?.length || 0) * 10,
//                   100
//                 )}%`,
//               }}
//             />
//           </div>
//         </div>

//         {/* TIME LEFT */}
//         <div className="col-span-2 bg-white/60 backdrop-blur-xl p-5 rounded-2xl border shadow-md">
//           <p className="text-gray-400 text-xs">Time Left</p>

//           <p className="font-semibold mt-1 text-red-500">
//             {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
//           </p>
//         </div>

//       </div>

//       {/* 🔥 RELATED PREMIUM */}
//       <div>
//         <h2 className="text-2xl font-bold mb-6">
//           Related Contests
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

//           {contests
//             .filter((c) => c._id !== contest._id)
//             .slice(0, 3)
//             .map((item) => (
//               <div
//                 key={item._id}
//                 onClick={() => navigate(`/contest/${item._id}`)}
//                 className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition cursor-pointer"
//               >
//                 <div className="relative h-44 overflow-hidden">
//                   <img
//                     src={item.image}
//                     className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                 </div>

//                 <div className="p-4">
//                   <h3 className="font-semibold group-hover:text-[#82C600]">
//                     {item.title}
//                   </h3>

//                   <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}

//         </div>
//       </div>

//     </div>
//   );
// };

// export default ContestDetails;
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaArrowRight, FaUsers, FaUser } from "react-icons/fa";
// import { FiCalendar, FiClock } from "react-icons/fi";

// const ContestDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { contests = [] } = useSelector((state) => state.contest);
//   const contest = contests.find((c) => c._id === id);

//   const contestType =
//     contest?.type || contest?.participationType || "solo";

//   const startDate = contest?.startDate
//     ? new Date(contest.startDate)
//     : null;

//   const deadline = contest?.deadline
//     ? new Date(contest.deadline)
//     : null;

//   const duration =
//     startDate && deadline
//       ? Math.round((deadline - startDate) / (1000 * 60 * 60))
//       : "N/A";

//   const getLabel = (type) => {
//     if (type === "solo") return "Individual";
//     if (type === "team") return "Team";
//     return "Individual & Team";
//   };

//   const renderIcon = (type) => {
//     if (type === "solo") return <FaUser />;
//     if (type === "team") return <FaUsers />;
//     return (
//       <div className="flex -space-x-1">
//         <FaUser />
//         <FaUsers />
//       </div>
//     );
//   };

//   if (!contest) return <div>Not found</div>;

//   return (
//     <div className="min-h-screen bg-[#f8fafc]">

//       <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">

//         {/* LEFT */}
//         <div>
//           <div className="rounded-2xl overflow-hidden shadow-sm">
//             <img
//               src={contest.image}
//               className="w-full h-[380px] object-cover"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-3 mt-4">

//             <div className="bg-white p-4 rounded-xl border">
//               <p className="text-xs text-gray-400">Participants</p>
//               <p className="font-semibold">
//                 {contest.participants?.length || 0}
//               </p>
//             </div>

//             <div className="bg-white p-4 rounded-xl border">
//               <p className="text-xs text-gray-400">Duration</p>
//               <p className="font-semibold">
//                 {duration !== "N/A" ? `${duration} hrs` : "N/A"}
//               </p>
//             </div>

//           </div>
//         </div>

//         {/* RIGHT */}
//         <div>

//           <h1 className="text-3xl font-semibold text-gray-900">
//             {contest.title}
//           </h1>

//           <div className="flex gap-2 mt-3 flex-wrap">

//             <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
//               {contest.status}
//             </span>

//             <span className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-1 rounded-full">
//               {renderIcon(contestType)}
//               {getLabel(contestType)}
//             </span>

//           </div>

//           <p className="mt-5 text-gray-600 text-sm leading-relaxed">
//             {contest.description}
//           </p>

//           <button
//             onClick={() => navigate(`/student/contest/${contest._id}`)}
//             className="mt-6 bg-[#82C600] hover:bg-[#6ea800] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
//           >
//             Participate <FaArrowRight />
//           </button>

//           <div className="mt-10 border-t pt-6 space-y-4 text-sm">

//             <div className="flex justify-between">
//               <span className="text-gray-400">Start Date</span>
//               <span className="flex items-center gap-1">
//                 <FiCalendar />
//                 {startDate?.toLocaleDateString() || "N/A"}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-400">Deadline</span>
//               <span className="flex items-center gap-1">
//                 <FiClock />
//                 {deadline?.toLocaleDateString() || "N/A"}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-400">Participation</span>
//               <span>{getLabel(contestType)}</span>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* ✅ RELATED CONTESTS FIXED */}
//       <div className="max-w-6xl mx-auto px-4 pb-10">

//         <div className="flex justify-between mb-6">
//           <h2 className="font-medium text-gray-800">
//             More contests
//           </h2>

//           <button
//             onClick={() => navigate("/contests")}
//             className="text-[#82C600] text-sm"
//           >
//             View all →
//           </button>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">

//           {contests
//             .filter(
//               (c) =>
//                 String(c._id).slice(0, 4) !==
//                 String(contest._id).slice(0, 4)
//             )
//             .slice(0, 3)
//             .map((item) => (
//               <div
//                 key={item._id}
//                 onClick={() => navigate(`/contest/${item._id}`)}
//                 className="cursor-pointer bg-white rounded-xl border hover:shadow-md transition"
//               >
//                 <img
//                   src={item.image}
//                   className="h-40 w-full object-cover rounded-t-xl"
//                 />

//                 <div className="p-3">
//                   <h3 className="font-semibold text-sm">
//                     {item.title}
//                   </h3>
//                   <p className="text-xs text-gray-500 line-clamp-2">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ContestDetails;

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaArrowRight, FaUsers, FaUser } from "react-icons/fa";
import { FiCalendar, FiClock } from "react-icons/fi";
import API from "../../../services/axios";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { contests = [] } = useSelector((state) => state.contest);
  const contest = contests.find((c) => c._id === id);

  const [isJoined, setIsJoined] = useState(false);

  const contestType =
    contest?.type || contest?.participationType || "solo";

  const startDate = contest?.startDate
    ? new Date(contest.startDate)
    : null;

  const deadline = contest?.deadline
    ? new Date(contest.deadline)
    : null;

  const duration =
    startDate && deadline
      ? Math.round((deadline - startDate) / (1000 * 60 * 60))
      : "N/A";

  // ✅ CHECK PARTICIPATION
  useEffect(() => {
    const checkParticipation = async () => {
      try {
        const res = await API.get("/participations/my-participations");

        const found = res.data.participations.find(
          (p) => p.contest?._id === id
        );

        if (found) {
          setIsJoined(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkParticipation();
  }, [id]);

  const getLabel = (type) => {
    if (type === "solo") return "Individual";
    if (type === "team") return "Team";
    return "Individual & Team";
  };

  const renderIcon = (type) => {
    if (type === "solo") return <FaUser />;
    if (type === "team") return <FaUsers />;
    return (
      <div className="flex -space-x-1">
        <FaUser />
        <FaUsers />
      </div>
    );
  };

  if (!contest) return <div>Not found</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div>
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <img
              src={contest.image}
              className="w-full h-[380px] object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">

            <div className="bg-white p-4 rounded-xl border">
              <p className="text-xs text-gray-400">Participants</p>
              <p className="font-semibold">
                {contest.participants?.length || 0}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <p className="text-xs text-gray-400">Duration</p>
              <p className="font-semibold">
                {duration !== "N/A" ? `${duration} hrs` : "N/A"}
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div>

          <h1 className="text-3xl font-semibold text-gray-900">
            {contest.title}
          </h1>

          <div className="flex gap-2 mt-3 flex-wrap">

            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              {contest.status}
            </span>

            <span className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-1 rounded-full">
              {renderIcon(contestType)}
              {getLabel(contestType)}
            </span>

          </div>

          <p className="mt-5 text-gray-600 text-sm leading-relaxed">
            {contest.description}
          </p>

          {/* ✅ BUTTON FIXED */}
          {!isJoined ? (
            <button
              onClick={() => navigate(`/student/contest/${contest._id}`)}
              className="mt-6 bg-[#82C600] hover:bg-[#6ea800] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
            >
              Participate <FaArrowRight />
            </button>
          ) : (
            <button
              onClick={() => navigate(`/submit/${contest._id}`)}
              className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              Submit Project <FaArrowRight />
            </button>
          )}

          <div className="mt-10 border-t pt-6 space-y-4 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-400">Start Date</span>
              <span className="flex items-center gap-1">
                <FiCalendar />
                {startDate?.toLocaleDateString() || "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Deadline</span>
              <span className="flex items-center gap-1">
                <FiClock />
                {deadline?.toLocaleDateString() || "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Participation</span>
              <span>{getLabel(contestType)}</span>
            </div>

          </div>

        </div>

      </div>

      {/* RELATED */}
      <div className="max-w-6xl mx-auto px-4 pb-10">

        <div className="flex justify-between mb-6">
          <h2 className="font-medium text-gray-800">
            More contests
          </h2>

          <button
            onClick={() => navigate("/contests")}
            className="text-[#82C600] text-sm"
          >
            View all →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {contests
            .filter(
              (c) =>
                String(c._id).slice(0, 4) !==
                String(contest._id).slice(0, 4)
            )
            .slice(0, 3)
            .map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/contest/${item._id}`)}
                className="cursor-pointer bg-white rounded-xl border hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  className="h-40 w-full object-cover rounded-t-xl"
                />

                <div className="p-3">
                  <h3 className="font-semibold text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

        </div>

      </div>

    </div>
  );
};

export default ContestDetails;