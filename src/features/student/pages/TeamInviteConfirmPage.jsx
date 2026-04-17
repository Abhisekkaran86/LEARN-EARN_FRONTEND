import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AlertModal from "@/components/ui/AlertModal";
import useAlertModal from "@/hooks/useAlertModal";
import {
  INVITATIONS_UPDATED_EVENT,
  acceptInvitation,
  fetchMyInvitations,
  findInvitationByReference,
  getInvitationReference,
} from "@/features/student/invitationAPI";
import { getAuthToken } from "@/utils/authStorage";

const TeamInviteConfirmPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const { alertState, showAlert, closeAlert } = useAlertModal();

  const authToken = getAuthToken();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    if (!authToken) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, {
        replace: true,
      });
      return;
    }

    const fetchInvite = async () => {
      try {
        const invitations = await fetchMyInvitations();
        const matchedInvite = findInvitationByReference(invitations, token);

        setInvite(matchedInvite || null);
      } catch (err) {
        console.log(err.response?.data || err.message);
        setInvite(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [authToken, location.pathname, navigate, token]);

  const handleAccept = async () => {
    const invitationReference = getInvitationReference(invite, token);

    if (!invitationReference) {
      showAlert({
        message: "Invitation reference is missing.",
        variant: "error",
      });
      return;
    }

    try {
      setAccepting(true);

      const res = await acceptInvitation(invitationReference);

      window.dispatchEvent(new CustomEvent(INVITATIONS_UPDATED_EVENT));

      showAlert({
        message: res.data?.message || "Invitation accepted successfully.",
        variant: "success",
        onClose: () => navigate("/student/my-invitations"),
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
      showAlert({
        message: err.response?.data?.message || "Failed to accept invitation.",
        variant: "error",
      });
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="theme-text-soft mt-20 text-center">
          Loading invitation...
        </div>
        <AlertModal {...alertState} onClose={closeAlert} />
      </>
    );
  }

  if (!invite) {
    return (
      <>
        <div className="theme-page-shell min-h-screen px-4 py-16">
          <div className="theme-surface mx-auto max-w-md rounded-2xl p-6 text-center">
            <h2 className="theme-text text-lg font-semibold">
              Invitation not found
            </h2>
            <p className="theme-text-soft mt-2 text-sm">
              This invitation may be expired, already accepted, or not assigned
              to your account.
            </p>

            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/student/my-invitations")}
                className="theme-brand-button rounded-lg px-4 py-2 text-sm font-medium"
              >
                My Invitations
              </button>

              <button
                type="button"
                onClick={() => navigate("/student/dashboard")}
                className="theme-outline-button rounded-lg px-4 py-2 text-sm"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>

        <AlertModal {...alertState} onClose={closeAlert} />
      </>
    );
  }

  return (
    <>
      <div className="theme-page-shell min-h-screen px-4 py-16">
        <div className="theme-surface mx-auto max-w-md rounded-2xl p-6 text-center">
          <h2 className="theme-text text-lg font-bold">Team Invitation</h2>
          <p className="theme-text-soft mt-2 text-sm">You are invited to join:</p>

          <p className="mt-3 text-xl font-semibold text-[#82C600]">
            {invite.team?.teamName || "Team"}
          </p>

          <p className="theme-text-soft mt-2 text-sm">
            Contest: {invite.team?.contest?.title || "N/A"}
          </p>

          <p className="theme-text-soft mt-1 text-sm">
            Invited by:{" "}
            {invite.invitedBy?.name || invite.team?.leader?.name || "Unknown"}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleAccept}
              disabled={accepting}
              className="theme-brand-button rounded-lg px-4 py-2 disabled:opacity-60"
            >
              {accepting ? "Accepting..." : "Accept Invitation"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/student/my-invitations")}
              className="theme-outline-button rounded-lg px-4 py-2"
            >
              View All
            </button>
          </div>
        </div>
      </div>

      <AlertModal {...alertState} onClose={closeAlert} />
    </>
  );
};

export default TeamInviteConfirmPage;
