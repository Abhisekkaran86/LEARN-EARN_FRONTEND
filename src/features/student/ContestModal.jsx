// import { useNavigate } from "react-router-dom";
// import {
//   FiX,
//   FiCalendar,
//   FiUsers,
//   FiUser,
//   FiSend,
//   FiCheckCircle,
// } from "react-icons/fi";

// const ContestModal = ({ selectedContest, onClose }) => {
//   const navigate = useNavigate();

//   if (!selectedContest) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
//       onClick={onClose} // ✅ click outside closes modal
//     >

//       <div
//         className="bg-white w-[95%] md:w-[600px] rounded-3xl shadow-2xl overflow-hidden relative"
//         onClick={(e) => e.stopPropagation()} // ✅ prevent inside click close
//       >

//         {/* CLOSE BUTTON */}
//         <button
//           onClick={() => onClose && onClose()}
//           className="absolute top-4 right-4 z-50 bg-white/80 backdrop-blur p-2 rounded-full text-gray-500 hover:text-black shadow"
//         >
//           <FiX size={18} />
//         </button>

//         {/* IMAGE */}
//         <div className="relative h-52 w-full overflow-hidden">
//           <img
//             src={selectedContest.contest?.image || "/default.jpg"}
//             alt="contest"
//             className="w-full h-full object-cover"
//           />

//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

//           <div className="absolute bottom-3 left-4 text-white">
//             <h2 className="text-lg font-semibold drop-shadow">
//               {selectedContest.contest?.title}
//             </h2>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="p-6 space-y-5">

//           {/* DESCRIPTION */}
//           <p className="text-gray-500 text-sm leading-relaxed">
//             {selectedContest.contest?.description}
//           </p>

//           {/* INFO */}
//           <div className="grid grid-cols-2 gap-3">

//             {/* DEADLINE */}
//             <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3">
//               <div className="bg-green-100 text-green-600 p-2 rounded-lg">
//                 <FiCalendar />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400">Deadline</p>
//                 <p className="text-sm font-medium">
//                   {new Date(
//                     selectedContest.contest?.deadline
//                   ).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>

//             {/* STATUS */}
//             <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3">
//               <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
//                 <FiCheckCircle />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400">Status</p>
//                 <p className="text-sm font-medium capitalize">
//                   {selectedContest.contest?.status}
//                 </p>
//               </div>
//             </div>

//           </div>

//           {/* PARTICIPATION */}
//           <div>
//             <p className="font-semibold text-sm mb-2 text-gray-700">
//               Participation
//             </p>

//             {selectedContest.participationType === "team" ? (
//               <div className="bg-gray-50 rounded-xl p-3">
//                 <p className="text-sm font-medium flex items-center gap-2 mb-2">
//                   <FiUsers />
//                   {selectedContest.team?.teamName}
//                 </p>

//                 <div className="space-y-1 text-xs text-gray-500">
//                   {selectedContest.team?.members?.map((m, i) => (
//                     <p key={i} className="flex items-center gap-2">
//                       <FiUser size={12} />
//                       {m.name || m.email}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 flex items-center gap-2">
//                 <FiUser />
//                 Solo Participation
//               </div>
//             )}
//           </div>

//           {/* ACTION */}
//           {selectedContest.contest?.status === "completed" ? (
//             <div className="bg-gray-100 text-gray-500 text-sm text-center py-3 rounded-xl flex items-center justify-center gap-2">
//               <FiCheckCircle />
//               Contest closed — submission not allowed
//             </div>
//           ) : (
//             <button
//               onClick={() =>
//                 navigate(`/student/submit/${selectedContest.contest._id}`)
//               }
//               className="w-full bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:scale-[1.02] transition"
//             >
//               <FiSend />
//               Submit Now
//             </button>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContestModal;


import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiCalendar,
  FiUsers,
  FiUser,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import API from "../../services/axios"; // adjust path if needed

const ContestModal = ({ selectedContest, onClose }) => {
  const navigate = useNavigate();

  const [showJoin, setShowJoin] = useState(false);
  const [mode, setMode] = useState("single");
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  if (!selectedContest) return null;

  // ================= FETCH TEAMS =================
  useEffect(() => {
    if (mode === "team" && showJoin) {
      API.get(`/teams/contest/${selectedContest.contest._id}`)
        .then((res) => setTeams(res.data.teams))
        .catch(() => setTeams([]));
    }
  }, [mode, showJoin]);

  // ================= ACTIONS =================
  const joinSolo = async () => {
    try {
      await API.post(
        `/participations/contest/${selectedContest.contest._id}/join/solo`
      );
      alert("✅ Joined Solo");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const createTeam = async () => {
    try {
      await API.post(
        `/participations/contest/${selectedContest.contest._id}/join/team`,
        { teamName }
      );
      alert("✅ Team Created");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const joinTeam = async (teamId) => {
    try {
      await API.post(`/teams/join/${teamId}`);
      alert("✅ Joined Team");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      {/* ================= MAIN MODAL ================= */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
        onClick={onClose}
      >
        <div
          className="bg-white w-[95%] md:w-[600px] rounded-3xl shadow-2xl overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-white/80 p-2 rounded-full"
          >
            <FiX />
          </button>

          {/* IMAGE */}
          <div className="relative h-52 w-full overflow-hidden">
            <img
              src={selectedContest.contest?.image || "/default.jpg"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* BODY */}
          <div className="p-6 space-y-5">
            <h2 className="text-lg font-semibold">
              {selectedContest.contest?.title}
            </h2>

            <p className="text-gray-500 text-sm">
              {selectedContest.contest?.description}
            </p>

            {/* INFO */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-xl flex gap-2">
                <FiCalendar />
                <span>
                  {new Date(
                    selectedContest.contest?.deadline
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl flex gap-2">
                <FiCheckCircle />
                <span>{selectedContest.contest?.status}</span>
              </div>
            </div>

            {/* ================= JOIN BUTTON ================= */}
            {selectedContest.contest?.status === "completed" ? (
              <div className="bg-gray-100 text-gray-500 text-sm text-center py-3 rounded-xl">
                Contest closed
              </div>
            ) : (
              <button
                onClick={() => setShowJoin(true)}
                className="w-full bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <FiSend />
                Join Contest
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= JOIN MODAL ================= */}
      {showJoin && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
          onClick={() => setShowJoin(false)}
        >
          <div
            className="bg-white w-[95%] md:w-[500px] rounded-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">
              Join Contest
            </h2>

            {/* OPTIONS */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {(selectedContest.contest?.participationType === "solo" ||
                selectedContest.contest?.participationType === "both") && (
                <div
                  onClick={() => setMode("single")}
                  className={`p-3 border rounded-xl cursor-pointer ${
                    mode === "single" ? "bg-green-100" : ""
                  }`}
                >
                  <FiUser /> Solo
                </div>
              )}

              {(selectedContest.contest?.participationType === "team" ||
                selectedContest.contest?.participationType === "both") && (
                <div
                  onClick={() => setMode("team")}
                  className={`p-3 border rounded-xl cursor-pointer ${
                    mode === "team" ? "bg-green-100" : ""
                  }`}
                >
                  <FiUsers /> Team
                </div>
              )}
            </div>

            {/* SOLO */}
            {mode === "single" &&
              selectedContest.contest?.participationType !== "team" && (
                <button
                  onClick={joinSolo}
                  className="w-full bg-green-600 text-white py-2 rounded-xl"
                >
                  Join Solo
                </button>
              )}

            {/* TEAM */}
            {mode === "team" &&
              selectedContest.contest?.participationType !== "solo" && (
                <>
                  <button
                    onClick={() => setShowCreate(true)}
                    className="w-full bg-blue-600 text-white py-2 rounded-xl mb-3"
                  >
                    Create Team
                  </button>

                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {teams.map((team) => (
                      <div
                        key={team._id}
                        className="flex justify-between items-center border p-2 rounded"
                      >
                        <span>{team.teamName}</span>

                        <button
                          onClick={() => joinTeam(team._id)}
                          className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                        >
                          Join
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

            {/* CREATE TEAM */}
            {showCreate && (
              <div className="mt-4">
                <input
                  placeholder="Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full border p-2 mb-2"
                />

                <button
                  onClick={createTeam}
                  className="w-full bg-green-600 text-white py-2 rounded"
                >
                  Create Team
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContestModal;