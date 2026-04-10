

// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { ArrowLeft, Users, User } from "lucide-react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const ContestParticipatePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const userId = Cookies.get("userId");

//   const { contests = [] } = useSelector((state) => state.contest);

//   const contest = contests.find(
//     (item) => item._id === id || item.id === id
//   );

//   // ✅ STATES (UNCHANGED)
//   const [mode, setMode] = useState("single");
//   const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
//   const [teamName, setTeamName] = useState("");
//   const [members, setMembers] = useState([""]);
//   const [joinCode, setJoinCode] = useState("");
//   const [isJoined, setIsJoined] = useState(false);

//   // ================= API FUNCTIONS =================

//   const joinSoloContest = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");

//       const res = await axios.post(
//         `https://learn-earn-contest-2.onrender.com/api/v1/participations/contest/${id}/join/solo`,
//         { user: userId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setIsJoined(true);
//       alert(res.data?.message || "Joined successfully 🎉");
//     } catch (err) {
//       alert(err.response?.data?.message || "Join failed ❌");
//     }
//   };

//   const createTeam = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");

//       const res = await axios.post(
//         `https://learn-earn-contest-2.onrender.com/api/v1/participations/contest/${id}/join/team`,
//         {
//           teamName,
//           members,
//           participationType: "team",
//           user: userId, // ✅ important
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ important
//           },
//         }
//       );

//       setIsJoined(true);
//       setIsTeamModalOpen(false);
//       alert(res.data?.message || "🎉 Team Created!");
//     } catch (err) {
//       alert(err.response?.data?.message || "❌ Team creation failed");
//     }
//   };
  
//   // =================================================

//   if (!contest) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Contest not found ❌
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#ecfdf5] p-6">

//       {/* BACK BUTTON */}
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

//           <div className="w-full md:w-1/2 h-56 rounded-2xl overflow-hidden">
//             <div
//               className="w-full h-full bg-cover bg-center"
//               style={{
//                 backgroundImage: `url(${contest.image || "/default.jpg"})`,
//               }}
//             />
//           </div>

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

//         <div className="my-6 border-t" />

//         {/* GUIDELINES */}
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

//         <div className="my-6 border-t" />

//         {/* PARTICIPATION TYPE */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">
//             Choose Participation Type
//           </h2>

//           <div className="grid grid-cols-2 gap-4">
//             <div
//               onClick={() => setMode("single")}
//               className={`p-4 rounded-xl border cursor-pointer ${mode === "single"
//                   ? "border-[#82C600] bg-[#82C600]/10"
//                   : "border-gray-200"
//                 }`}
//             >
//               <User className="text-[#82C600]" size={18} />
//               <p className="font-medium">Single</p>
//             </div>

//             <div
//               onClick={() => setMode("team")}
//               className={`p-4 rounded-xl border cursor-pointer ${mode === "team"
//                   ? "border-[#82C600] bg-[#82C600]/10"
//                   : "border-gray-200"
//                 }`}
//             >
//               <Users className="text-[#82C600]" size={18} />
//               <p className="font-medium">Team</p>
//             </div>
//           </div>

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
//                     joinTeamByCode();
//                   }}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   Join
//                 </button>
//               </div>

//             </div>
//           )}
//         </div>

//         <div className="my-6 border-t" />

//         {/* ACTION */}
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

//               joinSoloContest();
//             }}
//             disabled={isJoined}
//             className={`px-6 py-2 rounded-xl ${isJoined
//                 ? "bg-gray-300"
//                 : "bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white"
//               }`}
//           >
//             {isJoined ? "✅ Already Joined" : "🚀 Participate Now"}
//           </button>

//         </div>
//       </div>

//       {/* ================= RELATED CONTESTS ================= */}
//       <div className="max-w-6xl mx-auto mt-12">

//         <h2 className="text-xl font-semibold mb-6 text-gray-800">
//           🔥 Related Contests
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {contests
//             .filter((c) => c._id !== contest._id)
//             .slice(0, 3)
//             .map((item) => (
//               <div
//                 key={item._id}
//                 onClick={() => navigate(`/contest/${item._id}`)}
//                 className="group cursor-pointer bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
//               >

//                 <div className="relative h-36 overflow-hidden">
//                   <img
//                     src={item.image || "/default.jpg"}
//                     className="w-full h-full object-cover group-hover:scale-110 transition"
//                   />
//                   <span className="absolute top-2 right-2 text-xs bg-yellow-300 px-2 py-1 rounded-full">
//                     {item.status || "Live"}
//                   </span>
//                 </div>

//                 <div className="p-4">
//                   <h3 className="text-sm font-semibold line-clamp-2">
//                     {item.title}
//                   </h3>

//                   <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                     {item.description}
//                   </p>

//                   <div className="mt-2 text-xs text-[#82C600]">
//                     View →
//                   </div>
//                 </div>

//               </div>
//             ))}

//         </div>
//       </div>

//       {/* TEAM MODAL (UNCHANGED) */}
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
//                   createTeam();
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


// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { ArrowLeft, Users, User } from "lucide-react";
// import axios from "axios";

// const ContestParticipatePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { contests = [] } = useSelector((state) => state.contest);

//   const contest = contests.find(
//     (item) => item._id === id || item.id === id
//   );

//   // ================= STATES =================
//   const [mode, setMode] = useState("single");
//   const [participationType, setParticipationType] = useState(null); // 🔥 NEW
//   const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
//   const [teamName, setTeamName] = useState("");
//   const [members, setMembers] = useState([]); // ❌ removed default member
//   const [isJoined, setIsJoined] = useState(false);

//   // ================= GET MY PARTICIPATION =================
//   useEffect(() => {
//     const fetchMyParticipation = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/participations/my-participations",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const found = res.data.participations.find(
//           (p) => p.contest?._id === id
//         );

//         if (found) {
//           setIsJoined(true);
//           setParticipationType(found.participationType); // "solo" or "team"
//           setMode(found.participationType);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMyParticipation();
//   }, [id]);

//   // ================= API =================

//   const joinSoloContest = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         `https://learn-earn-contest-2.onrender.com/api/v1/participations/contest/${id}/join/solo`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Joined Solo 🎉");
//       window.location.reload();
//     } catch (err) {
//       alert("Join failed ❌");
//     }
//   };

//   const createTeam = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         `https://learn-earn-contest-2.onrender.com/api/v1/participations/contest/${id}/join/team`,
//         {
//           teamName,
//           members,
//           participationType: "team",
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Team Created 🎉");
//       window.location.reload();
//     } catch (err) {
//       alert("Team creation failed ❌");
//     }
//   };

//   if (!contest) {
//     return <div className="text-center mt-20">Contest not found</div>;
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-white to-green-50">

//       {/* BACK */}
//       <button onClick={() => navigate(-1)} className="mb-6 flex gap-2">
//         <ArrowLeft /> Back
//       </button>

//       {/* CARD */}
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">

//         <h1 className="text-xl font-bold">{contest.title}</h1>
//         <p className="text-gray-500 mt-2">{contest.description}</p>

//         {/* ================= PARTICIPATION TYPE ================= */}

//         {!isJoined && (
//           <div className="mt-6 grid grid-cols-2 gap-4">

//             {/* SOLO */}
//             {(participationType === null || participationType === "single") && (
//               <div
//                 onClick={() => setMode("single")}
//                 className={`p-4 border rounded-xl cursor-pointer ${
//                   mode === "single" ? "bg-green-100 border-green-500" : ""
//                 }`}
//               >
//                 <User />
//                 <p>Solo</p>
//               </div>
//             )}

//             {/* TEAM */}
//             {(participationType === null || participationType === "team") && (
//               <div
//                 onClick={() => setMode("team")}
//                 className={`p-4 border rounded-xl cursor-pointer ${
//                   mode === "team" ? "bg-green-100 border-green-500" : ""
//                 }`}
//               >
//                 <Users />
//                 <p>Team</p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ================= TEAM CREATE ================= */}

//         {!isJoined && mode === "team" && (
//           <div className="mt-4">
//             <button
//               onClick={() => setIsTeamModalOpen(true)}
//               className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Create Team
//             </button>
//           </div>
//         )}

//         {/* ================= ACTION ================= */}

//         {!isJoined && mode === "single" && (
//           <button
//             onClick={joinSoloContest}
//             className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
//           >
//             Join Solo
//           </button>
//         )}

//         {isJoined && (
//           <div className="mt-6 text-green-600 font-semibold">
//             ✅ Already Joined ({participationType})
//           </div>
//         )}
//       </div>

//       {/* ================= TEAM MODAL ================= */}

//       {isTeamModalOpen && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

//           <div className="bg-white p-6 rounded-xl w-[400px]">

//             <h2 className="font-semibold mb-3">Create Team</h2>

//             <input
//               value={teamName}
//               onChange={(e) => setTeamName(e.target.value)}
//               placeholder="Team Name"
//               className="w-full border px-3 py-2 rounded mb-3"
//             />

//             {/* MEMBERS */}
//             {members.map((m, i) => (
//               <input
//                 key={i}
//                 value={m}
//                 onChange={(e) => {
//                   const arr = [...members];
//                   arr[i] = e.target.value;
//                   setMembers(arr);
//                 }}
//                 placeholder="Enter email id"
//                 className="w-full border px-3 py-2 rounded mb-2"
//               />
//             ))}

//             <button
//               onClick={() => setMembers([...members, ""])}
//               className="text-green-600 text-sm"
//             >
//               + Add Member
//             </button>

//             <div className="flex justify-end gap-3 mt-4">
//               <button onClick={() => setIsTeamModalOpen(false)}>
//                 Cancel
//               </button>

//               <button
//                 onClick={() => {
//                   if (!teamName) return alert("Enter team name");
//                   createTeam();
//                 }}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
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
import { useState, useEffect } from "react";
import { ArrowLeft, Users, User } from "lucide-react";
import axios from "axios";

const ContestParticipatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { contests = [] } = useSelector((state) => state.contest);

  const contest = contests.find(
    (item) => item._id === id || item.id === id
  );

  // ================= STATES =================
  const [mode, setMode] = useState("single");
  const [participationType, setParticipationType] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  // ✅ NEW STATES (added only)
  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // ================= GET MY PARTICIPATION =================
  useEffect(() => {
    const fetchMyParticipation = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://learn-earn-contest-3.onrender.com/api/v1/participations/my-participations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const found = res.data.participations.find(
          (p) => p.contest?._id === id
        );

        if (found) {
          setIsJoined(true);
          setParticipationType(found.participationType);
          setMode(found.participationType);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyParticipation();
  }, [id]);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://learn-earn-contest-3.onrender.com/api/v1/auth/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ only students
      const students = res.data.users.filter(
        (u) => u.role === "student"
      );

      setUsers(students);
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // ================= SELECT MEMBER =================
  const handleSelectUser = (user) => {
    if (members.includes(user.email)) return;

    setMembers((prev) => [...prev, user.email]);
    setShowDropdown(false);
  };

  // ================= JOIN SOLO =================
  const joinSoloContest = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `https://learn-earn-contest-3.onrender.com/api/v1/participations/contest/${id}/join/solo`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Joined Solo 🎉");
      window.location.reload();
    } catch (err) {
      alert("Join failed ❌");
    }
  };

  // ================= CREATE TEAM =================
  const createTeam = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `https://learn-earn-contest-3.onrender.com/api/v1/participations/contest/${id}/join/team`,
        {
          teamName,
          members,
          participationType: "team",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Team Created 🎉");
      window.location.reload();
    } catch (err) {
      alert("Team creation failed ❌");
    }
  };

  if (!contest) {
    return <div className="text-center mt-20">Contest not found</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-green-50">

      {/* BACK */}
      <button onClick={() => navigate(-1)} className="mb-6 flex gap-2">
        <ArrowLeft /> Back
      </button>

      {/* CARD */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">

        <h1 className="text-xl font-bold">{contest.title}</h1>
        <p className="text-gray-500 mt-2">{contest.description}</p>

        {/* PARTICIPATION TYPE */}
        {!isJoined && (
          <div className="mt-6 grid grid-cols-2 gap-4">

            {(participationType === null || participationType === "single") && (
              <div
                onClick={() => setMode("single")}
                className={`p-4 border rounded-xl cursor-pointer ${
                  mode === "single" ? "bg-green-100 border-green-500" : ""
                }`}
              >
                <User />
                <p>Solo</p>
              </div>
            )}

            {(participationType === null || participationType === "team") && (
              <div
                onClick={() => setMode("team")}
                className={`p-4 border rounded-xl cursor-pointer ${
                  mode === "team" ? "bg-green-100 border-green-500" : ""
                }`}
              >
                <Users />
                <p>Team</p>
              </div>
            )}

          </div>
        )}

        {/* TEAM CREATE */}
        {!isJoined && mode === "team" && (
          <div className="mt-4">
            <button
              onClick={() => setIsTeamModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create Team
            </button>
          </div>
        )}

        {/* ACTION */}
        {!isJoined && mode === "single" && (
          <button
            onClick={joinSoloContest}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
          >
            Join Solo
          </button>
        )}

        {isJoined && (
          <div className="mt-6 text-green-600 font-semibold">
            ✅ Already Joined ({participationType})
          </div>
        )}
      </div>

      {/* ================= TEAM MODAL ================= */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="font-semibold mb-3">Create Team</h2>

            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
              className="w-full border px-3 py-2 rounded mb-3"
            />

            {/* ADD MEMBER BUTTON */}
            <button
              onClick={fetchUsers}
              className="text-green-600 text-sm mb-2"
            >
              + Add Member
            </button>

            {/* DROPDOWN */}
            {showDropdown && (
              <div className="border rounded-xl max-h-40 overflow-y-auto mb-3">

                {loadingUsers ? (
                  <p className="p-2 text-gray-400">Loading...</p>
                ) : (
                  users.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => handleSelectUser(user)}
                      className="p-2 hover:bg-green-50 cursor-pointer"
                    >
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  ))
                )}

              </div>
            )}

            {/* SELECTED MEMBERS */}
            {members.map((m, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-green-50 px-3 py-2 rounded mb-2"
              >
                <span className="text-sm">{m}</span>
                <button
                  onClick={() =>
                    setMembers((prev) =>
                      prev.filter((x) => x !== m)
                    )
                  }
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setIsTeamModalOpen(false)}>
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!teamName) return alert("Enter team name");
                  createTeam();
                }}
                className="bg-green-600 text-white px-4 py-2 rounded"
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