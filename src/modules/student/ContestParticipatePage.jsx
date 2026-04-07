





// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { ArrowLeft, Users, User } from "lucide-react";

// const ContestParticipatePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { contests = [] } = useSelector((state) => state.contest);

//   const contest = contests.find(
//     (item) => item._id === id || item.id === id
//   );

//   // ✅ STATES
//   const [mode, setMode] = useState("single");
//   const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
//   const [teamName, setTeamName] = useState("");
//   const [members, setMembers] = useState([""]);
//   const [joinCode, setJoinCode] = useState("");
//   const [isJoined, setIsJoined] = useState(false);

//   if (!contest) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Contest not found ❌
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

//       {/* 🔥 BACK BUTTON */}
//       <div className="max-w-5xl mx-auto mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-4 py-2 bg-white shadow rounded-xl hover:bg-[#82C600]/10 transition"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </button>
//       </div>

//       {/* MAIN CARD */}
//       <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border p-6 md:p-10">

//         {/* TOP */}
//         <div className="flex flex-col md:flex-row gap-6">

//           {/* IMAGE */}
//           <div className="w-full md:w-1/2 h-56 rounded-2xl overflow-hidden">
//             <div
//               className="w-full h-full bg-cover bg-center"
//               style={{
//                 backgroundImage: `url(${contest.image || "/default.jpg"})`,
//               }}
//             />
//           </div>

//           {/* DETAILS */}
//           <div className="flex-1">

//             <div className="flex gap-2 mb-2">
//               <span className="bg-[#82C600]/20 text-[#82C600] text-xs px-2 py-1 rounded">
//                 {contest.category || "Contest"}
//               </span>
//               <span className="bg-yellow-300 text-black text-xs px-2 py-1 rounded">
//                 {contest.status || "Live"}
//               </span>
//             </div>

//             <h1 className="text-2xl font-bold text-gray-800">
//               {contest.title}
//             </h1>

//             <p className="text-sm text-gray-500 mt-2">
//               {contest.description}
//             </p>

//             <div className="mt-4 space-y-2 text-sm text-gray-600">
//               <p>📅 Start: {new Date(contest.startDate).toLocaleDateString()}</p>
//               <p>⏳ Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
//               <p>👥 Participants: {contest.users?.length || 0}</p>
//             </div>

//           </div>
//         </div>

//         {/* DIVIDER */}
//         <div className="my-6 border-t" />

//         {/* 🔥 GUIDELINES */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">📜 Guidelines</h2>

//           <div className="grid md:grid-cols-2 gap-4">
//             {(contest.requirements || ["Submit before deadline"]).map((rule, i) => (
//               <div
//                 key={i}
//                 className="p-4 bg-[#82C600]/5 border border-[#82C600]/20 rounded-xl text-sm"
//               >
//                 ✅ {rule}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* DIVIDER */}
//         <div className="my-6 border-t" />

//         {/* 🔥 PARTICIPATION TYPE */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">
//             Choose Participation Type
//           </h2>

//           <div className="grid grid-cols-2 gap-4">

//             {/* SINGLE */}
//             <div
//               onClick={() => setMode("single")}
//               className={`p-4 rounded-xl border cursor-pointer ${
//                 mode === "single"
//                   ? "border-[#82C600] bg-[#82C600]/10"
//                   : "border-gray-200"
//               }`}
//             >
//               <User className="text-[#82C600]" size={18} />
//               <p className="font-medium">Single</p>
//             </div>

//             {/* TEAM */}
//             <div
//               onClick={() => setMode("team")}
//               className={`p-4 rounded-xl border cursor-pointer ${
//                 mode === "team"
//                   ? "border-[#82C600] bg-[#82C600]/10"
//                   : "border-gray-200"
//               }`}
//             >
//               <Users className="text-[#82C600]" size={18} />
//               <p className="font-medium">Team</p>
//             </div>

//           </div>

//           {/* TEAM ACTION */}
//           {mode === "team" && (
//             <div className="mt-4 flex flex-col md:flex-row gap-3">

//               <button
//                 onClick={() => setIsTeamModalOpen(true)}
//                 className="px-4 py-2 bg-[#82C600]/10 text-[#82C600] rounded-lg"
//               >
//                 ➕ Create Team
//               </button>

//               <div className="flex gap-2">
//                 <input
//                   value={joinCode}
//                   onChange={(e) => setJoinCode(e.target.value)}
//                   placeholder="Enter team code"
//                   className="px-3 py-2 border rounded-lg"
//                 />
//                 <button
//                   onClick={() => {
//                     if (!joinCode) return alert("Enter code ❌");
//                     setIsJoined(true);
//                     alert("🎉 Joined Team");
//                   }}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   Join
//                 </button>
//               </div>

//             </div>
//           )}
//         </div>

//         {/* DIVIDER */}
//         <div className="my-6 border-t" />

//         {/* 🔥 ACTION */}
//         <div className="flex justify-between items-center flex-col md:flex-row gap-4">

//           <p className="text-sm text-gray-500">
//             {mode === "single"
//               ? "Participating individually"
//               : "Participating as team"}
//           </p>

//           <button
//             onClick={() => {
//               if (isJoined) return;

//               if (mode === "team") {
//                 setIsTeamModalOpen(true);
//                 return;
//               }

//               setIsJoined(true);
//               alert("🎉 Joined Successfully!");
//             }}
//             disabled={isJoined}
//             className={`px-6 py-2 rounded-xl ${
//               isJoined
//                 ? "bg-gray-300"
//                 : "bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white"
//             }`}
//           >
//             {isJoined ? "✅ Already Joined" : "🚀 Participate Now"}
//           </button>

//         </div>
//       </div>

//       {/* 🔥 TEAM MODAL */}
//       {isTeamModalOpen && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded-2xl w-full max-w-md">

//             <h2 className="font-semibold mb-3">Create Team</h2>

//             <input
//               value={teamName}
//               onChange={(e) => setTeamName(e.target.value)}
//               placeholder="Team Name"
//               className="w-full border px-3 py-2 rounded mb-3"
//             />

//             {members.map((m, i) => (
//               <input
//                 key={i}
//                 value={m}
//                 onChange={(e) => {
//                   const arr = [...members];
//                   arr[i] = e.target.value;
//                   setMembers(arr);
//                 }}
//                 placeholder={`Member ${i + 1}`}
//                 className="w-full border px-3 py-2 rounded mb-2"
//               />
//             ))}

//             <button
//               onClick={() => setMembers([...members, ""])}
//               className="text-sm text-[#82C600]"
//             >
//               + Add Member
//             </button>

//             <div className="flex justify-end gap-3 mt-4">
//               <button onClick={() => setIsTeamModalOpen(false)}>
//                 Cancel
//               </button>

//               <button
//                 onClick={() => {
//                   if (!teamName) return alert("Enter team name ❌");

//                   setIsJoined(true);
//                   setIsTeamModalOpen(false);
//                   alert("🎉 Team Created!");
//                 }}
//                 className="bg-[#82C600] text-white px-4 py-2 rounded"
//               >
//                 Create
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContestParticipatePage;

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ArrowLeft, Users, User } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

const ContestParticipatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  console.log("USER ID:", userId);

  const { contests = [] } = useSelector((state) => state.contest);

  const contest = contests.find(
    (item) => item._id === id || item.id === id
  );

  // ✅ STATES
  const [mode, setMode] = useState("single");
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([""]);
  const [joinCode, setJoinCode] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  // ================= API FUNCTIONS =================

  // ✅ JOIN SOLO
  const joinSoloContest = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const res = await axios.post(
      `https://learn-earn-contest-2.onrender.com/api/v1/participations/contest/${id}/join/solo`,
      {
        user: userId, // ✅ IMPORTANT
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("SUCCESS:", res.data);

    setIsJoined(true);
    alert(res.data?.message || "Joined successfully 🎉");

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Join failed ❌");
  }
};
  // ✅ CREATE TEAM
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

      console.log("TEAM CREATE RESPONSE:", res.data);

      setIsJoined(true);
      setIsTeamModalOpen(false);

      alert(res.data?.message || "🎉 Team Created!");
    } catch (err) {
      console.error(err.response?.data || err.message);

      alert(
        err.response?.data?.message || "❌ Team creation failed"
      );
    }
  };

  // ✅ JOIN TEAM BY CODE
  const joinTeamByCode = async () => {
    try {
      const res = await axios.post(
        `https://learn-earn-contest-2.onrender.com/api/v1/participations/contest/${id}/join/team`,
        {
          joinCode,
          participationType: "team",
        }
      );

      console.log("JOIN TEAM RESPONSE:", res.data);

      setIsJoined(true);

      alert(res.data?.message || "🎉 Joined Team");
    } catch (err) {
      console.error(err.response?.data || err.message);

      alert(
        err.response?.data?.message || "❌ Failed to join team"
      );
    }
  };

  // =================================================

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Contest not found ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

      {/* BACK BUTTON */}
      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-white shadow rounded-xl hover:bg-[#82C600]/10 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border p-6 md:p-10">

        {/* TOP */}
        <div className="flex flex-col md:flex-row gap-6">

          <div className="w-full md:w-1/2 h-56 rounded-2xl overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${contest.image || "/default.jpg"})`,
              }}
            />
          </div>

          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              <span className="bg-[#82C600]/20 text-[#82C600] text-xs px-2 py-1 rounded">
                {contest.category || "Contest"}
              </span>
              <span className="bg-yellow-300 text-black text-xs px-2 py-1 rounded">
                {contest.status || "Live"}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              {contest.title}
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              {contest.description}
            </p>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>📅 Start: {new Date(contest.startDate).toLocaleDateString()}</p>
              <p>⏳ Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
              <p>👥 Participants: {contest.users?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="my-6 border-t" />

        {/* GUIDELINES */}
        <div>
          <h2 className="text-lg font-semibold mb-4">📜 Guidelines</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {(contest.requirements || ["Submit before deadline"]).map((rule, i) => (
              <div
                key={i}
                className="p-4 bg-[#82C600]/5 border border-[#82C600]/20 rounded-xl text-sm"
              >
                ✅ {rule}
              </div>
            ))}
          </div>
        </div>

        <div className="my-6 border-t" />

        {/* PARTICIPATION TYPE */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Choose Participation Type
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setMode("single")}
              className={`p-4 rounded-xl border cursor-pointer ${mode === "single"
                ? "border-[#82C600] bg-[#82C600]/10"
                : "border-gray-200"
                }`}
            >
              <User className="text-[#82C600]" size={18} />
              <p className="font-medium">Single</p>
            </div>

            <div
              onClick={() => setMode("team")}
              className={`p-4 rounded-xl border cursor-pointer ${mode === "team"
                ? "border-[#82C600] bg-[#82C600]/10"
                : "border-gray-200"
                }`}
            >
              <Users className="text-[#82C600]" size={18} />
              <p className="font-medium">Team</p>
            </div>
          </div>

          {/* TEAM ACTION */}
          {mode === "team" && (
            <div className="mt-4 flex flex-col md:flex-row gap-3">

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
                  placeholder="Enter team code"
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
        </div>

        <div className="my-6 border-t" />

        {/* ACTION */}
        <div className="flex justify-between items-center flex-col md:flex-row gap-4">

          <p className="text-sm text-gray-500">
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
            className={`px-6 py-2 rounded-xl ${isJoined
              ? "bg-gray-300"
              : "bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white"
              }`}
          >
            {isJoined ? "✅ Already Joined" : "🚀 Participate Now"}
          </button>

        </div>
      </div>

      {/* TEAM MODAL */}
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