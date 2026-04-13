import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ArrowLeft, Users, User } from "lucide-react";
import API from "../../../services/axios";
import AlertModal from "@/components/ui/AlertModal";
import useAlertModal from "@/hooks/useAlertModal";

const ContestParticipatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { contests = [] } = useSelector((state) => state.contest);
  const currentUserId = useSelector((state) => state.auth.user?._id);
  const contest = contests.find((item) => item._id === id || item.id === id);

  const [mode, setMode] = useState("single");
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState(null);

  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [creatingTeam, setCreatingTeam] = useState(false);
  const [joiningSolo, setJoiningSolo] = useState(false);
  const [sendingInviteUserId, setSendingInviteUserId] = useState("");
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const { alertState, showAlert, closeAlert } = useAlertModal();

  const contestId = contest?._id || contest?.id || id;
  const participationType = contest?.participationType || "solo";
  const allowSolo =
    participationType === "solo" || participationType === "both";
  const allowTeam =
    participationType === "team" || participationType === "both";

  useEffect(() => {
    if (allowTeam && !allowSolo) {
      setMode("team");
      return;
    }

    if (allowSolo && !allowTeam) {
      setMode("single");
    }
  }, [allowSolo, allowTeam]);

  if (!contest) {
    return (
      <>
        <div className="text-center mt-20">Contest not found</div>
        <AlertModal {...alertState} onClose={closeAlert} />
      </>
    );
  }

  const joinSolo = async () => {
    try {
      setJoiningSolo(true);

      const res = await API.post(
        `/participations/contest/${contestId}/join/solo`
      );

      showAlert({
        message: res.data?.message || "Joined solo contest successfully.",
        variant: "success",
        onClose: () => navigate("/student/my-contests"),
      });
    } catch (err) {
      showAlert({
        message:
          err.response?.data?.message || "Unable to join solo contest.",
        variant: "error",
      });
    } finally {
      setJoiningSolo(false);
    }
  };

  const createTeam = async () => {
    if (!teamName.trim()) {
      showAlert({
        message: "Team name required.",
        variant: "warning",
      });
      return;
    }

    try {
      setCreatingTeam(true);

      const res = await API.post("/team", {
        teamName: teamName.trim(),
        contest: contestId,
        inviteUserIds: [],
      });

      const createdTeamId =
        res.data?.team?._id || res.data?.teamId || res.data?._id;

      if (!createdTeamId) {
        throw new Error("Team created but no team id returned");
      }

      setTeamId(createdTeamId);
      showAlert({
        message: res.data.message || "Team created successfully.",
        variant: "success",
      });
    } catch (err) {
      showAlert({
        message:
          err.response?.data?.message ||
          err.message ||
          "Team creation failed.",
        variant: "error",
      });
    } finally {
      setCreatingTeam(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setFetchingUsers(true);

      const res = await API.get("/auth/users");
      const students = (res.data.users || []).filter(
        (u) => u.role === "student" && u._id !== currentUserId
      );

      setUsers(students);
      setShowDropdown(true);
    } catch (err) {
      showAlert({
        message: err.response?.data?.message || "Failed to fetch users.",
        variant: "error",
      });
    } finally {
      setFetchingUsers(false);
    }
  };

  const handleSelectUser = (user) => {
    const alreadyExists = members.some((m) => m.userId === user._id);
    if (alreadyExists) return;

    setMembers((prev) => [
      ...prev,
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        invited: false,
        status: "not invited",
      },
    ]);
  };

  const removeSelectedMember = (userId) => {
    setMembers((prev) => prev.filter((m) => m.userId !== userId));
  };

  const sendInvite = async (member) => {
    if (!teamId) {
      showAlert({
        message: "Create team first.",
        variant: "warning",
      });
      return;
    }

    try {
      setSendingInviteUserId(member.userId);

      const res = await API.post(`/team/${teamId}/invite`, {
        userId: member.userId,
      });

      setMembers((prev) =>
        prev.map((m) =>
          m.userId === member.userId
            ? { ...m, invited: true, status: "pending" }
            : m
        )
      );

      showAlert({
        message: res.data.message || "Invitation created successfully.",
        variant: "success",
      });
    } catch (err) {
      showAlert({
        message: err.response?.data?.message || "Invite failed.",
        variant: "error",
      });
    } finally {
      setSendingInviteUserId("");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white to-green-50 p-4 sm:p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-black"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-4 shadow sm:p-6">
        <h1 className="break-words text-2xl font-bold text-gray-800">{contest.title}</h1>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allowSolo && (
            <div
              onClick={() => setMode("single")}
              className={`rounded-xl border p-4 cursor-pointer transition ${
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
          )}

          {allowTeam && (
            <div
              onClick={() => setMode("team")}
              className={`rounded-xl border p-4 cursor-pointer transition ${
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
          )}
        </div>

        {allowSolo && mode === "single" && (
          <button
            onClick={joinSolo}
            disabled={joiningSolo}
            className="mt-5 w-full rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:opacity-60 sm:w-auto"
          >
            {joiningSolo ? "Joining..." : "Join Solo Contest"}
          </button>
        )}

        {allowTeam && mode === "team" && (
          <button
            onClick={() => setIsTeamModalOpen(true)}
            className="mt-5 w-full rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 sm:w-auto"
          >
            Create Team
          </button>
        )}
      </div>

        {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold sm:text-xl">Create Team</h2>
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
                  className="mb-3 w-full rounded-lg bg-green-50 px-4 py-2 text-left font-medium text-green-700 sm:w-auto"
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
                        key={m.userId}
                        className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-medium">{m.name || m.email}</p>
                          <p className="text-sm text-gray-500">{m.email}</p>
                          <p className="text-xs text-gray-500">
                            {m.status === "accepted"
                              ? "Accepted"
                              : m.status === "pending"
                              ? "Pending"
                              : "Not Invited"}
                          </p>
                        </div>

                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                          {!m.invited && (
                            <button
                              onClick={() => sendInvite(m)}
                              disabled={sendingInviteUserId === m.userId}
                              className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-700 disabled:opacity-60"
                            >
                              {sendingInviteUserId === m.userId
                                ? "Sending..."
                                : "Invite"}
                            </button>
                          )}

                          <button
                            onClick={() => removeSelectedMember(m.userId)}
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

      <AlertModal {...alertState} onClose={closeAlert} />
    </>
  );
};

export default ContestParticipatePage;
