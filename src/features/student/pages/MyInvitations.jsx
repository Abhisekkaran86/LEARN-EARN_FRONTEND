import { useEffect, useState } from "react";
import API from "./../../../services/axios";
import AlertModal from "@/components/ui/AlertModal";
import useAlertModal from "@/hooks/useAlertModal";

const INVITATIONS_UPDATED_EVENT = "team-invitations-updated";

const MyInvitations = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingToken, setAcceptingToken] = useState("");
  const { alertState, showAlert, closeAlert } = useAlertModal();

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
      showAlert({
        message: err.response?.data?.message || "Failed to load invitations.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = async (invite) => {
    const invitationReference =
      invite?.acceptToken || invite?.token || invite?._id;

    if (!invitationReference) {
      showAlert({
        message: "Invitation token missing",
        variant: "error",
      });
      return;
    }

    try {
      setAcceptingToken(invitationReference);

      const res = await API.post(
        `/team/invite/confirm/${invitationReference}` // ✅ FIXED
      );

      showAlert({
        message: res.data.message || "Invitation accepted",
        variant: "success",
      });

      setInvitations((prev) =>
        prev.filter(
          (item) =>
            item._id !== invite._id &&
            item.token !== invite.token &&
            item.acceptToken !== invite.acceptToken
        )
      );

    } catch (err) {
      showAlert({
        message:
          err.response?.data?.message || "Failed to accept invitation",
        variant: "error",
      });
    } finally {
      setAcceptingToken("");
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  if (loading) {
    return (
      <>
        <div className="p-4 sm:p-6">Loading invitations...</div>
        <AlertModal {...alertState} onClose={closeAlert} />
      </>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <h1 className="mb-6 text-2xl font-bold">My Invitations</h1>

        {invitations.length === 0 ? (
          <div className="rounded-xl bg-white p-5 text-gray-500 shadow sm:p-6">
            No pending invitations
          </div>
        ) : (
          <div className="grid gap-4">
            {invitations.map((invite) => (
              <div
                key={invite._id}
                className="rounded-xl border bg-white p-4 shadow sm:p-5"
              >
                <h2 className="break-words text-lg font-semibold">
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
                  className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-60 sm:w-auto"
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

      <AlertModal {...alertState} onClose={closeAlert} />
    </>
  );
};

export default MyInvitations;
