import { useEffect, useState } from "react";
import API from "../../../services/axios";

const InvitesPage = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingToken, setAcceptingToken] = useState("");

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        setLoading(true);

        const res = await API.get("/team/my-invitations");
        setInvites(res.data.invitations || []);
      } catch (err) {
        console.log("fetch invites error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Failed to fetch invitations");
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, []);

  const acceptInvite = async (token) => {
    try {
      setAcceptingToken(token);

      const res = await API.post(`/team/invite/confirm/${token}`);
      alert(res.data.message || "Joined Team successfully");

      setInvites((prev) => prev.filter((invite) => invite.token !== token));
    } catch (err) {
      console.log("accept invite error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to accept invitation");
    } finally {
      setAcceptingToken("");
    }
  };

  if (loading) {
    return <div className="p-6">Loading invitations...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Team Invites</h1>

      {invites.length === 0 && (
        <p className="text-gray-500">No invites</p>
      )}

      {invites.map((invite) => (
        <div
          key={invite._id}
          className="border p-4 rounded-xl mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{invite.team?.teamName}</p>
            <p className="text-xs text-gray-500">
              Contest: {invite.team?.contest?.title || "N/A"}
            </p>
            <p className="text-xs text-gray-500">
              Status: {invite.status}
            </p>
          </div>

          <button
            onClick={() => acceptInvite(invite.token)}
            disabled={acceptingToken === invite.token}
            className="bg-green-600 text-white px-4 py-1 rounded disabled:opacity-60"
          >
            {acceptingToken === invite.token ? "Accepting..." : "Accept"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default InvitesPage;