


// import React from "react";
// import { FaUser } from "react-icons/fa";
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
//                           className={`text-xs px-3 py-1 rounded-full font-medium ${contest.status === "active"
//                             ? "bg-lime-100 text-lime-700"
//                             : "bg-gray-200 text-gray-600"
//                             }`}
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

//                             {/* 👤 ICON AVATAR */}
//                             <div className="w-11 h-11 rounded-full bg-lime-100 flex items-center justify-center shadow-sm">
//                               <FaUser className="text-lime-600 text-lg" />
//                             </div>

//                             {/* 🧾 USER INFO */}
//                             <div>
//                               <p className="font-semibold text-gray-800 leading-tight">
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
//                   className="mb-4 p-4 border rounded-2xl bg-white hover:shadow-lg transition"
//                 >
//                   <div className="flex gap-4">

//                     {/* 🔥 PRO IMAGE */}
//                     {item.image && (
//                       <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
//                         <img
//                           src={item.image}
//                           alt="contest"
//                           className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
//                         />

//                         {/* overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70"></div>

//                         {item.status && (
//                           <span className="absolute top-1 right-1 text-[10px] px-2 py-[2px] rounded-full bg-lime-500 text-white shadow">
//                             {item.status}
//                           </span>
//                         )}
//                       </div>)}

//                     <div className="flex-1">
//                       <div className="flex justify-between items-start">
//                         <h3 className="text-lg font-semibold text-gray-800">
//                           {item.title || item.name}
//                         </h3>
//                       </div>

//                       <p className="text-sm text-gray-500 mt-1 line-clamp-2">
//                         {item.description || item.email}
//                       </p>

//                       <div className="mt-3 text-sm text-gray-600 space-y-1">
//                         {item.startDate && (
//                           <p>
//                             📅 Start:{" "}
//                             {new Date(item.startDate).toLocaleDateString()}
//                           </p>
//                         )}

//                         {item.deadline && (
//                           <p>
//                             ⏳ Deadline:{" "}
//                             {new Date(item.deadline).toLocaleDateString()}
//                           </p>
//                         )}

//                         {item.rewards?.length > 0 && (
//                           <p className="text-lime-600 font-medium">
//                             🎁 {item.rewards[0]}
//                           </p>
//                         )}

//                         {item.totalSubmittedStudents !== undefined && (
//                           <p>
//                             👥 {item.totalSubmittedStudents} submissions
//                           </p>
//                         )}
//                       </div>
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

                {/* STUDENTS */}
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

                            <div className="w-11 h-11 rounded-full bg-lime-100 flex items-center justify-center shadow-sm">
                              <FaUser className="text-lime-600 text-lg" />
                            </div>

                            <div>
                              <p className="font-semibold text-gray-800">
                                {student.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {student.email}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs text-gray-400">
                            {new Date(student.submittedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <a
                            href={student.githubLink}
                            target="_blank"
                            className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-gray-900 text-white"
                          >
                            🔗 GitHub
                          </a>

                          <a
                            href={student.liveUrl}
                            target="_blank"
                            className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-lime-500 text-white"
                          >
                            🚀 Live Demo
                          </a>

                          <button
                            onClick={() =>
                              navigate("/admin/evaluation", {
                                state: { contest: selectedContest, student },
                              })
                            }
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white"
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

                    {/* IMAGE */}
                    {item.image && (
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt="contest"
                          className="max-w-full max-h-full object-contain"
                        />

                        {/* ACTIVE BADGE */}
                        {item.status === "active" && (
                          <span className="absolute top-1 left-1 text-[10px] px-2 py-[2px] rounded-full bg-green-500 text-white shadow">
                            Active
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex-1">

                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.title || item.name}
                      </h3>

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

                      {/* 🔥 NEW BADGES */}
                      <div className="flex flex-wrap gap-2 mt-3">

                        {item.participationType && (
                          <span
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                              item.participationType === "team"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-purple-100 text-purple-600"
                            }`}
                          >
                            {item.participationType === "team" ? (
                              <>
                                <FaUsers /> Team Join
                              </>
                            ) : (
                              <>
                                <FaUser /> Solo Join
                              </>
                            )}
                          </span>
                        )}

                        {item.participationType === "team" &&
                          item.maxTeamSize && (
                            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                              Max {item.maxTeamSize} members
                            </span>
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

