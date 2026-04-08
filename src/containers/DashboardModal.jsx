// import { X } from "lucide-react";

// const DashboardModal = ({ isOpen, onClose, data = [], title, loading }) => {
//   if (!isOpen) return null;

//   const renderRow = (item) => {
//     if (title === "TOTAL USERS") {
//       return (
//         <>
//           <div className="font-medium text-gray-800">{item.name}</div>
//           <div className="text-gray-500 text-sm">{item.email}</div>
//           <div>
//             <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
//               {item.role}
//             </span>
//           </div>
//         </>
//       );
//     }

//     if (title === "ACTIVE CONTESTS") {
//       return (
//         <>
//           <div className="font-medium text-gray-800">{item.title}</div>
//           <div className="text-gray-500 text-sm">{item.startDate}</div>
//           <div>
//             <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
//               {item.status}
//             </span>
//           </div>
//         </>
//       );
//     }

//     if (title === "TOTAL SUBMISSIONS") {
//       return (
//         <>
//           <div className="text-gray-800">{item.userId}</div>
//           <div className="text-gray-500 text-sm">{item.contestId}</div>
//           <div>
//             <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
//               {item.status}
//             </span>
//           </div>
//         </>
//       );
//     }

//     return <pre>{JSON.stringify(item, null, 2)}</pre>;
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
//       <div className="bg-white w-[95%] max-w-4xl max-h-[85vh] rounded-2xl shadow-xl overflow-hidden flex flex-col">

//         {/* HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
//           <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-200 transition"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* CONTENT */}
//         <div className="p-6 overflow-y-auto flex-1">

//           {loading ? (
//             <div className="text-center py-20 text-gray-500">
//               Loading data...
//             </div>
//           ) : data.length === 0 ? (
//             <div className="text-center py-20 text-gray-400">
//               No data available
//             </div>
//           ) : (
//             <div className="space-y-3">

//               {/* TABLE HEADER */}
//               <div className="grid grid-cols-3 text-sm font-semibold text-gray-500 border-b pb-2">
//                 <div>Info</div>
//                 <div>Details</div>
//                 <div>Status</div>
//               </div>

//               {/* DATA ROWS */}
//               {data.map((item, i) => (
//                 <div
//                   key={i}
//                   className="grid grid-cols-3 items-center p-3 rounded-xl hover:bg-gray-50 transition border"
//                 >
//                   {renderRow(item)}
//                 </div>
//               ))}

//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DashboardModal;

// import React from "react";

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
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <div className="bg-white w-[700px] max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl p-6">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-5 border-b pb-3">
//           <h2 className="text-2xl font-semibold text-lime-600">
//             {title}
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-red-500 text-xl"
//           >
//             ✕
//           </button>
//         </div>

//         {loading ? (
//           <div className="text-center py-10 text-gray-500">
//             Loading...
//           </div>
//         ) : (
//           <>
//             {title === "TOTAL SUBMISSIONS" ? (
//               <>
//                 {/* ✅ CONTEST LIST */}
//                 {!selectedContest &&
//                   data?.map((contest) => (
//                     <div
//                       key={contest._id}
//                       onClick={() => onContestClick(contest)}
//                       className="p-4 mb-4 rounded-xl border hover:shadow-md transition cursor-pointer hover:border-lime-400 bg-gray-50 hover:bg-white"
//                     >
//                       <div className="flex justify-between items-center">
//                         <h3 className="text-lg font-semibold text-gray-800">
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

//                       <p className="text-sm text-gray-500 mt-1">
//                         {contest.description}
//                       </p>

//                       <div className="mt-3 flex justify-between items-center">
//                         <span className="text-sm text-gray-600">
//                           👥 {contest.totalSubmittedStudents} submissions
//                         </span>

//                         <span className="text-xs text-lime-600 font-medium">
//                           View →
//                         </span>
//                       </div>
//                     </div>
//                   ))}

//                 {/* ✅ STUDENT LIST */}
//                 {selectedContest && (
//                   <div>
//                     <button
//                       onClick={() => setSelectedContest(null)}
//                       className="mb-4 text-sm px-4 py-2 rounded-lg bg-lime-100 text-lime-700 hover:bg-lime-200"
//                     >
//                       ← Back
//                     </button>

//                     <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                       {selectedContest.title} Submissions
//                     </h2>

//                     {selectedContest.studentDetails?.map((student) => (
//                       <div
//                         key={student._id}
//                         className="p-4 mb-3 border rounded-xl hover:shadow-sm transition"
//                       >
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-medium text-gray-800">
//                               {student.name}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               {student.email}
//                             </p>
//                           </div>

//                           <span className="text-xs text-gray-400">
//                             {new Date(
//                               student.submittedAt
//                             ).toLocaleDateString()}
//                           </span>
//                         </div>

//                         <div className="mt-3 flex gap-3">
//                           <a
//                             href={student.githubLink}
//                             target="_blank"
//                             className="px-3 py-1 text-sm rounded-lg bg-gray-900 text-white hover:bg-black"
//                           >
//                             GitHub
//                           </a>

//                           <a
//                             href={student.liveUrl}
//                             target="_blank"
//                             className="px-3 py-1 text-sm rounded-lg bg-lime-500 text-white hover:bg-lime-600"
//                           >
//                             Live Demo
//                           </a>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             ) : (
//               // ✅ OTHER MODAL (UNCHANGED STYLE)
//               data?.map((item, index) => (
//                 <div
//                   key={index}
//                   className="p-3 mb-2 border rounded-lg hover:shadow-sm"
//                 >
//                   <p className="text-sm text-gray-700">
//                     {item.name || item.title || "No Data"}
//                   </p>
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

// import React from "react";
// import { useNavigate } from "react-router-dom"; // ✅ added

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
//   const navigate = useNavigate(); // ✅ added

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <div className="bg-white w-[700px] max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl p-6">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-5 border-b pb-3">
//           <h2 className="text-2xl font-semibold text-lime-600">
//             {title}
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-red-500 text-xl"
//           >
//             ✕
//           </button>
//         </div>

//         {loading ? (
//           <div className="text-center py-10 text-gray-500">
//             Loading...
//           </div>
//         ) : (
//           <>
//             {title === "TOTAL SUBMISSIONS" ? (
//               <>
//                 {/* ✅ CONTEST LIST */}
//                 {!selectedContest &&
//                   data?.map((contest) => (
//                     <div
//                       key={contest._id}
//                       onClick={() => onContestClick(contest)}
//                       className="p-4 mb-4 rounded-xl border hover:shadow-md transition cursor-pointer hover:border-lime-400 bg-gray-50 hover:bg-white"
//                     >
//                       <div className="flex justify-between items-center">
//                         <h3 className="text-lg font-semibold text-gray-800">
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

//                       <p className="text-sm text-gray-500 mt-1">
//                         {contest.description}
//                       </p>

//                       <div className="mt-3 flex justify-between items-center">
//                         <span className="text-sm text-gray-600">
//                           👥 {contest.totalSubmittedStudents} submissions
//                         </span>

//                         <span className="text-xs text-lime-600 font-medium">
//                           View →
//                         </span>
//                       </div>
//                     </div>
//                   ))}

//                 {/* ✅ STUDENT LIST */}
//                 {selectedContest && (
//                   <div>
//                     <button
//                       onClick={() => setSelectedContest(null)}
//                       className="mb-4 text-sm px-4 py-2 rounded-lg bg-lime-100 text-lime-700 hover:bg-lime-200"
//                     >
//                       ← Back
//                     </button>

//                     <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                       {selectedContest.title} Submissions
//                     </h2>

//                     {selectedContest.studentDetails?.map((student) => (
//                       <div
//                         key={student._id}
//                         className="p-4 mb-3 border rounded-xl hover:shadow-sm transition"
//                       >
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-medium text-gray-800">
//                               {student.name}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               {student.email}
//                             </p>
//                           </div>

//                           <span className="text-xs text-gray-400">
//                             {new Date(
//                               student.submittedAt
//                             ).toLocaleDateString()}
//                           </span>
//                         </div>

//                         <div className="mt-3 flex gap-3">
//                           <a
//                             href={student.githubLink}
//                             target="_blank"
//                             className="px-3 py-1 text-sm rounded-lg bg-gray-900 text-white hover:bg-black"
//                           >
//                             GitHub
//                           </a>

//                           <a
//                             href={student.liveUrl}
//                             target="_blank"
//                             className="px-3 py-1 text-sm rounded-lg bg-lime-500 text-white hover:bg-lime-600"
//                           >
//                             Live Demo
//                           </a>

//                           {/* 🔥 PRO DECLARE WINNER BUTTON */}
//                           <button
//                             onClick={() =>
//                               navigate("/admin/evaluation", {
//                                 state: {
//                                   contest: selectedContest,
//                                   student: student,
//                                 },
//                               })
//                             }
//                             className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl 
//                             bg-gradient-to-r from-lime-500 to-lime-600 text-white 
//                             shadow-md hover:shadow-lg hover:scale-105 active:scale-95 
//                             transition-all duration-200"
//                           >
//                             🏆 Declare Winner
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             ) : (
//               data?.map((item, index) => (
//                 <div
//                   key={index}
//                   className="p-3 mb-2 border rounded-lg hover:shadow-sm"
//                 >
//                   <p className="text-sm text-gray-700">
//                     {item.name || item.title || "No Data"}
//                   </p>
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
//                 {/* ✅ CONTEST LIST */}
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

//                 {/* ✅ STUDENT LIST */}
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

//                     {selectedContest.studentDetails?.map((student) => (
//                       <div
//                         key={student._id}
//                         className="p-5 mb-4 border rounded-2xl bg-white hover:shadow-lg transition-all"
//                       >
//                         <div className="flex justify-between items-center mb-3">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-700 font-bold">
//                               {student.name?.charAt(0)}
//                             </div>

//                             <div>
//                               <p className="font-semibold text-gray-800">
//                                 {student.name}
//                               </p>
//                               <p className="text-sm text-gray-500">
//                                 {student.email}
//                               </p>
//                             </div>
//                           </div>

//                           <span className="text-xs text-gray-400">
//                             {new Date(
//                               student.submittedAt
//                             ).toLocaleDateString()}
//                           </span>
//                         </div>

//                         <div className="flex gap-3">
//                           <a
//                             href={student.githubLink}
//                             target="_blank"
//                             className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-black transition"
//                           >
//                             🔗 GitHub
//                           </a>

//                           <a
//                             href={student.liveUrl}
//                             target="_blank"
//                             className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-lime-500 text-white hover:bg-lime-600 transition"
//                           >
//                             🚀 Live Demo
//                           </a>

//                           <button
//                             onClick={() =>
//                               navigate("/admin/evaluation", {
//                                 state: {
//                                   contest: selectedContest,
//                                   student: student,
//                                 },
//                               })
//                             }
//                             className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg 
//                             bg-gradient-to-r from-lime-500 to-lime-600 text-white 
//                             shadow-md hover:shadow-lg hover:scale-105 active:scale-95 
//                             transition-all duration-200"
//                           >
//                             🏆 Declare
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             ) : (
//               data?.map((item, index) => (
//                 <div
//                   key={index}
//                   className="p-4 mb-3 border rounded-xl bg-white hover:shadow-md transition"
//                 >
//                   <p className="text-sm font-medium text-gray-700">
//                     {item.name || item.title || "No Data"}
//                   </p>
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
import { FaUser } from "react-icons/fa";
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
                          className={`text-xs px-3 py-1 rounded-full font-medium ${contest.status === "active"
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

                    {selectedContest.studentDetails?.map((student) => (
                      <div
                        key={student._id}
                        className="p-5 mb-4 border rounded-2xl bg-white hover:shadow-lg transition-all"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-3">

                            {/* 👤 ICON AVATAR */}
                            <div className="w-11 h-11 rounded-full bg-lime-100 flex items-center justify-center shadow-sm">
                              <FaUser className="text-lime-600 text-lg" />
                            </div>

                            {/* 🧾 USER INFO */}
                            <div>
                              <p className="font-semibold text-gray-800 leading-tight">
                                {student.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {student.email}
                              </p>
                            </div>

                          </div>

                          <span className="text-xs text-gray-400">
                            {new Date(
                              student.submittedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <a
                            href={student.githubLink}
                            target="_blank"
                            className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-black transition"
                          >
                            🔗 GitHub
                          </a>

                          <a
                            href={student.liveUrl}
                            target="_blank"
                            className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-lime-500 text-white hover:bg-lime-600 transition"
                          >
                            🚀 Live Demo
                          </a>

                          <button
                            onClick={() =>
                              navigate("/admin/evaluation", {
                                state: {
                                  contest: selectedContest,
                                  student: student,
                                },
                              })
                            }
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg 
                            bg-gradient-to-r from-lime-500 to-lime-600 text-white 
                            shadow-md hover:shadow-lg hover:scale-105 active:scale-95 
                            transition-all duration-200"
                          >
                            🏆 Declare
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              data?.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded-2xl bg-white hover:shadow-lg transition"
                >
                  <div className="flex gap-4">

                    {/* 🔥 PRO IMAGE */}
                    {item.image && (
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt="contest"
                          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70"></div>

                        {item.status && (
                          <span className="absolute top-1 right-1 text-[10px] px-2 py-[2px] rounded-full bg-lime-500 text-white shadow">
                            {item.status}
                          </span>
                        )}
                      </div>)}

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.title || item.name}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.description || item.email}
                      </p>

                      <div className="mt-3 text-sm text-gray-600 space-y-1">
                        {item.startDate && (
                          <p>
                            📅 Start:{" "}
                            {new Date(item.startDate).toLocaleDateString()}
                          </p>
                        )}

                        {item.deadline && (
                          <p>
                            ⏳ Deadline:{" "}
                            {new Date(item.deadline).toLocaleDateString()}
                          </p>
                        )}

                        {item.rewards?.length > 0 && (
                          <p className="text-lime-600 font-medium">
                            🎁 {item.rewards[0]}
                          </p>
                        )}

                        {item.totalSubmittedStudents !== undefined && (
                          <p>
                            👥 {item.totalSubmittedStudents} submissions
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardModal;