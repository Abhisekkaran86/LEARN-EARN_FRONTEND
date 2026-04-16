import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import API from "@/services/axios";
import AlertModal from "@/components/ui/AlertModal";
import useAlertModal from "@/hooks/useAlertModal";

const TeamInviteConfirmPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const { alertState, showAlert, closeAlert } = useAlertModal();

  const authToken = Cookies.get("token");

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
        const res = await API.get("/team/my-invitations");
        const invitations = res.data?.invitations || [];

        const matchedInvite = invitations.find(
          (item) =>
            item.token === token ||
            item.acceptToken === token ||
            item._id === token
        );

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
    const invitationReference =
      invite?.acceptToken || invite?.token || invite?._id || token;

    if (!invitationReference) {
      showAlert({
        message: "Invitation reference is missing.",
        variant: "error",
      });
      return;
    }

    try {
      setAccepting(true);

      const res = await API.post(
        `/team/invite/confirm/${invitationReference}` // ✅ FIXED
      );

      showAlert({
        message: res.data?.message || "Invitation accepted successfully.",
        variant: "success",
        onClose: () => navigate("/student/my-invitations"),
      });

    } catch (err) {
      console.log(err.response?.data || err.message);
      showAlert({
        message:
          err.response?.data?.message || "Failed to accept invitation.",
        variant: "error",
      });
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="mt-20 text-center text-gray-500">
          Loading invitation...
        </div>
        <AlertModal {...alertState} onClose={closeAlert} />
      </>
    );
  }

  if (!invite) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-white to-green-50 px-4 py-16">
          <div className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center shadow">
            <h2 className="text-lg font-semibold text-gray-800">
              Invitation not found
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              This invitation may be expired, already accepted, or not assigned to
              your account.
            </p>

            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/student/my-invitations")}
                className="rounded-lg bg-[#82C600] px-4 py-2 text-sm font-medium text-white hover:bg-[#6ea900]"
              >
                My Invitations
              </button>

              <button
                type="button"
                onClick={() => navigate("/student/dashboard")}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
      <div className="min-h-screen bg-gradient-to-br from-white to-green-50 px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center shadow">
          <h2 className="text-lg font-bold text-gray-900">Team Invitation</h2>
          <p className="mt-2 text-sm text-gray-500">You are invited to join:</p>

          <p className="mt-3 text-xl font-semibold text-[#82C600]">
            {invite.team?.teamName || "Team"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Contest: {invite.team?.contest?.title || "N/A"}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Invited by: {invite.invitedBy?.name || invite.team?.leader?.name || "Unknown"}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleAccept}
              disabled={accepting}
              className="rounded-lg bg-[#82C600] px-4 py-2 text-white hover:bg-[#6ea900] disabled:opacity-60"
            >
              {accepting ? "Accepting..." : "Accept Invitation"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/student/my-invitations")}
              className="rounded-lg border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50"
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
