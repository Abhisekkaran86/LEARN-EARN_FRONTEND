
// import React from "react";
// import { FaUser, FaUsers } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DashboardModal = ({
//   isOpen,
//   onClose,
//   data,
//   title,
//   loading,
//   selectedContest,
//   onContestClick,
//   setSelectedContest,
// }) => {
//   const navigate = useNavigate();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
//       <div className="bg-white w-[720px] max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl p-6 border border-gray-100">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6 pb-3 border-b">
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-lime-500 to-lime-700 bg-clip-text text-transparent">
//             {title}
//           </h2>

//           <button
//             onClick={onClose}
//             className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 transition"
//           >
//             ✕
//           </button>
//         </div>

//         {loading ? (
//           <div className="text-center py-16 text-gray-400 text-lg">
//             ⏳ Loading data...
//           </div>
//         ) : (
//           <>
//             {title === "TOTAL SUBMISSIONS" ? (
//               <>
//                 {!selectedContest &&
//                   data?.map((contest) => (
//                     <div
//                       key={contest._id}
//                       onClick={() => onContestClick(contest)}
//                       className="group p-5 mb-4 rounded-2xl border bg-gradient-to-br from-gray-50 to-white hover:shadow-xl hover:border-lime-400 cursor-pointer transition-all duration-300"
//                     >
//                       <div className="flex justify-between items-center">
//                         <h3 className="text-lg font-semibold text-gray-800 group-hover:text-lime-600 transition">
//                           {contest.title}
//                         </h3>

//                         <span
//                           className={`text-xs px-3 py-1 rounded-full font-medium ${
//                             contest.status === "active"
//                               ? "bg-lime-100 text-lime-700"
//                               : "bg-gray-200 text-gray-600"
//                           }`}
//                         >
//                           {contest.status}
//                         </span>
//                       </div>

//                       <p className="text-sm text-gray-500 mt-1 line-clamp-2">
//                         {contest.description}
//                       </p>

//                       <div className="mt-4 flex justify-between items-center">
//                         <span className="text-sm text-gray-600 font-medium">
//                           👥 {contest.totalSubmittedStudents} submissions
//                         </span>

//                         <span className="text-xs text-lime-600 font-semibold group-hover:translate-x-1 transition">
//                           View →
//                         </span>
//                       </div>
//                     </div>
//                   ))}

//                 {/* ✅ UPDATED EVALUATION VIEW */}
//                 {selectedContest && (
//                   <div>
//                     <button
//                       onClick={() => setSelectedContest(null)}
//                       className="mb-5 text-sm px-4 py-2 rounded-lg bg-lime-100 text-lime-700 hover:bg-lime-200 transition"
//                     >
//                       ← Back
//                     </button>

//                     <h2 className="text-xl font-bold mb-5 text-gray-800">
//                       {selectedContest.title} Submissions
//                     </h2>

//                     {selectedContest.submissionDetails
//                       ?.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
//                       .map((submission, index) => (
//                         <div
//                           key={submission.submissionId}
//                           className={`p-5 mb-4 border rounded-2xl bg-white hover:shadow-lg transition-all ${
//                             index === 0 ? "border-yellow-400 bg-yellow-50" : ""
//                           }`}
//                         >
//                           {/* HEADER */}
//                           <div className="flex justify-between items-center mb-3">
//                             <div className="flex items-center gap-3">
//                               <div className="w-11 h-11 rounded-full bg-lime-100 flex items-center justify-center shadow-sm">
//                                 <FaUser className="text-lime-600 text-lg" />
//                               </div>

//                               <div>
//                                 <p className="font-semibold text-gray-800">
//                                   {submission.student?.name}
//                                 </p>
//                                 <p className="text-sm text-gray-500">
//                                   {submission.student?.email}
//                                 </p>
//                               </div>
//                             </div>

//                             <span className="text-xs text-gray-400">
//                               {new Date(
//                                 submission.submittedAt
//                               ).toLocaleDateString()}
//                             </span>
//                           </div>

//                           {/* LINKS */}
//                           <div className="flex gap-3 mb-3">
//                             <a
//                               href={submission.githubLink}
//                               target="_blank"
//                               className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-gray-900 text-white"
//                             >
//                               🔗 GitHub
//                             </a>

//                             <a
//                               href={submission.liveUrl}
//                               target="_blank"
//                               className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-lime-500 text-white"
//                             >
//                               🚀 Live Demo
//                             </a>

//                             <button
//                               onClick={() =>
//                                 navigate("/admin/evaluation", {
//                                   state: {
//                                     contest: selectedContest,
//                                     submission,
//                                   },
//                                 })
//                               }
//                               className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white"
//                             >
//                               🏆 Evaluate
//                             </button>
//                           </div>

//                           {/* STATUS + SCORE */}
//                           <div className="flex justify-between items-center">
//                             <span
//                               className={`px-3 py-1 text-xs rounded-full font-medium ${
//                                 submission.status === "evaluated"
//                                   ? "bg-green-100 text-green-700"
//                                   : "bg-yellow-100 text-yellow-700"
//                               }`}
//                             >
//                               {submission.status === "evaluated"
//                                 ? "✅ Evaluated"
//                                 : "⏳ Pending"}
//                             </span>

//                             <span className="text-sm font-semibold text-gray-700">
//                               🎯 Score: {submission.totalScore || 0}
//                             </span>
//                           </div>

//                           {/* RANK */}
//                           {submission.status === "evaluated" && index < 3 && (
//                             <div className="mt-2 text-xs font-semibold text-yellow-600">
//                               🏆 Rank #{index + 1}
//                             </div>
//                           )}

//                           {/* FEEDBACK */}
//                           {submission.remarks && (
//                             <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
//                               💬 {submission.remarks}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                   </div>
//                 )}
//               </>
//             ) : (
//               data?.map((item, index) => (
//                 <div
//                   key={index}
//                   className="mb-4 p-4 border rounded-2xl bg-white hover:shadow-lg transition"
//                 >
//                   <div className="flex gap-4">

//                     {item.image && (
//                       <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
//                         <img
//                           src={item.image}
//                           alt="contest"
//                           className="max-w-full max-h-full object-contain"
//                         />
//                       </div>
//                     )}

//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         {item.title || item.name}
//                       </h3>

//                       <p className="text-sm text-gray-500 mt-1">
//                         {item.description || item.email}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardModal;



import React from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DashboardModal = ({
  isOpen,
  onClose,
  data,
  title,
  loading,
  selectedContest,
  onContestClick,
  setSelectedContest,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-white w-[720px] max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl p-6 border border-gray-100">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-lime-500 to-lime-700 bg-clip-text text-transparent">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400 text-lg">
            ⏳ Loading data...
          </div>
        ) : (
          <>
            {/* ✅ EXISTING FLOW (UNCHANGED) */}
            {title === "TOTAL SUBMISSIONS" ? (
              <>
                {!selectedContest &&
                  data?.map((contest) => (
                    <div
                      key={contest._id}
                      onClick={() => onContestClick(contest)}
                      className="group p-5 mb-4 rounded-2xl border bg-gradient-to-br from-gray-50 to-white hover:shadow-xl hover:border-lime-400 cursor-pointer transition-all duration-300"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-lime-600 transition">
                          {contest.title}
                        </h3>

                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            contest.status === "active"
                              ? "bg-lime-100 text-lime-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {contest.status}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {contest.description}
                      </p>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">
                          👥 {contest.totalSubmittedStudents} submissions
                        </span>

                        <span className="text-xs text-lime-600 font-semibold group-hover:translate-x-1 transition">
                          View →
                        </span>
                      </div>
                    </div>
                  ))}

                {/* ✅ CONTEST VIEW */}
                {selectedContest && (
                  <div>
                    <button
                      onClick={() => setSelectedContest(null)}
                      className="mb-5 text-sm px-4 py-2 rounded-lg bg-lime-100 text-lime-700 hover:bg-lime-200 transition"
                    >
                      ← Back
                    </button>

                    <h2 className="text-xl font-bold mb-5 text-gray-800">
                      {selectedContest.title} Submissions
                    </h2>

                    {selectedContest.submissionDetails
                      ?.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
                      .map((submission, index) => (
                        <div
                          key={submission.submissionId}
                          className={`p-5 mb-4 border rounded-2xl bg-white hover:shadow-lg transition-all ${
                            index === 0 ? "border-yellow-400 bg-yellow-50" : ""
                          }`}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-full bg-lime-100 flex items-center justify-center shadow-sm">
                                <FaUser className="text-lime-600 text-lg" />
                              </div>

                              <div>
                                <p className="font-semibold text-gray-800">
                                  {submission.student?.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {submission.student?.email}
                                </p>
                              </div>
                            </div>

                            <span className="text-xs text-gray-400">
                              {new Date(
                                submission.submittedAt
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex gap-3 mb-3">
                            <a
                              href={submission.githubLink}
                              target="_blank"
                              className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-gray-900 text-white"
                            >
                              🔗 GitHub
                            </a>

                            <a
                              href={submission.liveUrl}
                              target="_blank"
                              className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-lime-500 text-white"
                            >
                              🚀 Live Demo
                            </a>

                            <button
                              onClick={() =>
                                navigate("/admin/evaluation", {
                                  state: {
                                    contest: selectedContest,
                                    submission,
                                  },
                                })
                              }
                              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white"
                            >
                              🏆 Evaluate
                            </button>
                          </div>

                          <div className="flex justify-between items-center">
                            <span
                              className={`px-3 py-1 text-xs rounded-full font-medium ${
                                submission.status === "evaluated"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {submission.status === "evaluated"
                                ? "✅ Evaluated"
                                : "⏳ Pending"}
                            </span>

                            <span className="text-sm font-semibold text-gray-700">
                              🎯 Score: {submission.totalScore || 0}
                            </span>
                          </div>

                          {submission.status === "evaluated" && index < 3 && (
                            <div className="mt-2 text-xs font-semibold text-yellow-600">
                              🏆 Rank #{index + 1}
                            </div>
                          )}

                          {submission.remarks && (
                            <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                              💬 {submission.remarks}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </>
            ) : null}

            {/* 🔥 NEW: DIRECT EVALUATION VIEW (NO UI CHANGE STYLE) */}
            {title === "EVALUATION" &&
              data?.map((submission, index) => (
                <div
                  key={submission.submissionId}
                  className="mb-4 p-4 border rounded-2xl bg-white hover:shadow-lg transition"
                >
                  <div className="flex flex-col gap-2">

                    <h3 className="text-lg font-semibold text-lime-600">
                      {submission.contest?.title}
                    </h3>

                    <p className="font-medium">
                      {submission.student?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {submission.student?.email}
                    </p>

                    <div className="flex justify-between mt-2">
                      <span>
                        {submission.status === "evaluated"
                          ? "✅ Evaluated"
                          : "⏳ Pending"}
                      </span>

                      <span>🎯 {submission.totalScore || 0}</span>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/admin/evaluation", {
                          state: {
                            contest: submission.contest,
                            submission,
                          },
                        })
                      }
                      className="mt-2 px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white"
                    >
                      🏆 Evaluate
                    </button>

                  </div>
                </div>
              ))}

          </>
        )}
      </div>
    </div>
  );
};

export default DashboardModal;


// import React from "react";
// import { useNavigate } from "react-router-dom";

// const DashboardModal = ({
//   isOpen,
//   onClose,
//   data,
//   title,
//   loading,
//   selectedContest,
//   onContestClick,
//   setSelectedContest,
// }) => {
//   const navigate = useNavigate();

//   if (!isOpen) return null;

//   const isUsers = data && data.usersList;
//   const isContests = data && data.contestList;
//   const isSubmissions = Array.isArray(data);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
//       <div className="bg-white w-[720px] max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl p-6">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6 border-b pb-3">
//           <h2 className="text-2xl font-bold text-lime-600">{title}</h2>
//           <button onClick={onClose}>✕</button>
//         </div>

//         {loading ? (
//           <div className="text-center py-10 text-gray-400">
//             ⏳ Loading...
//           </div>
//         ) : (
//           <>

//             {/* ================= USERS ================= */}
//             {isUsers && (
//               <>
//                 <div className="text-center mb-5">
//                   <h2>Total Users</h2>
//                   <h1 className="text-3xl font-bold text-blue-600">
//                     {data.totalUsers}
//                   </h1>
//                 </div>

//                 {data.usersList.map((user) => (
//                   <div
//                     key={user._id}
//                     className="p-4 mb-3 border rounded-xl"
//                   >
//                     <p className="font-semibold">{user.name}</p>
//                     <p className="text-sm text-gray-500">{user.email}</p>
//                   </div>
//                 ))}
//               </>
//             )}

//             {/* ================= ACTIVE CONTESTS ================= */}
//             {isContests && (
//               <>
//                 <div className="text-center mb-5">
//                   <h2>Active Contests</h2>
//                   <h1 className="text-3xl font-bold text-lime-600">
//                     {data.totalActiveContests}
//                   </h1>
//                 </div>

//                 {data.contestList.map((contest) => (
//                   <div
//                     key={contest._id}
//                     className="p-4 mb-3 border rounded-xl"
//                   >
//                     <h3 className="font-semibold">{contest.title}</h3>
//                     <p className="text-sm text-gray-500">
//                       {contest.description}
//                     </p>
//                   </div>
//                 ))}
//               </>
//             )}

//             {/* ================= TOTAL SUBMISSIONS ================= */}
//             {title === "TOTAL SUBMISSIONS" && isSubmissions && (
//               <>
//                 {!selectedContest &&
//                   data.map((contest) => (
//                     <div
//                       key={contest._id}
//                       onClick={() => onContestClick(contest)}
//                       className="p-4 mb-3 border rounded-xl cursor-pointer"
//                     >
//                       <h3>{contest.title}</h3>
//                       <p>{contest.description}</p>
//                     </div>
//                   ))}

//                 {selectedContest && (
//                   <>
//                     <button
//                       onClick={() => setSelectedContest(null)}
//                       className="mb-3"
//                     >
//                       ← Back
//                     </button>

//                     {selectedContest.submissionDetails?.map((sub) => (
//                       <div
//                         key={sub.submissionId}
//                         className="p-4 mb-3 border rounded-xl"
//                       >
//                         <p>{sub.student?.name}</p>
//                         <p>{sub.student?.email}</p>

//                         <button
//                           onClick={() =>
//                             navigate("/admin/evaluation", {
//                               state: {
//                                 contest: selectedContest,
//                                 submission: sub,
//                               },
//                             })
//                           }
//                           className="mt-2 bg-lime-500 text-white px-3 py-1 rounded"
//                         >
//                           Evaluate
//                         </button>
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </>
//             )}

//             {/* ================= EVALUATION ================= */}
//             {title === "EVALUATION" && isSubmissions &&
//               data.map((sub) => (
//                 <div
//                   key={sub.submissionId}
//                   className="p-4 mb-3 border rounded-xl"
//                 >
//                   <h3>{sub.contest?.title}</h3>
//                   <p>{sub.student?.name}</p>
//                   <p>{sub.student?.email}</p>

//                   <button
//                     onClick={() =>
//                       navigate("/admin/evaluation", {
//                         state: {
//                           contest: sub.contest,
//                           submission: sub,
//                         },
//                       })
//                     }
//                     className="mt-2 bg-lime-500 text-white px-3 py-1 rounded"
//                   >
//                     Evaluate
//                   </button>
//                 </div>
//               ))}

//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardModal;