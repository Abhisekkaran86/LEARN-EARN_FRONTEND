// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaArrowRight } from "react-icons/fa";

// const ContestDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { contests = [] } = useSelector((state) => state.contest);

//   const token = localStorage.getItem("token");
//   const isLoggedIn = !!token;

//   const contest = contests.find((c) => c._id === id);

//   const relatedContests = contests.filter(
//     (c) => c.category === contest?.category && c._id !== id
//   );

//   const handleParticipate = () => {
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }

//     navigate(`/student/contest/${contest._id}`);
//   };

//   if (!contest) {
//     return <div className="text-center py-20 text-lg">Contest not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] px-4 md:px-10 py-10">

//       {/* 🔥 HERO SECTION */}
//       <div className="relative rounded-3xl overflow-hidden shadow-xl mb-12 group">
//         <img
//           src={contest.image}
//           alt={contest.title}
//           className="w-full h-[320px] md:h-[420px] object-cover transition duration-700 group-hover:scale-105"
//         />

//         {/* overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

//         {/* content */}
//         <div className="absolute bottom-0 p-6 md:p-10 text-white">
//           <h1 className="text-2xl md:text-4xl font-bold">
//             {contest.title}
//           </h1>

//           <p className="mt-2 text-sm md:text-base text-gray-200 max-w-2xl">
//             {contest.description}
//           </p>

//           <button
//             onClick={handleParticipate}
//             className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-[#82C600] to-[#a3e635] px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
//           >
//             Participate <FaArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* 🔥 INFO CARDS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

//         <div className="bg-white/70 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow">
//           <p className="text-gray-400 text-xs">Category</p>
//           <p className="font-semibold text-gray-800">
//             {contest.category || "General"}
//           </p>
//         </div>

//         <div className="bg-white/70 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow">
//           <p className="text-gray-400 text-xs">Level</p>
//           <p className="font-semibold text-gray-800">
//             {contest.level || "All"}
//           </p>
//         </div>

//         <div className="bg-white/70 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow">
//           <p className="text-gray-400 text-xs">Start Date</p>
//           <p className="font-semibold text-gray-800">
//             {new Date(contest.startDate).toLocaleDateString()}
//           </p>
//         </div>

//         <div className="bg-white/70 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow">
//           <p className="text-gray-400 text-xs">Deadline</p>
//           <p className="font-semibold text-gray-800">
//             {new Date(contest.deadline).toLocaleDateString()}
//           </p>
//         </div>

//       </div>

//       {/* 🔥 RELATED CONTESTS */}
//       <div>
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">
//           Related Contests
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

//           {relatedContests.slice(0, 3).map((item) => (
//             <div
//               key={item._id}
//               onClick={() => navigate(`/contest/${item._id}`)}
//               className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
//             >
//               <div className="relative h-40 overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//               </div>

//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-800 group-hover:text-[#82C600] transition">
//                   {item.title}
//                 </h3>

//                 <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                   {item.description}
//                 </p>

//                 <div className="mt-3 text-xs text-[#82C600] font-medium">
//                   View Details →
//                 </div>
//               </div>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContestDetails;


import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight, FaTrophy, FaUsers } from "react-icons/fa";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { contests = [] } = useSelector((state) => state.contest);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const contest = contests.find((c) => c._id === id);

  // ✅ FILTER LOGIC (same working one)
  const cleanText = (text) =>
    text
      ?.toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(" ")
      .filter(Boolean) || [];

  const baseWords = cleanText(contest?.title).slice(0, 4);

  let relatedContests = contests.filter((c) => {
    if (c._id === id) return false;

    const words = cleanText(c.title);
    const matchCount = words.filter((word) =>
      baseWords.includes(word)
    ).length;

    return matchCount >= 1;
  });

  if (relatedContests.length === 0) {
    relatedContests = contests.filter(
      (c) => c.category === contest?.category && c._id !== id
    );
  }

  const handleParticipate = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/student/contest/${contest._id}`);
  };

  if (!contest) {
    return <div className="text-center py-20">Contest not found</div>;
  }

  const daysLeft = Math.ceil(
    (new Date(contest.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] px-4 md:px-10 py-10">

      {/* 🔥 HERO */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl mb-12">
        <img
          src={contest.image}
          alt={contest.title}
          className="w-full h-[320px] md:h-[420px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <div className="absolute bottom-0 p-6 md:p-10 text-white">
          <div className="flex gap-3 mb-3 flex-wrap">
            <span className="bg-green-500 px-3 py-1 rounded-full text-xs">
              {contest.status || "Active"}
            </span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <FaTrophy /> {contest.rewards?.[0] || "Reward"}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold">
            {contest.title}
          </h1>

          <p className="mt-2 text-gray-200 max-w-2xl">
            {contest.description}
          </p>

          <button
            onClick={handleParticipate}
            className="mt-5 bg-gradient-to-r from-[#82C600] to-[#a3e635] px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Participate <FaArrowRight />
          </button>
        </div>
      </div>

      {/* 🔥 DETAILS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">

        <div className="bg-white p-4 rounded-2xl shadow border">
          <p className="text-gray-400 text-xs">Category</p>
          <p className="font-semibold">{contest.category || "General"}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow border">
          <p className="text-gray-400 text-xs">Level</p>
          <p className="font-semibold">{contest.level || "All"}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow border">
          <p className="text-gray-400 text-xs">Start</p>
          <p className="font-semibold">
            {new Date(contest.startDate).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow border">
          <p className="text-gray-400 text-xs">Deadline</p>
          <p className="font-semibold">
            {new Date(contest.deadline).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow border col-span-2">
          <p className="text-gray-400 text-xs">Participants</p>
          <p className="font-semibold flex items-center gap-2">
            <FaUsers /> {contest.participants?.length || 0} Joined
          </p>

          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div
              className="bg-[#82C600] h-2 rounded-full"
              style={{
                width: `${Math.min(
                  (contest.participants?.length || 0) * 10,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow border col-span-2">
          <p className="text-gray-400 text-xs">Time Left</p>
          <p className="font-semibold text-red-500">
            {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
          </p>
        </div>

      </div>

      {/* 🔥 RELATED */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Related Contests
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {relatedContests.slice(0, 3).map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/contest/${item._id}`)}
              className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition cursor-pointer"
            >
              <div className="relative h-40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold group-hover:text-[#82C600]">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
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