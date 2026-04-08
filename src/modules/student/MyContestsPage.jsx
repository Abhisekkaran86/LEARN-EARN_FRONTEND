// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaTrophy, FaUsers, FaCalendarAlt } from "react-icons/fa";

// const MyContestsPage = () => {
//   const [contests, setContests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate(); // ✅ added

//   useEffect(() => {
//     const fetchMy = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/participations/my-participations",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("API RESPONSE:", res.data);

//         setContests(res.data.participations || []);
//       } catch (err) {
//         console.error("ERROR:", err.response?.data || err.message);

//         if (err.response?.status === 401) {
//           alert("Session expired. Please login again ❌");
//         }
//       } finally {
//         setLoading(false); // ✅ FIX loading
//       }
//     };

//     fetchMy();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//           <FaTrophy className="text-[#82C600]" />
//           My Contests
//         </h1>
//         <p className="text-gray-500 mt-1">
//           View all contests you have participated in
//         </p>
//       </div>

//       {/* LOADING */}
//       {loading && (
//         <div className="text-center text-gray-400 mt-20">
//           Loading contests...
//         </div>
//       )}

//       {/* EMPTY */}
//       {!loading && contests.length === 0 && (
//         <div className="text-center py-20 bg-white rounded-2xl shadow">
//           <p className="text-gray-400 text-lg">
//             🚫 No contests joined yet
//           </p>
//         </div>
//       )}

//       {/* GRID */}
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//         {contests.map((item) => {
//           const contest = item.contest;
//           console.log("NAV ID:", item.contest?._id);

//           return (
//             <div
//               key={item._id}
//               className="bg-white rounded-2xl shadow-md hover:shadow-xl transition border overflow-hidden group"
//             >

//               {/* IMAGE */}
//               <div
//                 className="h-40 bg-cover bg-center group-hover:scale-105 transition"
//                 style={{
//                   backgroundImage: `url(${contest?.image || "/default.jpg"})`,
//                 }}
//               />

//               {/* BODY */}
//               <div className="p-5">

//                 {/* TAGS */}
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-xs bg-[#82C600]/10 text-[#82C600] px-2 py-1 rounded">
//                     {contest?.category || "Contest"}
//                   </span>

//                   <span className="text-xs bg-yellow-200 text-black px-2 py-1 rounded">
//                     {contest?.status || "Live"}
//                   </span>
//                 </div>

//                 {/* TITLE */}
//                 <h2 className="font-semibold text-gray-800 text-lg line-clamp-2">
//                   {contest?.title}
//                 </h2>

//                 {/* DESC */}
//                 <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                   {contest?.description}
//                 </p>

//                 {/* DATES */}
//                 <div className="mt-4 space-y-1 text-sm text-gray-600">
//                   <p className="flex items-center gap-2">
//                     <FaCalendarAlt />
//                     Start: {new Date(contest?.startDate).toLocaleDateString()}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <FaCalendarAlt />
//                     Deadline: {new Date(contest?.deadline).toLocaleDateString()}
//                   </p>
//                 </div>

//                 {/* FOOTER */}
//                 <div className="mt-4 flex justify-between items-center">

//                   <div className="flex items-center gap-2 text-gray-500 text-sm">
//                     <FaUsers />
//                     {contest?.users?.length || 0}
//                   </div>

//                   <div className="flex items-center gap-2">

//                     <span className="text-xs font-medium text-[#82C600]">
//                       ✅ Joined
//                     </span>

//                     {/* 🔥 SUBMIT BUTTON */}
//                     <button
//                       onClick={() => navigate(`/student/submit/${item.contest._id}`)}
//                       className="px-3 py-1 text-xs bg-[#82C600] text-white rounded-lg hover:bg-[#6fa800]"
//                     >
//                       Submit
//                     </button>

//                   </div>

//                 </div>

//               </div>
//             </div>
//           );
//         })}

//       </div>
//     </div>
//   );
// };

// export default MyContestsPage;

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Users, User } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

const ContestParticipatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = Cookies.get("userId");

  const { contests = [] } = useSelector((state) => state.contest);

  const contest = contests.find(
    (item) => item._id === id || item.id === id
  );

  // ================= STATES (UNCHANGED) =================
  const [mode, setMode] = useState("single");
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([""]);
  const [joinCode, setJoinCode] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  // ================= API FUNCTIONS (UNCHANGED) =================

  const joinSoloContest = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const res = await axios.post(
        `https://learn-earn-contest-2.onrender.com/api/v1/participations/contest/${id}/join/solo`,
        { user: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsJoined(true);
      alert(res.data?.message || "Joined successfully 🎉");
    } catch (err) {
      alert(err.response?.data?.message || "Join failed ❌");
    }
  };

  const createTeam = async () => {
    try {
      const res = await axios.post(
        `https://learn-earn-contest-2.onrender.com/api/v1/participations/contest/${id}/join/team`,
        {
          teamName,
          members,
          participationType: "team",
        }
      );

      setIsJoined(true);
      setIsTeamModalOpen(false);
      alert(res.data?.message || "🎉 Team Created!");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Team creation failed");
    }
  };

  const joinTeamByCode = async () => {
    try {
      const res = await axios.post(
        `https://learn-earn-contest-2.onrender.com/api/v1/participations/contest/${id}/join/team`,
        {
          joinCode,
          participationType: "team",
        }
      );

      setIsJoined(true);
      alert(res.data?.message || "🎉 Joined Team");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to join team");
    }
  };

  // =======================================================

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Contest not found ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

      {/* 🔥 MAIN CARD */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border p-6 md:p-8">

        <div className="flex flex-col md:flex-row gap-6">

          {/* IMAGE */}
          <div className="w-full md:w-[45%] h-48 rounded-2xl overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition duration-500 hover:scale-105"
              style={{
                backgroundImage: `url(${contest.image || "/default.jpg"})`,
              }}
            />
          </div>

          {/* DETAILS */}
          <div className="flex-1">

            <div className="flex gap-2 mb-2">
              <span className="bg-[#82C600]/20 text-[#82C600] text-xs px-2 py-1 rounded-full">
                {contest.category || "Contest"}
              </span>
              <span className="bg-yellow-300 text-black text-xs px-2 py-1 rounded-full">
                {contest.status || "Live"}
              </span>
            </div>

            <h1 className="text-xl font-semibold text-gray-800">
              {contest.title}
            </h1>

            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {contest.description}
            </p>

            <div className="mt-3 space-y-1 text-xs text-gray-600">
              <p>📅 Start: {new Date(contest.startDate).toLocaleDateString()}</p>
              <p>⏳ Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
              <p>👥 {contest.users?.length || 0} Participants</p>
            </div>

          </div>
        </div>

        {/* PARTICIPATION */}
        <div className="mt-6">

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div
              onClick={() => setMode("single")}
              className={`p-3 rounded-xl border cursor-pointer ${
                mode === "single"
                  ? "border-[#82C600] bg-[#82C600]/10"
                  : "border-gray-200"
              }`}
            >
              <User className="text-[#82C600]" size={18} />
              <p className="text-sm font-medium">Single</p>
            </div>

            <div
              onClick={() => setMode("team")}
              className={`p-3 rounded-xl border cursor-pointer ${
                mode === "team"
                  ? "border-[#82C600] bg-[#82C600]/10"
                  : "border-gray-200"
              }`}
            >
              <Users className="text-[#82C600]" size={18} />
              <p className="text-sm font-medium">Team</p>
            </div>
          </div>

          {mode === "team" && (
            <div className="flex flex-col md:flex-row gap-3 mb-4">

              <button
                onClick={() => setIsTeamModalOpen(true)}
                className="px-4 py-2 bg-[#82C600]/10 text-[#82C600] rounded-lg"
              >
                ➕ Create Team
              </button>

              <div className="flex gap-2">
                <input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="Enter code"
                  className="px-3 py-2 border rounded-lg"
                />
                <button
                  onClick={() => {
                    if (!joinCode) return alert("Enter code ❌");
                    joinTeamByCode();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Join
                </button>
              </div>

            </div>
          )}

          {/* ACTION */}
          <div className="flex justify-between items-center flex-col md:flex-row gap-4">

            <p className="text-xs text-gray-500">
              {mode === "single"
                ? "Participating individually"
                : "Participating as team"}
            </p>

            <button
              onClick={() => {
                if (isJoined) return;

                if (mode === "team") {
                  setIsTeamModalOpen(true);
                  return;
                }

                joinSoloContest();
              }}
              disabled={isJoined}
              className={`px-5 py-2 text-sm rounded-xl ${
                isJoined
                  ? "bg-gray-300"
                  : "bg-gradient-to-r from-[#82C600] to-[#6fa800] text-white"
              }`}
            >
              {isJoined ? "Joined" : "Participate"}
            </button>

          </div>
        </div>
      </div>

      {/* 🔥 RELATED CONTESTS */}
      <div className="max-w-7xl mx-auto mt-14">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          🔥 Explore More Contests
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {contests
            .filter((c) => c._id !== contest._id)
            .slice(0, 8)
            .map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/contest/${item._id}`)}
                className="group cursor-pointer bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >

                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.image || "/default.jpg"}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                  <span className="absolute top-3 right-3 text-xs bg-yellow-300 px-2 py-1 rounded-full">
                    {item.status || "Live"}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-3 flex justify-between text-xs">
                    <span>👥 {item.users?.length || 0}</span>
                    <span className="text-[#82C600]">View →</span>
                  </div>
                </div>

              </div>
            ))}

        </div>
      </div>

      {/* TEAM MODAL (UNCHANGED) */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">

            <h2 className="font-semibold mb-3">Create Team</h2>

            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
              className="w-full border px-3 py-2 rounded mb-3"
            />

            {members.map((m, i) => (
              <input
                key={i}
                value={m}
                onChange={(e) => {
                  const arr = [...members];
                  arr[i] = e.target.value;
                  setMembers(arr);
                }}
                placeholder={`Member ${i + 1}`}
                className="w-full border px-3 py-2 rounded mb-2"
              />
            ))}

            <button
              onClick={() => setMembers([...members, ""])}
              className="text-sm text-[#82C600]"
            >
              + Add Member
            </button>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setIsTeamModalOpen(false)}>
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!teamName) return alert("Enter team name ❌");
                  createTeam();
                }}
                className="bg-[#82C600] text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ContestParticipatePage;