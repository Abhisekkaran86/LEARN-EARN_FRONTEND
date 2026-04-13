import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ArrowLeft, Users, User } from "lucide-react";
import API from "../../../services/axios";

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
  const [sendingInviteUserId, setSendingInviteUserId] = useState("");
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
        inviteUserIds: [],
      });

      const createdTeamId =
        res.data?.team?._id || res.data?.teamId || res.data?._id;

      if (!createdTeamId) {
        throw new Error("Team created but no team id returned");
      }

      setTeamId(createdTeamId);
      alert(res.data.message || "Team created successfully");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.message ||
          "Team creation failed"
      );
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
      alert(err.response?.data?.message || "Failed to fetch users");
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
      return alert("Create team first");
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

      alert(res.data.message || "Invitation created successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Invite failed");
    } finally {
      setSendingInviteUserId("");
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
                        key={m.userId}
                        className="flex justify-between items-center border p-3 rounded-lg"
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

                        <div className="flex gap-2">
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
  );
};

export default ContestParticipatePage;
