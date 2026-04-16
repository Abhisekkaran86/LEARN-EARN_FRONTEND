// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { ArrowLeft, Download, Users, User } from "lucide-react";
// import API from "../../../services/axios";
// import AlertModal from "@/components/ui/AlertModal";
// import useAlertModal from "@/hooks/useAlertModal";
// import { fetchContests } from "@/features/contest/contestSlice";
// import {
//   getContestBriefingName,
//   getContestBriefingUrl,
// } from "@/utils/contestBriefing";

// const ContestParticipatePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { contests = [], loading: contestsLoading } = useSelector(
//     (state) => state.contest
//   );
//   const currentUserId = useSelector((state) => state.auth.user?._id);
//   const contest = contests.find((item) => item._id === id || item.id === id);

//   const [mode, setMode] = useState("single");
//   const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
//   const [teamName, setTeamName] = useState("");
//   const [teamId, setTeamId] = useState(null);

//   const [users, setUsers] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const [creatingTeam, setCreatingTeam] = useState(false);
//   const [joiningSolo, setJoiningSolo] = useState(false);
//   const [sendingInviteUserId, setSendingInviteUserId] = useState("");
//   const [fetchingUsers, setFetchingUsers] = useState(false);
//   const { alertState, showAlert, closeAlert } = useAlertModal();

//   const contestId = contest?._id || contest?.id || id;
//   const participationType = contest?.participationType || "solo";
//   const allowSolo =
//     participationType === "solo" || participationType === "both";
//   const allowTeam =
//     participationType === "team" || participationType === "both";
//   const briefingUrl = getContestBriefingUrl(contest);
//   const briefingName = getContestBriefingName(contest);

//   useEffect(() => {
//     if (!contest) {
//       dispatch(fetchContests());
//     }
//   }, [contest, dispatch]);

//   useEffect(() => {
//     if (allowTeam && !allowSolo) {
//       setMode("team");
//       return;
//     }

//     if (allowSolo && !allowTeam) {
//       setMode("single");
//     }
//   }, [allowSolo, allowTeam]);

//   if (!contest && (contestsLoading || contests.length === 0)) {
//     return (
//       <>
//         <div className="theme-page-shell flex min-h-screen items-center justify-center px-4 text-center">
//           <p className="theme-text-soft text-sm sm:text-base">
//             Loading contest details...
//           </p>
//         </div>
//         <AlertModal {...alertState} onClose={closeAlert} />
//       </>
//     );
//   }

//   if (!contest) {
//     return (
//       <>
//         <div className="theme-page-shell flex min-h-screen items-center justify-center px-4 text-center">
//           <p className="theme-text-soft text-sm sm:text-base">
//             Contest not found
//           </p>
//         </div>
//         <AlertModal {...alertState} onClose={closeAlert} />
//       </>
//     );
//   }

//   const joinSolo = async () => {
//     try {
//       setJoiningSolo(true);

//       const res = await API.post(
//         `/participation/contest/${contestId}/join/solo`
//       );

//       showAlert({
//         message: res.data?.message || "Joined solo contest successfully.",
//         variant: "success",
//         onClose: () => navigate("/student/my-contests"),
//       });
//     } catch (err) {
//       showAlert({
//         message:
//           err.response?.data?.message || "Unable to join solo contest.",
//         variant: "error",
//       });
//     } finally {
//       setJoiningSolo(false);
//     }
//   };

//   const createTeam = async () => {
//     if (!teamName.trim()) {
//       showAlert({
//         message: "Team name required.",
//         variant: "warning",
//       });
//       return;
//     }

//     try {
//       setCreatingTeam(true);

//       const res = await API.post("/team", {
//         teamName: teamName.trim(),
//         contest: contestId,
//         inviteUserIds: [],
//       });

//       const createdTeamId =
//         res.data?.team?._id || res.data?.teamId || res.data?._id;

//       if (!createdTeamId) {
//         throw new Error("Team created but no team id returned");
//       }

//       setTeamId(createdTeamId);
//       showAlert({
//         message: res.data.message || "Team created successfully.",
//         variant: "success",
//       });
//     } catch (err) {
//       showAlert({
//         message:
//           err.response?.data?.message ||
//           err.message ||
//           "Team creation failed.",
//         variant: "error",
//       });
//     } finally {
//       setCreatingTeam(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       setFetchingUsers(true);

//       const res = await API.get("/auth/users");
//       const students = (res.data.users || []).filter(
//         (u) => u.role === "student" && u._id !== currentUserId
//       );

//       setUsers(students);
//       setShowDropdown(true);
//     } catch (err) {
//       showAlert({
//         message: err.response?.data?.message || "Failed to fetch users.",
//         variant: "error",
//       });
//     } finally {
//       setFetchingUsers(false);
//     }
//   };

//   const handleSelectUser = (user) => {
//     const alreadyExists = members.some((m) => m.userId === user._id);
//     if (alreadyExists) return;

//     setMembers((prev) => [
//       ...prev,
//       {
//         userId: user._id,
//         name: user.name,
//         email: user.email,
//         invited: false,
//         status: "not invited",
//       },
//     ]);
//   };

//   const removeSelectedMember = (userId) => {
//     setMembers((prev) => prev.filter((m) => m.userId !== userId));
//   };

//   const sendInvite = async (member) => {
//     if (!teamId) {
//       showAlert({
//         message: "Create team first.",
//         variant: "warning",
//       });
//       return;
//     }

//     try {
//       setSendingInviteUserId(member.userId);

//       const res = await API.post(`/team/${teamId}/invite`, {
//         userId: member.userId,
//       });

//       setMembers((prev) =>
//         prev.map((m) =>
//           m.userId === member.userId
//             ? { ...m, invited: true, status: "pending" }
//             : m
//         )
//       );

//       showAlert({
//         message: res.data.message || "Invitation created successfully.",
//         variant: "success",
//       });
//     } catch (err) {
//       showAlert({
//         message: err.response?.data?.message || "Invite failed.",
//         variant: "error",
//       });
//     } finally {
//       setSendingInviteUserId("");
//     }
//   };

//   return (
//     <>
//       <div className="theme-page-shell min-h-screen p-4 sm:p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="theme-text-soft mb-6 flex items-center gap-2 hover:text-[var(--theme-text)]"
//       >
//         <ArrowLeft size={18} />
//         Back
//       </button>

//       <div className="theme-surface mx-auto max-w-4xl rounded-2xl p-4 sm:p-6">
//         <h1 className="theme-text break-words text-2xl font-bold">{contest.title}</h1>

//         {briefingUrl ? (
//           <a
//             href={briefingUrl}
//             target="_blank"
//             rel="noreferrer"
//             download
//             className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
//           >
//             <Download size={16} />
//             Download {briefingName}
//           </a>
//         ) : null}

//         <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
//           {allowSolo && (
//             <div
//               onClick={() => setMode("single")}
//               className={`rounded-xl border p-4 cursor-pointer transition ${
//                 mode === "single"
//                   ? "border-green-600 bg-green-50"
//                   : "theme-border"
//               }`}
//             >
//               <div className="theme-text flex items-center gap-2 font-medium">
//                 <User size={18} />
//                 Solo
//               </div>
//             </div>
//           )}

//           {allowTeam && (
//             <div
//               onClick={() => setMode("team")}
//               className={`rounded-xl border p-4 cursor-pointer transition ${
//                 mode === "team"
//                   ? "border-green-600 bg-green-50"
//                   : "theme-border"
//               }`}
//             >
//               <div className="theme-text flex items-center gap-2 font-medium">
//                 <Users size={18} />
//                 Team
//               </div>
//             </div>
//           )}
//         </div>

//         {allowSolo && mode === "single" && (
//           <button
//             onClick={joinSolo}
//             disabled={joiningSolo}
//             className="mt-5 w-full rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:opacity-60 sm:w-auto"
//           >
//             {joiningSolo ? "Joining..." : "Join Solo Contest"}
//           </button>
//         )}

//         {allowTeam && mode === "team" && (
//           <button
//             onClick={() => setIsTeamModalOpen(true)}
//             className="mt-5 w-full rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 sm:w-auto"
//           >
//             Create Team
//           </button>
//         )}
//       </div>

//         {isTeamModalOpen && (
//         <div className="theme-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="theme-modal-panel max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl p-4 sm:p-6">
//             <div className="mb-4 flex items-center justify-between gap-3">
//               <h2 className="theme-text text-lg font-semibold sm:text-xl">
//                 Create Team
//               </h2>
//               <button
//                 onClick={() => setIsTeamModalOpen(false)}
//                 className="theme-icon-button rounded-full p-2"
//               >
//                 x
//               </button>
//             </div>

//             <input
//               value={teamName}
//               onChange={(e) => setTeamName(e.target.value)}
//               placeholder="Enter team name"
//               className="theme-input mb-4 w-full rounded-lg px-3 py-2 outline-none"
//             />

//             {!teamId && (
//               <button
//                 onClick={createTeam}
//                 disabled={creatingTeam}
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-700 disabled:opacity-60"
//               >
//                 {creatingTeam ? "Creating..." : "Create Team First"}
//               </button>
//             )}

//             {teamId && (
//               <>
//                 <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
//                   Team created successfully.
//                 </div>

//                 <button
//                   onClick={fetchUsers}
//                   disabled={fetchingUsers}
//                   className="mb-3 w-full rounded-lg bg-green-50 px-4 py-2 text-left font-medium text-green-700 sm:w-auto"
//                 >
//                   {fetchingUsers ? "Loading users..." : "+ Add Member"}
//                 </button>

//                 {showDropdown && (
//                   <div className="theme-border mb-4 max-h-44 overflow-y-auto rounded-lg border">
//                     {users.length === 0 ? (
//                       <p className="theme-text-soft p-3 text-sm">No users found</p>
//                     ) : (
//                       users.map((u) => (
//                         <div
//                           key={u._id}
//                           onClick={() => handleSelectUser(u)}
//                           className="theme-border cursor-pointer border-b p-3 transition hover:bg-[var(--theme-surface-hover)] last:border-b-0"
//                         >
//                           <p className="theme-text font-medium">{u.name || "Student"}</p>
//                           <p className="theme-text-soft text-sm">{u.email}</p>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}

//                 <div className="space-y-3">
//                   {members.length === 0 ? (
//                     <p className="theme-text-soft text-sm">
//                       No members selected yet.
//                     </p>
//                   ) : (
//                     members.map((m) => (
//                       <div
//                         key={m.userId}
//                         className="theme-surface-muted flex flex-col gap-3 rounded-lg p-3 sm:flex-row sm:items-center sm:justify-between"
//                       >
//                         <div>
//                           <p className="theme-text font-medium">{m.name || m.email}</p>
//                           <p className="theme-text-soft text-sm">{m.email}</p>
//                           <p className="theme-text-muted text-xs">
//                             {m.status === "accepted"
//                               ? "Accepted"
//                               : m.status === "pending"
//                               ? "Pending"
//                               : "Not Invited"}
//                           </p>
//                         </div>

//                         <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
//                           {!m.invited && (
//                             <button
//                               onClick={() => sendInvite(m)}
//                               disabled={sendingInviteUserId === m.userId}
//                               className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-700 disabled:opacity-60"
//                             >
//                               {sendingInviteUserId === m.userId
//                                 ? "Sending..."
//                                 : "Invite"}
//                             </button>
//                           )}

//                           <button
//                             onClick={() => removeSelectedMember(m.userId)}
//                             className="bg-red-50 text-red-600 px-3 py-1.5 text-sm rounded-lg hover:bg-red-100"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         )}
//       </div>

//       <AlertModal {...alertState} onClose={closeAlert} />
//     </>
//   );
// };

// export default ContestParticipatePage;

// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { ArrowLeft, Download, Users, User } from "lucide-react";
// import API from "../../../services/axios";
// import AlertModal from "@/components/ui/AlertModal";
// import useAlertModal from "@/hooks/useAlertModal";
// import { fetchContests } from "@/features/contest/contestSlice";
// import {
//   getContestBriefingName,
//   getContestBriefingUrl,
// } from "@/utils/contestBriefing";

// const ContestParticipatePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { contests = [], loading: contestsLoading } = useSelector(
//     (state) => state.contest
//   );
//   const currentUserId = useSelector((state) => state.auth.user?._id);
//   const contest = contests.find((item) => item._id === id || item.id === id);

//   const [mode, setMode] = useState("single");
//   const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

//   const [teamName, setTeamName] = useState("");
//   const [teamId, setTeamId] = useState(null);

//   // ✅ NEW: solo team name
//   const [soloTeamName, setSoloTeamName] = useState("");

//   const [users, setUsers] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const [creatingTeam, setCreatingTeam] = useState(false);
//   const [joiningSolo, setJoiningSolo] = useState(false);
//   const [sendingInviteUserId, setSendingInviteUserId] = useState("");
//   const [fetchingUsers, setFetchingUsers] = useState(false);

//   const { alertState, showAlert, closeAlert } = useAlertModal();

//   const contestId = contest?._id || contest?.id || id;
//   const participationType = contest?.participationType || "solo";

//   const allowSolo =
//     participationType === "solo" || participationType === "both";
//   const allowTeam =
//     participationType === "team" || participationType === "both";

//   const briefingUrl = getContestBriefingUrl(contest);
//   const briefingName = getContestBriefingName(contest);

//   useEffect(() => {
//     if (!contest) {
//       dispatch(fetchContests());
//     }
//   }, [contest, dispatch]);

//   useEffect(() => {
//     if (allowTeam && !allowSolo) {
//       setMode("team");
//       return;
//     }

//     if (allowSolo && !allowTeam) {
//       setMode("single");
//     }
//   }, [allowSolo, allowTeam]);

//   // =========================
//   // ✅ SOLO JOIN FUNCTION
//   // =========================
//   const joinSolo = async () => {
//     if (!soloTeamName.trim()) {
//       showAlert({
//         message: "Team name is required.",
//         variant: "warning",
//       });
//       return;
//     }

//     try {
//       setJoiningSolo(true);

//       // ✅ ONLY TEAM CREATE (NO JOIN API)
//       const teamRes = await API.post("/team/create", {
//         teamName: soloTeamName.trim(),
//         contest: contestId,
//         teamType: "solo",
//         inviteUserIds: [],
//       });

//       showAlert({
//         message:
//           teamRes.data?.message ||
//           "Joined contest successfully.",
//         variant: "success",
//         onClose: () => navigate("/student/my-contests"),
//       });

//     } catch (err) {
//       showAlert({
//         message:
//           err.response?.data?.message ||
//           err.message ||
//           "Failed to join solo contest.",
//         variant: "error",
//       });
//     } finally {
//       setJoiningSolo(false);
//     }
//   };

//   // =========================
//   // TEAM CREATE
//   // =========================
//   const createTeam = async () => {
//     if (!teamName.trim()) {
//       showAlert({
//         message: "Team name required.",
//         variant: "warning",
//       });
//       return;
//     }

//     try {
//       setCreatingTeam(true);

//       await API.post("/team", {
//         teamName: teamName.trim(),
//         contest: contestId,
//         teamType: "team",
//         inviteUserIds: [],
//       });
//       const createdTeamId =
//         res.data?.team?._id || res.data?.teamId || res.data?._id;

//       setTeamId(createdTeamId);

//       showAlert({
//         message: res.data.message || "Team created successfully.",
//         variant: "success",
//       });
//     } catch (err) {
//       showAlert({
//         message:
//           err.response?.data?.message ||
//           err.message ||
//           "Team creation failed.",
//         variant: "error",
//       });
//     } finally {
//       setCreatingTeam(false);
//     }
//   };

//   // =========================
//   // UI
//   // =========================
//   return (
//     <>
//       <div className="theme-page-shell min-h-screen p-4 sm:p-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="theme-text-soft mb-6 flex items-center gap-2"
//         >
//           <ArrowLeft size={18} />
//           Back
//         </button>

//         <div className="theme-surface mx-auto max-w-4xl rounded-2xl p-6">
//           <h1 className="text-2xl font-bold">{contest?.title}</h1>

//           {/* MODE SELECT */}
//           <div className="mt-6 grid grid-cols-2 gap-4">
//             {allowSolo && (
//               <div
//                 onClick={() => setMode("single")}
//                 className={`p-4 border rounded-xl cursor-pointer ${mode === "single" && "bg-green-50 border-green-600"
//                   }`}
//               >
//                 <User /> Solo
//               </div>
//             )}

//             {allowTeam && (
//               <div
//                 onClick={() => setMode("team")}
//                 className={`p-4 border rounded-xl cursor-pointer ${mode === "team" && "bg-green-50 border-green-600"
//                   }`}
//               >
//                 <Users /> Team
//               </div>
//             )}
//           </div>

//           {/* ================= SOLO ================= */}
//           {allowSolo && mode === "single" && (
//             <div className="mt-5 space-y-3">
//               <input
//                 value={soloTeamName}
//                 onChange={(e) => setSoloTeamName(e.target.value)}
//                 placeholder="Enter your team name"
//                 className="w-full border rounded-lg px-3 py-2"
//               />

//               <button
//                 onClick={joinSolo}
//                 disabled={joiningSolo}
//                 className="bg-green-600 text-white px-5 py-2 rounded-lg"
//               >
//                 {joiningSolo ? "Joining..." : "Join Solo Contest"}
//               </button>
//             </div>
//           )}

//           {/* ================= TEAM ================= */}
//           {allowTeam && mode === "team" && (
//             <button
//               onClick={() => setIsTeamModalOpen(true)}
//               className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg"
//             >
//               Create Team
//             </button>
//           )}
//         </div>
//       </div>

//       <AlertModal {...alertState} onClose={closeAlert} />
//     </>
//   );
// };

// export default ContestParticipatePage;


import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ArrowLeft, Users, User } from "lucide-react";
import API from "../../../services/axios";
import AlertModal from "@/components/ui/AlertModal";
import useAlertModal from "@/hooks/useAlertModal";
import { fetchContests } from "@/features/contest/contestSlice";

const ContestParticipatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { contests = [] } = useSelector((state) => state.contest);
  const contest = contests.find((item) => item._id === id || item.id === id);

  const [mode, setMode] = useState("single");

  const [teamName, setTeamName] = useState("");
  const [soloTeamName, setSoloTeamName] = useState("");
  const [teamId, setTeamId] = useState(null);

  // ✅ USERS STATE
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [sendingInvite, setSendingInvite] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [creatingTeam, setCreatingTeam] = useState(false);
  const [joiningSolo, setJoiningSolo] = useState(false);

  const { alertState, showAlert, closeAlert } = useAlertModal();

  const contestId = contest?._id || contest?.id || id;
  const participationType = contest?.participationType || "solo";

  const allowSolo = ["solo", "both"].includes(participationType);
  const allowTeam = ["team", "both"].includes(participationType);

  // ================= FETCH CONTEST =================
  useEffect(() => {
    if (!contest) dispatch(fetchContests());
  }, [contest, dispatch]);

  // ================= FETCH USERS (ONCE) =================
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoadingUsers(true);

        const res = await API.get("/auth/users");

        // ✅ ONLY STUDENTS
        const students = (res.data?.users || []).filter(
          (u) => u.role === "student"
        );

        setUsers(students);

      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUsers(false);
      }
    };

    getUsers();
  }, []);

  // ================= AUTO MODE =================
  useEffect(() => {
    if (allowTeam && !allowSolo) setMode("team");
    else if (allowSolo && !allowTeam) setMode("single");
  }, [allowSolo, allowTeam]);

  // ================= SOLO JOIN =================
  const joinSolo = async () => {
    if (!soloTeamName.trim()) {
      showAlert({ message: "Team name required", variant: "warning" });
      return;
    }

    try {
      setJoiningSolo(true);

      const res = await API.post("/team/create", {
        teamName: soloTeamName.trim(),
        contest: contestId,
        teamType: "solo",
      });

      showAlert({
        message: res.data?.message || "Joined successfully",
        variant: "success",
        onClose: () => navigate("/student/my-contests"),
      });

    } catch (err) {
      showAlert({
        message: err.response?.data?.message || "Solo join failed",
        variant: "error",
      });
    } finally {
      setJoiningSolo(false);
    }
  };

  // ================= TEAM CREATE =================
  const createTeam = async () => {
    if (!teamName.trim()) {
      showAlert({ message: "Team name required", variant: "warning" });
      return;
    }

    try {
      setCreatingTeam(true);

      const res = await API.post("/team/create", {
        teamName: teamName.trim(),
        contest: contestId,
        teamType: "team",
      });

      setTeamId(res.data?.team?._id);

      showAlert({
        message: "Team created! Invite members now",
        variant: "success",
      });

    } catch (err) {
      showAlert({
        message: err.response?.data?.message || "Team creation failed",
        variant: "error",
      });
    } finally {
      setCreatingTeam(false);
    }
  };

  // ================= SEND INVITE =================
  const sendInvite = async () => {
    if (!selectedUser || !teamId) return;

    try {
      setSendingInvite(true);

      await API.post(`/team/${teamId}/invite`, {
        userId: selectedUser._id,
      });

      showAlert({
        message: "Invite sent successfully",
        variant: "success",
      });

      setSelectedUser(null);

    } catch (err) {
      showAlert({
        message: err.response?.data?.message || "Invite failed",
        variant: "error",
      });
    } finally {
      setSendingInvite(false);
    }
  };

  return (
    <>
      <div className="p-6">
        <button onClick={() => navigate(-1)} className="mb-4 flex gap-2">
          <ArrowLeft size={18} /> Back
        </button>

        <h2 className="text-xl font-bold">{contest?.title}</h2>

        {/* MODE SELECT */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {allowSolo && (
            <div
              onClick={() => setMode("single")}
              className="border p-4 cursor-pointer"
            >
              <User /> Solo
            </div>
          )}
          {allowTeam && (
            <div
              onClick={() => setMode("team")}
              className="border p-4 cursor-pointer"
            >
              <Users /> Team
            </div>
          )}
        </div>

        {/* SOLO */}
        {mode === "single" && allowSolo && (
          <div className="mt-4">
            <input
              value={soloTeamName}
              onChange={(e) => setSoloTeamName(e.target.value)}
              placeholder="Team name"
              className="border p-2 w-full"
            />
            <button
              onClick={joinSolo}
              className="bg-green-600 text-white px-4 py-2 mt-2"
            >
              Join Solo
            </button>
          </div>
        )}

        {/* TEAM */}
        {mode === "team" && allowTeam && (
          <div className="mt-4 space-y-3">

            {!teamId && (
              <>
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Team name"
                  className="border p-2 w-full"
                />
                <button
                  onClick={createTeam}
                  className="bg-green-600 text-white px-4 py-2"
                >
                  Create Team
                </button>
              </>
            )}

            {/* INVITE SECTION */}
            {teamId && (
              <div>

                <input
                  value={selectedUser?.name || ""}
                  onFocus={() => setShowDropdown(true)}
                  readOnly
                  placeholder="Select student"
                  className="border p-2 w-full"
                />

                {showDropdown && (
                  <div className="border max-h-40 overflow-y-auto bg-white mt-1">
                    {loadingUsers ? (
                      <p className="p-2">Loading...</p>
                    ) : users.length === 0 ? (
                      <p className="p-2">No students</p>
                    ) : (
                      users.map((u) => (
                        <div
                          key={u._id}
                          onClick={() => {
                            setSelectedUser(u);
                            setShowDropdown(false);
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {u.name} ({u.email})
                        </div>
                      ))
                    )}
                  </div>
                )}

                <button
                  onClick={sendInvite}
                  className="bg-blue-600 text-white px-4 py-2 mt-2"
                >
                  Send Invite
                </button>

              </div>
            )}

          </div>
        )}
      </div>

      <AlertModal {...alertState} onClose={closeAlert} />
    </>
  );
};

export default ContestParticipatePage;