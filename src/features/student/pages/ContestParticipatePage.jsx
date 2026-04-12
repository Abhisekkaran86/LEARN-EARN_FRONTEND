
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
//   const [participationType, setParticipationType] = useState(null);
//   const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
//   const [teamName, setTeamName] = useState("");
//   const [members, setMembers] = useState([]);
//   const [isJoined, setIsJoined] = useState(false);

//   // ✅ NEW STATES (added only)
//   const [users, setUsers] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [loadingUsers, setLoadingUsers] = useState(false);

//   // ================= GET MY PARTICIPATION =================
//   useEffect(() => {
//     const fetchMyParticipation = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           "https://learn-earn-contest-3.onrender.com/api/v1/participations/my-participations",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const found = res.data.participations.find(
//           (p) => p.contest?._id === id
//         );

//         if (found) {
//           setIsJoined(true);
//           setParticipationType(found.participationType);
//           setMode(found.participationType);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMyParticipation();
//   }, [id]);

//   // ================= FETCH USERS =================
//   const fetchUsers = async () => {
//     try {
//       setLoadingUsers(true);

//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "https://learn-earn-contest-3.onrender.com/api/v1/auth/users",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // ✅ only students
//       const students = res.data.users.filter(
//         (u) => u.role === "student"
//       );

//       setUsers(students);
//       setShowDropdown(true);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingUsers(false);
//     }
//   };

//   // ================= SELECT MEMBER =================
//   const handleSelectUser = (user) => {
//     if (members.includes(user.email)) return;

//     setMembers((prev) => [...prev, user.email]);
//     setShowDropdown(false);
//   };

//   // ================= JOIN SOLO =================
//   const joinSoloContest = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         `https://learn-earn-contest-3.onrender.com/api/v1/participations/contest/${id}/join/solo`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Joined Solo 🎉");
//       window.location.reload();
//     } catch (err) {
//       alert("Join failed ❌");
//     }
//   };

//   // ================= CREATE TEAM =================
//   const createTeam = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         `https://learn-earn-contest-3.onrender.com/api/v1/participations/contest/${id}/join/team`,
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

//         {/* PARTICIPATION TYPE */}
//         {!isJoined && (
//           <div className="mt-6 grid grid-cols-2 gap-4">

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

//         {/* TEAM CREATE */}
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

//         {/* ACTION */}
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

//             {/* ADD MEMBER BUTTON */}
//             <button
//               onClick={fetchUsers}
//               className="text-green-600 text-sm mb-2"
//             >
//               + Add Member
//             </button>

//             {/* DROPDOWN */}
//             {showDropdown && (
//               <div className="border rounded-xl max-h-40 overflow-y-auto mb-3">

//                 {loadingUsers ? (
//                   <p className="p-2 text-gray-400">Loading...</p>
//                 ) : (
//                   users.map((user) => (
//                     <div
//                       key={user._id}
//                       onClick={() => handleSelectUser(user)}
//                       className="p-2 hover:bg-green-50 cursor-pointer"
//                     >
//                       <p className="text-sm font-medium">{user.name}</p>
//                       <p className="text-xs text-gray-500">
//                         {user.email}
//                       </p>
//                     </div>
//                   ))
//                 )}

//               </div>
//             )}

//             {/* SELECTED MEMBERS */}
//             {members.map((m, i) => (
//               <div
//                 key={i}
//                 className="flex justify-between items-center bg-green-50 px-3 py-2 rounded mb-2"
//               >
//                 <span className="text-sm">{m}</span>
//                 <button
//                   onClick={() =>
//                     setMembers((prev) =>
//                       prev.filter((x) => x !== m)
//                     )
//                   }
//                   className="text-red-500 text-xs"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}

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

// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { ArrowLeft, Users, User } from "lucide-react";
// import API from "../../../services/axios";

// const ContestParticipatePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { contests = [] } = useSelector((state) => state.contest);

//   const contest = contests.find(
//     (item) => item._id === id || item.id === id
//   );

//   // ================= STATES =================
//   const [mode, setMode] = useState("single");
//   const [participationType, setParticipationType] = useState(null);
//   const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
//   const [teamName, setTeamName] = useState("");
//   const [members, setMembers] = useState([]); // { email, invited }
//   const [teamId, setTeamId] = useState(null); // ✅ NEW
//   const [isJoined, setIsJoined] = useState(false);

//   const [users, setUsers] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [loadingUsers, setLoadingUsers] = useState(false);

//   // ================= FETCH PARTICIPATION =================
//   useEffect(() => {
//     const fetchMyParticipation = async () => {
//       try {
//         const res = await API.get("/participations/my-participations");

//         const found = res.data.participations.find(
//           (p) => p.contest?._id === id
//         );

//         if (found) {
//           setIsJoined(true);
//           setParticipationType(found.participationType);
//           setMode(found.participationType);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMyParticipation();
//   }, [id]);

//   // ================= FETCH USERS =================
//   const fetchUsers = async () => {
//     try {
//       setLoadingUsers(true);
//       const res = await API.get("/auth/users");

//       const students = res.data.users.filter(
//         (u) => u.role === "student"
//       );

//       setUsers(students);
//       setShowDropdown(true);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingUsers(false);
//     }
//   };

//   // ================= CREATE TEAM =================
//   const createTeam = async () => {
//   try {
//     const res = await API.post(
//       `/team`,
//       {
//         teamName: teamName,                 // ✅ correct
//         contest: id,                        // ✅ FIXED (not contestId)
//         inviteEmails: members.map(m => m.email) // ✅ optional but supported
//       }
//     );

//     const createdTeamId =
//       res.data?.team?._id || res.data?.teamId;

//     setTeamId(createdTeamId);

//     alert("Team Created 🎉");
//   } catch (err) {
//     alert(err.response?.data?.message || "Team creation failed ❌");
//   }
// };
//   // ================= INVITE =================
//   const sendInvite = async (email) => {
//     if (!teamId) {
//       return alert("Create team first ⚠️");
//     }

//     try {
//       await API.post(`/team/${teamId}/invite`, {
//         email,
//       });

//       alert(`Invitation sent to ${email}`);

//       setMembers((prev) =>
//         prev.map((m) =>
//           m.email === email ? { ...m, invited: true } : m
//         )
//       );
//     } catch (err) {
//       alert("Invite failed ❌");
//     }
//   };

//   // ================= SELECT MEMBER =================
//   const handleSelectUser = (user) => {
//     if (members.some((m) => m.email === user.email)) return;

//     setMembers((prev) => [
//       ...prev,
//       { email: user.email, invited: false },
//     ]);

//     setShowDropdown(false);
//   };

//   // ================= JOIN SOLO =================
//   const joinSoloContest = async () => {
//     try {
//       await API.post(
//         `/participations/contest/${id}/join/solo`
//       );

//       alert("Joined Solo 🎉");
//       window.location.reload();
//     } catch {
//       alert("Join failed ❌");
//     }
//   };

//   if (!contest) {
//     return <div className="text-center mt-20">Contest not found</div>;
//   }

  

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-white to-green-50">

//       <button onClick={() => navigate(-1)} className="mb-6 flex gap-2">
//         <ArrowLeft /> Back
//       </button>

//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">

//         <h1 className="text-xl font-bold">{contest.title}</h1>
//         <p className="text-gray-500 mt-2">{contest.description}</p>

//         {!isJoined && (
//           <div className="mt-6 grid grid-cols-2 gap-4">

//             <div
//               onClick={() => setMode("single")}
//               className={`p-4 border rounded-xl cursor-pointer ${
//                 mode === "single" ? "bg-green-100 border-green-500" : ""
//               }`}
//             >
//               <User />
//               <p>Solo</p>
//             </div>

//             <div
//               onClick={() => setMode("team")}
//               className={`p-4 border rounded-xl cursor-pointer ${
//                 mode === "team" ? "bg-green-100 border-green-500" : ""
//               }`}
//             >
//               <Users />
//               <p>Team</p>
//             </div>

//           </div>
//         )}

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

//         {!isJoined && mode === "single" && (
//           <button
//             onClick={joinSoloContest}
//             className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
//           >
//             Join Solo
//           </button>
//         )}
//       </div>

//       {/* ================= MODAL ================= */}
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

//             {/* CREATE TEAM FIRST */}
//             {!teamId && (
//               <button
//                 onClick={createTeam}
//                 className="bg-green-600 text-white px-4 py-2 rounded mb-3"
//               >
//                 Create Team First
//               </button>
//             )}

//             {/* ADD MEMBER */}
//             {teamId && (
//               <>
//                 <button
//                   onClick={fetchUsers}
//                   className="text-green-600 text-sm mb-2"
//                 >
//                   + Add Member
//                 </button>

//                 {showDropdown && (
//                   <div className="border rounded-xl max-h-40 overflow-y-auto mb-3">
//                     {users.map((user) => (
//                       <div
//                         key={user._id}
//                         onClick={() => handleSelectUser(user)}
//                         className="p-2 hover:bg-green-50 cursor-pointer"
//                       >
//                         <p>{user.name}</p>
//                         <p className="text-xs">{user.email}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {members.map((m, i) => (
//                   <div key={i} className="flex justify-between mb-2">
//                     <span>{m.email}</span>

//                     <div className="flex gap-2">
//                       {!m.invited && (
//                         <button
//                           onClick={() => sendInvite(m.email)}
//                           className="text-blue-600 text-xs"
//                         >
//                           Invite
//                         </button>
//                       )}

//                       {m.invited && (
//                         <span className="text-green-600 text-xs">
//                           Invited
//                         </span>
//                       )}

//                       <button
//                         onClick={() =>
//                           setMembers((prev) =>
//                             prev.filter((_, idx) => idx !== i)
//                           )
//                         }
//                         className="text-red-500 text-xs"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </>
//             )}

//             <div className="flex justify-end mt-4">
//               <button onClick={() => setIsTeamModalOpen(false)}>
//                 Close
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
// import API from "../../../services/axios";


// const ContestParticipatePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { contests = [] } = useSelector((state) => state.contest);

//   const contest = contests.find(
//     (item) => item._id === id || item.id === id
//   );

//   // ================= STATES =================
//   const [mode, setMode] = useState("single");
//   const [participationType, setParticipationType] = useState(null);
//   const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
//   const [teamName, setTeamName] = useState("");
//   const [members, setMembers] = useState([]); 
//   const [teamId, setTeamId] = useState(null);
//   const [isJoined, setIsJoined] = useState(false);

//   const [users, setUsers] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [loadingUsers, setLoadingUsers] = useState(false);

 
//   // ================= FETCH PARTICIPATION =================
//   useEffect(() => {
//     const fetchMyParticipation = async () => {
//       try {
//         const res = await API.get("/participations/my-participations");

//         const found = res.data.participations.find(
//           (p) => p.contest?._id === id
//         );

//         if (found) {
//           setIsJoined(true);
//           setParticipationType(found.participationType);
//           setMode(found.participationType);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMyParticipation();
//   }, [id]);

//   // ================= FETCH USERS =================
//   const fetchUsers = async () => {
//     try {
//       setLoadingUsers(true);
//       const res = await API.get("/auth/users");

//       const students = res.data.users.filter(
//         (u) => u.role === "student"
//       );

//       setUsers(students);
//       setShowDropdown(true);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingUsers(false);
//     }
//   };

//   // ================= CREATE TEAM =================
//   const createTeam = async () => {
//     try {
//       const res = await API.post(`/team`, {
//         teamName,
//         contest: id,
//         inviteEmails: members.map(m => m.email)
//       });

//       const createdTeamId =
//         res.data?.team?._id || res.data?.teamId;

//       setTeamId(createdTeamId);

//       alert("Team Created 🎉");
//     } catch (err) {
//       alert(err.response?.data?.message || "Team creation failed ❌");
//     }
//   };

//   // ================= INVITE =================
//  const sendInvite = async (email) => {
//   if (!teamId) {
//     return alert("Create team first ⚠️");
//   }

//   try {
//     const res = await API.post(`/team/${teamId}/invite`, {
//       email,
//     });

//     alert(res.data.message || "Invite sent");

//     setMembers((prev) =>
//       prev.map((m) =>
//         m.email === email ? { ...m, invited: true } : m
//       )
//     );
//   } catch (err) {
//     alert(err.response?.data?.message || "Invite failed ❌");
//   }
// };

//   // ================= SELECT MEMBER =================
//   const handleSelectUser = (user) => {
//     if (members.some((m) => m.email === user.email)) return;

//     setMembers((prev) => [
//       ...prev,
//       { email: user.email, invited: false },
//     ]);

//     setShowDropdown(false);
//   };

//   // ================= JOIN SOLO =================
//   const joinSoloContest = async () => {
//     try {
//       await API.post(
//         `/participations/contest/${id}/join/solo`
//       );

//       alert("Joined Solo 🎉");
//       window.location.reload();
//     } catch {
//       alert("Join failed ❌");
//     }
//   };

//   if (!contest) {
//     return <div className="text-center mt-20">Contest not found</div>;
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-white to-green-50">

//       <button onClick={() => navigate(-1)} className="mb-6 flex gap-2">
//         <ArrowLeft /> Back
//       </button>

//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">

//         <h1 className="text-xl font-bold">{contest.title}</h1>
//         <p className="text-gray-500 mt-2">{contest.description}</p>

//         {!isJoined && (
//           <div className="mt-6 grid grid-cols-2 gap-4">

//             <div
//               onClick={() => setMode("single")}
//               className={`p-4 border rounded-xl cursor-pointer ${
//                 mode === "single" ? "bg-green-100 border-green-500" : ""
//               }`}
//             >
//               <User />
//               <p>Solo</p>
//             </div>

//             <div
//               onClick={() => setMode("team")}
//               className={`p-4 border rounded-xl cursor-pointer ${
//                 mode === "team" ? "bg-green-100 border-green-500" : ""
//               }`}
//             >
//               <Users />
//               <p>Team</p>
//             </div>

//           </div>
//         )}

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

//         {!isJoined && mode === "single" && (
//           <button
//             onClick={joinSoloContest}
//             className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
//           >
//             Join Solo
//           </button>
//         )}
//       </div>

//       {/* MODAL SAME (NO UI CHANGE) */}
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

//             {!teamId && (
//               <button
//                 onClick={createTeam}
//                 className="bg-green-600 text-white px-4 py-2 rounded mb-3"
//               >
//                 Create Team First
//               </button>
//             )}

//             {teamId && (
//               <>
//                 <button
//                   onClick={fetchUsers}
//                   className="text-green-600 text-sm mb-2"
//                 >
//                   + Add Member
//                 </button>

//                 {showDropdown && (
//                   <div className="border rounded-xl max-h-40 overflow-y-auto mb-3">
//                     {users.map((user) => (
//                       <div
//                         key={user._id}
//                         onClick={() => handleSelectUser(user)}
//                         className="p-2 hover:bg-green-50 cursor-pointer"
//                       >
//                         <p>{user.name}</p>
//                         <p className="text-xs">{user.email}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {members.map((m, i) => (
//                   <div key={i} className="flex justify-between mb-2">
//                     <span>{m.email}</span>

//                     <div className="flex gap-2">
//                       {!m.invited && (
//                         <button
//                           onClick={() => sendInvite(m.email)}
//                           className="text-blue-600 text-xs"
//                         >
//                           Invite
//                         </button>
//                       )}

//                       {m.invited && (
//                         <span className="text-green-600 text-xs">
//                           Invited
//                         </span>
//                       )}

//                       <button
//                         onClick={() =>
//                           setMembers((prev) =>
//                             prev.filter((_, idx) => idx !== i)
//                           )
//                         }
//                         className="text-red-500 text-xs"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </>
//             )}

//             <div className="flex justify-end mt-4">
//               <button onClick={() => setIsTeamModalOpen(false)}>
//                 Close
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
import API from "../../../services/axios";

const ContestParticipatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { contests = [] } = useSelector((state) => state.contest);

  const contest = contests.find((item) => item._id === id || item.id === id);

  const [mode, setMode] = useState("single");
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState(null);

  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [creatingTeam, setCreatingTeam] = useState(false);
  const [sendingInviteEmail, setSendingInviteEmail] = useState("");
  const [fetchingUsers, setFetchingUsers] = useState(false);

  if (!contest) {
    return <div className="text-center mt-20">Contest not found</div>;
  }

  const createTeam = async () => {
    if (!teamName.trim()) {
      return alert("Team name required");
    }

    try {
      setCreatingTeam(true);

      const res = await API.post("/team", {
        teamName: teamName.trim(),
        contest: id,
        inviteEmails: [],
      });

      setTeamId(res.data.team._id);
      alert(res.data.message || "Team created successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Team creation failed");
    } finally {
      setCreatingTeam(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setFetchingUsers(true);

      const res = await API.get("/auth/users");
      const students = (res.data.users || []).filter(
        (u) => u.role === "student"
      );

      setUsers(students);
      setShowDropdown(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setFetchingUsers(false);
    }
  };

  const handleSelectUser = (user) => {
    const alreadyExists = members.some((m) => m.email === user.email);
    if (alreadyExists) return;

    setMembers((prev) => [
      ...prev,
      {
        email: user.email,
        invited: false,
        status: "not invited",
      },
    ]);
  };

  const removeSelectedMember = (email) => {
    setMembers((prev) => prev.filter((m) => m.email !== email));
  };

  const sendInvite = async (email) => {
    if (!teamId) {
      return alert("Create team first");
    }

    try {
      setSendingInviteEmail(email);

      const res = await API.post(`/team/${teamId}/invite`, { email });

      setMembers((prev) =>
        prev.map((m) =>
          m.email === email
            ? { ...m, invited: true, status: "pending" }
            : m
        )
      );

      alert(res.data.message || "Invitation sent successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Invite failed");
    } finally {
      setSendingInviteEmail("");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-green-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-black"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-gray-800">{contest.title}</h1>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setMode("single")}
            className={`p-4 border rounded-xl cursor-pointer transition ${
              mode === "single"
                ? "border-green-600 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 font-medium">
              <User size={18} />
              Solo
            </div>
          </div>

          <div
            onClick={() => setMode("team")}
            className={`p-4 border rounded-xl cursor-pointer transition ${
              mode === "team"
                ? "border-green-600 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 font-medium">
              <Users size={18} />
              Team
            </div>
          </div>
        </div>

        {mode === "team" && (
          <button
            onClick={() => setIsTeamModalOpen(true)}
            className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Create Team
          </button>
        )}
      </div>

      {isTeamModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-xl">Create Team</h2>
              <button
                onClick={() => setIsTeamModalOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              className="w-full border px-3 py-2 rounded-lg mb-4 outline-none"
            />

            {!teamId && (
              <button
                onClick={createTeam}
                disabled={creatingTeam}
                className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-700 disabled:opacity-60"
              >
                {creatingTeam ? "Creating..." : "Create Team First"}
              </button>
            )}

            {teamId && (
              <>
                <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
                  Team created successfully.
                </div>

                <button
                  onClick={fetchUsers}
                  disabled={fetchingUsers}
                  className="text-green-700 font-medium mb-3"
                >
                  {fetchingUsers ? "Loading users..." : "+ Add Member"}
                </button>

                {showDropdown && (
                  <div className="border rounded-lg max-h-44 overflow-y-auto mb-4">
                    {users.length === 0 ? (
                      <p className="p-3 text-sm text-gray-500">No users found</p>
                    ) : (
                      users.map((u) => (
                        <div
                          key={u._id}
                          onClick={() => handleSelectUser(u)}
                          className="p-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                        >
                          <p className="font-medium">{u.name || "Student"}</p>
                          <p className="text-sm text-gray-500">{u.email}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  {members.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No members selected yet.
                    </p>
                  ) : (
                    members.map((m) => (
                      <div
                        key={m.email}
                        className="flex justify-between items-center border p-3 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{m.email}</p>
                          <p className="text-xs text-gray-500">
                            {m.status === "accepted"
                              ? "Accepted"
                              : m.status === "pending"
                              ? "Pending"
                              : "Not Invited"}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {!m.invited && (
                            <button
                              onClick={() => sendInvite(m.email)}
                              disabled={sendingInviteEmail === m.email}
                              className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-700 disabled:opacity-60"
                            >
                              {sendingInviteEmail === m.email
                                ? "Sending..."
                                : "Invite"}
                            </button>
                          )}

                          <button
                            onClick={() => removeSelectedMember(m.email)}
                            className="bg-red-50 text-red-600 px-3 py-1.5 text-sm rounded-lg hover:bg-red-100"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestParticipatePage;