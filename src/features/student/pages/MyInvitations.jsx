import { useEffect, useState } from "react";
import API from "./../../../services/axios";

const INVITATIONS_UPDATED_EVENT = "team-invitations-updated";

const MyInvitations = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingToken, setAcceptingToken] = useState("");

  const broadcastInvitations = (nextInvitations) => {
    window.dispatchEvent(
      new CustomEvent(INVITATIONS_UPDATED_EVENT, {
        detail: { invitations: nextInvitations },
      })
    );
  };

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      const res = await API.get("/team/my-invitations");
      const nextInvitations = res.data.invitations || [];
      setInvitations(nextInvitations);
      broadcastInvitations(nextInvitations);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load invitations");
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = async (invite) => {
    const invitationReference =
      invite?.acceptToken || invite?.token || invite?._id;

    if (!invitationReference) {
      alert("Invitation reference is missing");
      return;
    }

    try {
      setAcceptingToken(invitationReference);
      const res = await API.post("/team/invite/confirm", {
        invitationToken: invitationReference,
      });
      alert(res.data.message || "Invitation accepted");
      setInvitations((prev) => {
        const nextInvitations = prev.filter(
          (item) =>
            item._id !== invite._id &&
            item.token !== invite.token &&
            item.acceptToken !== invite.acceptToken
        );
        broadcastInvitations(nextInvitations);
        return nextInvitations;
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to accept invitation");
    } finally {
      setAcceptingToken("");
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  if (loading) {
    return <div className="p-6">Loading invitations...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Invitations</h1>

      {invitations.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-gray-500">
          No pending invitations
        </div>
      ) : (
        <div className="grid gap-4">
          {invitations.map((invite) => (
            <div
              key={invite._id}
              className="bg-white rounded-xl shadow border p-5"
            >
              <h2 className="text-lg font-semibold">
                Team: {invite.team?.teamName}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Contest: {invite.team?.contest?.title}
              </p>
              <p className="text-sm text-gray-600">
                Invited By: {invite.invitedBy?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-600">
                Status: {invite.status}
              </p>

              <button
                onClick={() => acceptInvite(invite)}
                disabled={
                  acceptingToken === invite.acceptToken ||
                  acceptingToken === invite.token ||
                  acceptingToken === invite._id
                }
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
              >
                {acceptingToken === invite.acceptToken ||
                acceptingToken === invite.token ||
                acceptingToken === invite._id
                  ? "Accepting..."
                  : "Accept Invitation"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInvitations;
