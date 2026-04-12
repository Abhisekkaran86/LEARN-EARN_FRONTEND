


// import React, { useEffect, useState } from "react";
// import API from "../../../services/axios";
// import {
//   FiArrowLeft,
//   FiUsers,
//   FiTrendingUp,
//   FiAward,
// } from "react-icons/fi";

// const EvaluationDashboard = () => {
//   const [contests, setContests] = useState([]);
//   const [selectedContest, setSelectedContest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState(null); // ✅ NEW

//   // ================= FETCH =================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await API.get(
//           "/submission/submitted-contests-count",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data =
//           res?.data?.data ||
//           res?.data?.contests ||
//           res?.data ||
//           [];

//         setContests(data);

//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // ================= DECLARE WINNER =================
//   const handleDeclareWinner = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await API.put(
//         `/submission/contest/${selectedContest._id}/declare-winner`,
//         { contestId: selectedContest._id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ✅ TOAST (NO ALERT)
//       setToast("🏆 Winner Declared Successfully!");
//       setTimeout(() => setToast(null), 3000);

//     } catch (err) {
//       console.error(err);
//       setToast("❌ Failed to declare winner");
//       setTimeout(() => setToast(null), 3000);
//     }
//   };

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
//         ⏳ Loading Dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

//       {/* ================= HEADER ================= */}
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
//         <FiTrendingUp className="text-lime-600" />
//         Evaluation Dashboard
//       </h1>

//       {/* ================= CONTEST LIST ================= */}
//       {!selectedContest && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

//           {contests.map((contest) => (
//             <div
//               key={contest._id}
//               onClick={() => setSelectedContest(contest)}
//               className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg active:scale-[0.98] cursor-pointer transition border border-transparent hover:border-lime-400"
//             >
//               <h3 className="text-lg font-bold text-lime-600 mb-2">
//                 {contest.title}
//               </h3>

//               <p className="text-sm text-gray-500 line-clamp-2">
//                 {contest.description}
//               </p>

//               <div className="mt-4 flex justify-between items-center text-sm">
//                 <span className="flex items-center gap-1 bg-lime-100 text-lime-700 px-2 py-1 rounded-lg">
//                   <FiUsers /> {contest.totalSubmittedStudents}
//                 </span>

//                 <span className="text-gray-400">View →</span>
//               </div>
//             </div>
//           ))}

//         </div>
//       )}

//       {/* ================= CONTEST DETAIL ================= */}
//       {selectedContest && (
//         <div>

//           {/* BACK BUTTON */}
//           <button
//             onClick={() => setSelectedContest(null)}
//             className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center gap-2 active:scale-95 transition"
//           >
//             <FiArrowLeft />
//             Back
//           </button>

//           {/* TITLE */}
//           <h2 className="text-xl sm:text-2xl font-bold text-lime-600 mb-6">
//             {selectedContest.title}
//           </h2>

//           {/* STUDENT LIST */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

//             {[...(selectedContest.submissionDetails || [])]
//               .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
//               .map((sub, index) => (
//                 <div
//                   key={sub.submissionId}
//                   className={`p-4 sm:p-5 rounded-2xl shadow-sm transition ${index === 0
//                       ? "bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-400"
//                       : "bg-white"
//                     }`}
//                 >
//                   <p className="font-semibold text-base sm:text-lg">
//                     {sub.student?.name}
//                   </p>

//                   <p className="text-xs sm:text-sm text-gray-500">
//                     {sub.student?.email}
//                   </p>

//                   <div className="flex justify-between mt-3 items-center">
//                     <span
//                       className={`text-xs sm:text-sm px-2 py-1 rounded ${sub.status === "evaluated"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-gray-100 text-gray-500"
//                         }`}
//                     >
//                       {sub.status}
//                     </span>

//                     <span className="font-bold text-gray-800 text-sm sm:text-base">
//                       🎯 {sub.totalScore || 0}
//                     </span>
//                   </div>

//                   {/* 🏆 TOP */}
//                   {index === 0 && (
//                     <div className="mt-3 flex items-center gap-1 text-yellow-600 font-bold text-xs sm:text-sm">
//                       <FiAward />
//                       Top Rank
//                     </div>
//                   )}
//                 </div>
//               ))}

//           </div>

//           {/* DECLARE WINNER */}
//           <div className="mt-10 max-w-md mx-auto">
//             <button
//               onClick={handleDeclareWinner}
//               className="
//       relative w-full py-3 rounded-xl font-semibold 
//       text-white flex items-center justify-center gap-2
//       bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600
//       shadow-lg shadow-green-500/30
//       hover:shadow-green-500/50
//       border border-green-300/30
//       backdrop-blur-md
//       transition-all duration-300
//       active:scale-95 hover:scale-[1.02]
//       overflow-hidden
//     "
//             >
//               {/* ✨ Shine Effect */}
//               <span className="absolute inset-0 overflow-hidden rounded-xl">
//                 <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/20 blur-md rotate-12 translate-x-[-100%] hover:translate-x-[200%] transition-all duration-700"></span>
//               </span>

//               {/* Icon */}
//               <FiAward className="text-lg drop-shadow" />

//               {/* Text */}
//               <span className="tracking-wide">Declare Winner</span>
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ================= TOAST ================= */}
//       {toast && (
//         <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
//           <div className="px-5 py-3 rounded-xl shadow-lg text-white font-medium bg-gradient-to-r from-lime-500 to-green-600 animate-slideUp">
//             {toast}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EvaluationDashboard;




// import React, { useEffect, useState } from "react";
// import API from "../../../services/axios";
// import {
//   FiArrowLeft,
//   FiUsers,
//   FiTrendingUp,
//   FiAward,
//   FiEdit2,
//   FiTrash2,
//   FiSave,
//   FiX,
// } from "react-icons/fi";

// const EvaluationDashboard = () => {
//   const [contests, setContests] = useState([]);
//   const [selectedContest, setSelectedContest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState(null);

//   // ✅ NEW STATES (EDIT)
//   const [editId, setEditId] = useState(null);
//   const [editScore, setEditScore] = useState("");
//   const [editFeedback, setEditFeedback] = useState("");

//   // ================= FETCH =================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await API.get(
//           "/submission/submitted-contests-count",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const data =
//           res?.data?.data ||
//           res?.data?.contests ||
//           res?.data ||
//           [];

//         setContests(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // ================= DECLARE WINNER =================
//   const handleDeclareWinner = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await API.put(
//         `/submission/contest/${selectedContest._id}/declare-winner`,
//         { contestId: selectedContest._id },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setToast("🏆 Winner Declared Successfully!");
//       setTimeout(() => setToast(null), 3000);
//     } catch (err) {
//       console.error(err);
//       setToast("❌ Failed to declare winner");
//       setTimeout(() => setToast(null), 3000);
//     }
//   };

//   // ================= EDIT =================
//   const handleEdit = (sub) => {
//     setEditId(sub.submissionId);
//     setEditScore(sub.totalScore || "");
//     setEditFeedback(sub.feedback || "");
//   };

//   // ================= UPDATE =================
//   const handleUpdate = async (sub) => {
//     try {
//       const token = localStorage.getItem("token");

//       await API.put(
//         `/submission/evaluate/${sub.submissionId}`,
//         {
//           score: editScore,
//           feedback: editFeedback,
//           status: "evaluated",
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // update UI instantly
//       setSelectedContest((prev) => ({
//         ...prev,
//         submissionDetails: prev.submissionDetails.map((s) =>
//           s.submissionId === sub.submissionId
//             ? { ...s, totalScore: editScore, feedback: editFeedback }
//             : s
//         ),
//       }));

//       setEditId(null);
//       setToast("✅ Updated Successfully!");
//       setTimeout(() => setToast(null), 3000);
//     } catch (err) {
//       console.error(err);
//       setToast("❌ Update Failed");
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (sub) => {
//     if (!window.confirm("Are you sure to delete this evaluation?")) return;

//     try {
//       const token = localStorage.getItem("token");

//       await API.delete(`/submission/${sub.submissionId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setSelectedContest((prev) => ({
//         ...prev,
//         submissionDetails: prev.submissionDetails.filter(
//           (s) => s.submissionId !== sub.submissionId
//         ),
//       }));

//       setToast("🗑 Deleted Successfully!");
//       setTimeout(() => setToast(null), 3000);
//     } catch (err) {
//       console.error(err);
//       setToast("❌ Delete Failed");
//     }
//   };

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
//         ⏳ Loading Dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//       {/* HEADER */}
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
//         <FiTrendingUp className="text-lime-600" />
//         Evaluation Dashboard
//       </h1>

//       {/* CONTEST LIST */}
//       {!selectedContest && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           {contests.map((contest) => (
//             <div
//               key={contest._id}
//               onClick={() => setSelectedContest(contest)}
//               className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg cursor-pointer transition hover:border-lime-400 border"
//             >
//               <h3 className="text-lg font-bold text-lime-600">
//                 {contest.title}
//               </h3>

//               <div className="mt-3 flex justify-between text-sm">
//                 <span className="bg-lime-100 text-lime-700 px-2 py-1 rounded flex items-center gap-1">
//                   <FiUsers /> {contest.totalSubmittedStudents}
//                 </span>
//                 <span className="text-gray-400">View →</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* DETAIL */}
//       {selectedContest && (
//         <div>
//           <button
//             onClick={() => setSelectedContest(null)}
//             className="mb-6 px-4 py-2 bg-gray-200 rounded-xl flex items-center gap-2"
//           >
//             <FiArrowLeft /> Back
//           </button>

//           <h2 className="text-xl font-bold text-lime-600 mb-6">
//             {selectedContest.title}
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {[...(selectedContest.submissionDetails || [])]
//               .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
//               .map((sub, index) => (
//                 <div
//                   key={sub.submissionId}
//                   className={`p-4 rounded-2xl shadow ${
//                     index === 0
//                       ? "bg-yellow-50 border border-yellow-400"
//                       : "bg-white"
//                   }`}
//                 >
//                   <p className="font-semibold">{sub.student?.name}</p>
//                   <p className="text-sm text-gray-500">
//                     {sub.student?.email}
//                   </p>

//                   <div className="flex justify-between mt-2">
//                     <span className="text-sm">
//                       🎯 {sub.totalScore || 0}
//                     </span>
//                     <span className="text-xs text-gray-400">
//                       {sub.status}
//                     </span>
//                   </div>

//                   {/* EDIT MODE */}
//                   {editId === sub.submissionId ? (
//                     <div className="mt-3 space-y-2">
//                       <input
//                         type="number"
//                         value={editScore}
//                         onChange={(e) => setEditScore(e.target.value)}
//                         className="w-full border px-2 py-1 rounded"
//                       />
//                       <input
//                         value={editFeedback}
//                         onChange={(e) => setEditFeedback(e.target.value)}
//                         className="w-full border px-2 py-1 rounded"
//                       />

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleUpdate(sub)}
//                           className="flex-1 bg-green-500 text-white py-1 rounded flex items-center justify-center gap-1"
//                         >
//                           <FiSave /> Save
//                         </button>
//                         <button
//                           onClick={() => setEditId(null)}
//                           className="flex-1 bg-gray-300 py-1 rounded flex items-center justify-center gap-1"
//                         >
//                           <FiX /> Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="mt-3 flex gap-2">
//                       <button
//                         onClick={() => handleEdit(sub)}
//                         className="flex-1 bg-blue-100 text-blue-600 py-1 rounded flex items-center justify-center gap-1"
//                       >
//                         <FiEdit2 /> Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(sub)}
//                         className="flex-1 bg-red-100 text-red-600 py-1 rounded flex items-center justify-center gap-1"
//                       >
//                         <FiTrash2 /> Delete
//                       </button>
//                     </div>
//                   )}

//                   {index === 0 && (
//                     <div className="mt-2 text-yellow-600 text-sm flex items-center gap-1">
//                       <FiAward /> Top Rank
//                     </div>
//                   )}
//                 </div>
//               ))}
//           </div>

//           {/* DECLARE WINNER BUTTON (YOUR GREEN UI KEPT) */}
//           <div className="mt-10 max-w-md mx-auto">
//             <button
//               onClick={handleDeclareWinner}
//               className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 shadow-lg"
//             >
//               <FiAward /> Declare Winner
//             </button>
//           </div>
//         </div>
//       )}

//       {/* TOAST */}
//       {toast && (
//         <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg">
//           {toast}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EvaluationDashboard;

// edit delete

// import React, { useEffect, useState } from "react";
// import API from "../../../services/axios";
// import {
//   FiArrowLeft,
//   FiUsers,
//   FiTrendingUp,
//   FiAward,
//   FiEdit2,
//   FiTrash2,
//   FiSave,
//   FiX,
// } from "react-icons/fi";

// const EvaluationDashboard = () => {
//   const [contests, setContests] = useState([]);
//   const [selectedContest, setSelectedContest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState(null);

//   const [editId, setEditId] = useState(null);
//   const [editScore, setEditScore] = useState("");
//   const [editFeedback, setEditFeedback] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await API.get(
//           "/submission/submitted-contests-count",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const data =
//           res?.data?.data ||
//           res?.data?.contests ||
//           res?.data ||
//           [];

//         setContests(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDeclareWinner = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await API.put(
//         `/submission/contest/${selectedContest._id}/declare-winner`,
//         { contestId: selectedContest._id },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setToast("🏆 Winner Declared Successfully!");
//       setTimeout(() => setToast(null), 3000);
//     } catch (err) {
//       console.error(err);
//       setToast("❌ Failed to declare winner");
//       setTimeout(() => setToast(null), 3000);
//     }
//   };

//   const handleEdit = (sub) => {
//     setEditId(sub.submissionId);
//     setEditScore(sub.totalScore || "");
//     setEditFeedback(sub.remarks || ""); // ✅ use remarks
//   };

//   const handleUpdate = async (sub) => {
//     try {
//       const token = localStorage.getItem("token");

//       await API.put(
//         `/submission/evaluate/${sub.submissionId}`,
//         {
//           totalScore: Number(editScore),
//           remarks: editFeedback, // ✅ FIXED
//           status: "evaluated",
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // ✅ update UI
//       setSelectedContest((prev) => ({
//         ...prev,
//         submissionDetails: prev.submissionDetails.map((s) =>
//           s.submissionId === sub.submissionId
//             ? {
//                 ...s,
//                 totalScore: Number(editScore),
//                 remarks: editFeedback, // ✅ FIXED
//                 status: "evaluated",
//               }
//             : s
//         ),
//       }));

//       setEditId(null);
//       setToast("✅ Remarks Updated Successfully!");
//       setTimeout(() => setToast(null), 3000);

//     } catch (err) {
//       console.error(err);
//       setToast("❌ Update Failed");
//     }
//   };

//   const handleDelete = async (sub) => {
//     if (!window.confirm("Are you sure to delete this evaluation?")) return;

//     try {
//       const token = localStorage.getItem("token");

//       await API.delete(`/submission/${sub.submissionId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setSelectedContest((prev) => ({
//         ...prev,
//         submissionDetails: prev.submissionDetails.filter(
//           (s) => s.submissionId !== sub.submissionId
//         ),
//       }));

//       setToast("🗑 Deleted Successfully!");
//       setTimeout(() => setToast(null), 3000);
//     } catch (err) {
//       console.error(err);
//       setToast("❌ Delete Failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
//         ⏳ Loading Dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
//         <FiTrendingUp className="text-lime-600" />
//         Evaluation Dashboard
//       </h1>

//       {!selectedContest && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           {contests.map((contest) => (
//             <div
//               key={contest._id}
//               onClick={() => setSelectedContest(contest)}
//               className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg cursor-pointer transition hover:border-lime-400 border"
//             >
//               <h3 className="text-lg font-bold text-lime-600">
//                 {contest.title}
//               </h3>

//               <div className="mt-3 flex justify-between text-sm">
//                 <span className="bg-lime-100 text-lime-700 px-2 py-1 rounded flex items-center gap-1">
//                   <FiUsers /> {contest.totalSubmittedStudents}
//                 </span>
//                 <span className="text-gray-400">View →</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedContest && (
//         <div>
//           <button
//             onClick={() => setSelectedContest(null)}
//             className="mb-6 px-4 py-2 bg-gray-200 rounded-xl flex items-center gap-2"
//           >
//             <FiArrowLeft /> Back
//           </button>

//           <h2 className="text-xl font-bold text-lime-600 mb-6">
//             {selectedContest.title}
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {[...(selectedContest.submissionDetails || [])]
//               .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
//               .map((sub, index) => (
//                 <div
//                   key={sub.submissionId}
//                   className={`p-4 rounded-2xl shadow ${
//                     index === 0
//                       ? "bg-yellow-50 border border-yellow-400"
//                       : "bg-white"
//                   }`}
//                 >
//                   <p className="font-semibold">{sub.student?.name}</p>
//                   <p className="text-sm text-gray-500">
//                     {sub.student?.email}
//                   </p>

//                   <div className="flex justify-between mt-2">
//                     <span className="text-sm">
//                       🎯 {sub.totalScore || 0}
//                     </span>
//                     <span className="text-xs text-gray-400">
//                       {sub.status}
//                     </span>
//                   </div>

//                   {/* ✅ SHOW REMARKS */}
//                   <p className="text-xs text-blue-600 mt-1">
//                     📝 {sub.remarks || "No remarks"}
//                   </p>

//                   {editId === sub.submissionId ? (
//                     <div className="mt-3 space-y-2">
//                       <input
//                         type="number"
//                         value={editScore}
//                         onChange={(e) => setEditScore(e.target.value)}
//                         className="w-full border px-2 py-1 rounded"
//                       />
//                       <input
//                         value={editFeedback}
//                         onChange={(e) => setEditFeedback(e.target.value)}
//                         className="w-full border px-2 py-1 rounded"
//                       />

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleUpdate(sub)}
//                           className="flex-1 bg-green-500 text-white py-1 rounded flex items-center justify-center gap-1"
//                         >
//                           <FiSave /> Save
//                         </button>
//                         <button
//                           onClick={() => setEditId(null)}
//                           className="flex-1 bg-gray-300 py-1 rounded flex items-center justify-center gap-1"
//                         >
//                           <FiX /> Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="mt-3 flex gap-2">
//                       <button
//                         onClick={() => handleEdit(sub)}
//                         className={`flex-1 py-1 rounded flex items-center justify-center gap-1 ${
//                           sub.status === "evaluated"
//                             ? "bg-blue-100 text-blue-600"
//                             : "bg-lime-100 text-lime-600"
//                         }`}
//                       >
//                         <FiEdit2 />
//                         {sub.status === "evaluated" ? "Edit" : "Evaluate"}
//                       </button>

//                       <button
//                         onClick={() => handleDelete(sub)}
//                         className="flex-1 bg-red-100 text-red-600 py-1 rounded flex items-center justify-center gap-1"
//                       >
//                         <FiTrash2 /> Delete
//                       </button>
//                     </div>
//                   )}

//                   {index === 0 && (
//                     <div className="mt-2 text-yellow-600 text-sm flex items-center gap-1">
//                       <FiAward /> Top Rank
//                     </div>
//                   )}
//                 </div>
//               ))}
//           </div>

//           <div className="mt-10 max-w-md mx-auto">
//             <button
//               onClick={handleDeclareWinner}
//               className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 shadow-lg"
//             >
//               <FiAward /> Declare Winner
//             </button>
//           </div>
//         </div>
//       )}

//       {toast && (
//         <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg">
//           {toast}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EvaluationDashboard;



import React, { useEffect, useState } from "react";
import API from "../../../services/axios";
import {
  FiArrowLeft,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
} from "react-icons/fi";

const EvaluationDashboard = () => {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editScore, setEditScore] = useState("");
  const [editFeedback, setEditFeedback] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/submission/submitted-contests-count");

        const data =
          res?.data?.data ||
          res?.data?.contests ||
          res?.data ||
          [];

        setContests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ CHECK ALL EVALUATED
  const isAllEvaluated = () => {
    if (!selectedContest?.submissionDetails) return false;

    return selectedContest.submissionDetails.every(
      (sub) => sub.status === "evaluated"
    );
  };

  // ✅ DECLARE WINNER
  const handleDeclareWinner = async () => {
    if (!isAllEvaluated()) {
      setToast("⚠️ Evaluate all students before declaring winner");
      return;
    }

    try {
      await API.put(
        `/submission/contest/${selectedContest._id}/declare-winner`,
        { contestId: selectedContest._id }
      );

      setSelectedContest((prev) => ({
        ...prev,
        status: "completed",
      }));

      setToast("🏆 Winner Declared Successfully!");
      setTimeout(() => setToast(null), 3000);

    } catch (err) {
      console.error(err);
      setToast("❌ Failed to declare winner");
    }
  };

  const handleEdit = (sub) => {
    setEditId(sub.submissionId);
    setEditScore(sub.totalScore || "");
    setEditFeedback(sub.remarks || "");
  };

  const handleUpdate = async (sub) => {
    try {
      await API.put(`/submission/evaluate/${sub.submissionId}`, {
        totalScore: Number(editScore),
        remarks: editFeedback,
        status: "evaluated",
      });

      setSelectedContest((prev) => ({
        ...prev,
        submissionDetails: prev.submissionDetails.map((s) =>
          s.submissionId === sub.submissionId
            ? {
                ...s,
                totalScore: Number(editScore),
                remarks: editFeedback,
                status: "evaluated",
              }
            : s
        ),
      }));

      setEditId(null);
      setToast("✅ Updated Successfully!");
      setTimeout(() => setToast(null), 3000);

    } catch (err) {
      console.error(err);
      setToast("❌ Update Failed");
    }
  };

  const handleDelete = async (sub) => {
    if (!window.confirm("Are you sure to delete this evaluation?")) return;

    try {
      await API.delete(`/submission/${sub.submissionId}`);

      setSelectedContest((prev) => ({
        ...prev,
        submissionDetails: prev.submissionDetails.filter(
          (s) => s.submissionId !== sub.submissionId
        ),
      }));

      setToast("🗑 Deleted Successfully!");
      setTimeout(() => setToast(null), 3000);

    } catch (err) {
      console.error(err);
      setToast("❌ Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
        ⏳ Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FiTrendingUp className="text-lime-600" />
        Evaluation Dashboard
      </h1>

      {!selectedContest && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {contests.map((contest) => (
            <div
              key={contest._id}
              onClick={() => setSelectedContest(contest)}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg cursor-pointer transition border"
            >
              <h3 className="text-lg font-bold text-lime-600">
                {contest.title}
              </h3>

              <div className="mt-3 flex justify-between text-sm">
                <span className="bg-lime-100 text-lime-700 px-2 py-1 rounded flex items-center gap-1">
                  <FiUsers /> {contest.totalSubmittedStudents}
                </span>
                <span className="text-gray-400">View →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedContest && (
        <div>
          <button
            onClick={() => setSelectedContest(null)}
            className="mb-6 px-4 py-2 bg-gray-200 rounded-xl flex items-center gap-2"
          >
            <FiArrowLeft /> Back
          </button>

          <h2 className="text-xl font-bold text-lime-600 mb-4">
            {selectedContest.title}
          </h2>

          {/* WARNING */}
          {!isAllEvaluated() && (
            <p className="text-red-500 text-sm mb-4">
              ⚠️ Evaluate all students before declaring winner
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...(selectedContest.submissionDetails || [])]
              .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
              .map((sub, index) => (
                <div
                  key={sub.submissionId}
                  className={`p-4 rounded-2xl shadow ${
                    index === 0
                      ? "bg-yellow-50 border border-yellow-400"
                      : "bg-white"
                  }`}
                >
                  <p className="font-semibold">{sub.student?.name}</p>
                  <p className="text-sm text-gray-500">
                    {sub.student?.email}
                  </p>

                  <div className="flex justify-between mt-2">
                    <span>🎯 {sub.totalScore || 0}</span>
                    <span>{sub.status}</span>
                  </div>

                  <p className="text-xs text-blue-600 mt-1">
                    📝 {sub.remarks || "No remarks"}
                  </p>

                  {editId === sub.submissionId ? (
                    <div className="mt-3 space-y-2">
                      <input
                        type="number"
                        value={editScore}
                        onChange={(e) => setEditScore(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                      />
                      <input
                        value={editFeedback}
                        onChange={(e) => setEditFeedback(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(sub)}
                          className="flex-1 bg-green-500 text-white py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="flex-1 bg-gray-300 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(sub)}
                        className="flex-1 bg-blue-100 text-blue-600 py-1 rounded"
                      >
                        {sub.status === "evaluated" ? "Edit" : "Evaluate"}
                      </button>

                      <button
                        onClick={() => handleDelete(sub)}
                        className="flex-1 bg-red-100 text-red-600 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {index === 0 && (
                    <div className="mt-2 text-yellow-600 text-sm">
                      🥇 Top Rank
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* DECLARE BUTTON */}
          <div className="mt-10 max-w-md mx-auto">
            <button
              onClick={handleDeclareWinner}
              disabled={!isAllEvaluated()}
              className={`w-full py-3 rounded-xl text-white font-semibold ${
                isAllEvaluated()
                  ? "bg-green-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Declare Winner
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl">
          {toast}
        </div>
      )}
    </div>
  );
};

export default EvaluationDashboard;