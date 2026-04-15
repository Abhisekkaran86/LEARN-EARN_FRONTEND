// import React from "react";
// import { FaUser } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const EvaluationList = ({ contest }) => {
//   const navigate = useNavigate();

//   if (!contest?.submissionDetails?.length) {
//     return (
//       <div className="text-center text-gray-400 py-10">
//         No submissions found
//       </div>
//     );
//   }

//   return (
//     <>
//       {contest.submissionDetails
//         ?.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
//         .map((submission, index) => (
//           <div
//             key={submission.submissionId}
//             className={`p-5 mb-4 border rounded-2xl bg-white hover:shadow-lg transition ${
//               index === 0 ? "border-yellow-400 bg-yellow-50" : ""
//             }`}
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-center mb-3">
//               <div className="flex items-center gap-3">
//                 <div className="w-11 h-11 bg-lime-100 flex items-center justify-center rounded-full">
//                   <FaUser className="text-lime-600" />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-gray-800">
//                     {submission.student?.name}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {submission.student?.email}
//                   </p>
//                 </div>
//               </div>

//               <span className="text-xs text-gray-400">
//                 {new Date(submission.submittedAt).toLocaleDateString()}
//               </span>
//             </div>

//             {/* LINKS */}
//             <div className="flex gap-3 mb-3">
//               <a
//                 href={submission.githubLink}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-gray-900 text-white"
//               >
//                 🔗 GitHub
//               </a>

//               <a
//                 href={submission.liveUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-lime-500 text-white"
//               >
//                 🚀 Live Demo
//               </a>

//               <button
//                 onClick={() =>
//                   navigate("/admin/evaluation", {
//                     state: { contest, submission },
//                   })
//                 }
//                 className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white"
//               >
//                 🏆 Evaluate
//               </button>
//             </div>

//             {/* STATUS + SCORE */}
//             <div className="flex justify-between items-center">
//               <span
//                 className={`px-3 py-1 text-xs rounded-full font-medium ${
//                   submission.status === "evaluated"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-yellow-100 text-yellow-700"
//                 }`}
//               >
//                 {submission.status === "evaluated"
//                   ? "✅ Evaluated"
//                   : "⏳ Pending"}
//               </span>

//               <span className="text-sm font-semibold text-gray-700">
//                 🎯 Score: {submission.totalScore || 0}
//               </span>
//             </div>

//             {/* RANK */}
//             {submission.status === "evaluated" && index < 3 && (
//               <div className="mt-2 text-xs font-semibold text-yellow-600">
//                 🏆 Rank #{index + 1}
//               </div>
//             )}

//             {/* FEEDBACK */}
//             {submission.remarks && (
//               <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
//                 💬 {submission.remarks}
//               </div>
//             )}
//           </div>
//         ))}
//     </>
//   );
// };

// export default EvaluationList;