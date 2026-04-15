




// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import API from "../../../services/axios";

// const MyActiveContestsPage = () => {
//   const navigate = useNavigate();

//   const [myParticipations, setMyParticipations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH PARTICIPATIONS =================
//   useEffect(() => {
//     const fetchMyParticipations = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await API.get(
//           "/participations/my-participations",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setMyParticipations(res.data.participations || []);
//       } catch (err) {
//         console.error(err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyParticipations();
//   }, []);

//   // ================= FILTER ACTIVE =================
//   const activeParticipations = myParticipations.filter((item) => {
//     const deadline = new Date(item?.contest?.deadline);
//     return deadline > new Date();
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           🎯 My Active Contests
//         </h1>
//         <p className="text-gray-500 mt-1">
//           All contests you are currently participating in
//         </p>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-7xl mx-auto">

//         {loading ? (
//           <p className="text-gray-400 text-center mt-20">Loading...</p>
//         ) : activeParticipations.length === 0 ? (
//           <div className="bg-white p-12 rounded-2xl text-center shadow">
//             <p className="text-gray-400 text-lg">
//               🚫 No active contests
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {activeParticipations.map((item) => {
//               const contest = item.contest;

//               return (
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
//                 >

//                   {/* IMAGE */}
//                   <div
//                     className="h-40 bg-cover bg-center group-hover:scale-105 transition"
//                     style={{
//                       backgroundImage: `url(${contest?.image || "/default.jpg"})`,
//                     }}
//                   />

//                   {/* BODY */}
//                   <div className="p-5">

//                     {/* TAG */}
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
//                         🟢 Active
//                       </span>

//                       <span className="text-xs text-gray-400">
//                         {new Date(contest?.deadline).toLocaleDateString()}
//                       </span>
//                     </div>

//                     {/* TITLE */}
//                     <h2 className="font-semibold text-gray-800 text-lg line-clamp-2">
//                       {contest?.title}
//                     </h2>

//                     {/* DESC */}
//                     <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                       {contest?.description}
//                     </p>

//                     {/* ACTION */}
//                     <div className="mt-4 flex justify-between items-center">

//                       <span className="text-xs text-gray-500">
//                         ⏳ Ongoing
//                       </span>

//                       <button
//                         onClick={() =>
//                           navigate(`/student/submit/${contest._id}`)
//                         }
//                         className="px-4 py-1 text-xs bg-[#82C600] text-white rounded-lg hover:bg-[#6fa800]"
//                       >
//                         Submit
//                       </button>

//                     </div>

//                   </div>

//                 </div>
//               );
//             })}

//           </div>
//         )}

//       </div>

//     </div>
//   );
// };

// export default MyActiveContestsPage;


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../../services/axios";
import ContestPreviewModal from "../ContestPreviewModal";

const MyActiveContestsPage = () => {
  const navigate = useNavigate();

  const [myParticipations, setMyParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContest, setSelectedContest] = useState(null);

  useEffect(() => {
    const fetchMyParticipations = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/participations/my-participations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMyParticipations(res.data.participations || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyParticipations();
  }, []);

  const activeParticipations = myParticipations.filter((item) => {
    const deadline = new Date(item?.contest?.deadline);
    return deadline > new Date();
  });

  const getDaysLeft = (deadline) => {
    const diff = new Date(deadline) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-[#0f172a] dark:via-[#020617] dark:to-[#022c22] p-6 transition-colors duration-300">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          My Active Contests
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Track and manage your ongoing competitions
        </p>
      </div>

      <div className="max-w-7xl mx-auto">

        {loading ? (
          <p className="text-gray-400 text-center mt-20 animate-pulse">
            Loading contests...
          </p>
        ) : activeParticipations.length === 0 ? (
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur p-12 rounded-3xl text-center shadow">
            <p className="text-gray-400 dark:text-gray-500 text-lg">
              No active contests
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {activeParticipations.map((item) => {
              const contest = item.contest;
              const daysLeft = getDaysLeft(contest?.deadline);

              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedContest(item)}
                  className="
                    group rounded-3xl 
                    border border-slate-200/60 dark:border-white/10 
                    bg-gradient-to-br from-white/80 to-slate-50/60 
                    dark:from-white/5 dark:to-white/[0.02]
                    backdrop-blur-xl
                    shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                    hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    transition duration-300 overflow-hidden
                  "
                >

                  {/* IMAGE */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={contest?.image || "/default.jpg"}
                      alt=""
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Days Left */}
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                      ⏳ {daysLeft} days left
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="p-5">

                    {/* TITLE */}
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {contest?.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                      {contest?.description}
                    </p>

                    {/* INFO SECTION (FIXED - NO WHITE BLOCK) */}
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs">

                      {/* START */}
                      <div className="
                        bg-white/40 dark:bg-white/[0.04]
                        border border-white/40 dark:border-white/10
                        backdrop-blur-md
                        hover:bg-white/60 dark:hover:bg-white/[0.08]
                        transition
                        p-3 rounded-xl
                      ">
                        <p className="text-gray-400">Start</p>
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {new Date(contest?.startDate).toLocaleDateString()}
                        </p>
                      </div>

                      {/* DEADLINE */}
                      <div className="
                        bg-white/40 dark:bg-white/[0.04]
                        border border-white/40 dark:border-white/10
                        backdrop-blur-md
                        hover:bg-white/60 dark:hover:bg-white/[0.08]
                        transition
                        p-3 rounded-xl
                      ">
                        <p className="text-gray-400">Deadline</p>
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {new Date(contest?.deadline).toLocaleDateString()}
                        </p>
                      </div>

                    </div>

                    {/* FOOTER */}
                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        ● Active
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/student/submit/${contest._id}`);
                        }}
                        className="theme-brand-button rounded-lg px-4 py-1.5 text-xs font-semibold"
                      >
                        Submit →
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      <ContestPreviewModal
        selectedContest={selectedContest}
        onClose={() => setSelectedContest(null)}
      />
    </div>
  );
};

export default MyActiveContestsPage;
