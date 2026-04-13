import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/services/axios";
import Cookies from "js-cookie";
import AlertModal from "@/components/ui/AlertModal";
import useAlertModal from "@/hooks/useAlertModal";

const InviteConfirmPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const { alertState, showAlert, closeAlert } = useAlertModal();

  // ================= FETCH INVITE =================
  useEffect(() => {
    if (!token) return;

    const fetchInvite = async () => {
      try {
        const res = await API.get(`/invitations/${token}`);
        setInvite(res.data?.invite);
      } catch (err) {
        console.log(err.response?.data);
        showAlert({
          title: "Invitation unavailable",
          message: "Invalid or expired invite.",
          variant: "error",
          onClose: () => navigate("/"),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [navigate, showAlert, token]);

  // ================= ACCEPT =================
  const handleAccept = async () => {
    const authToken = Cookies.get("token");

    // If not logged in, redirect to login and come back here after
    if (!authToken) {
      const redirect = encodeURIComponent(location.pathname);
      navigate(`/login?redirect=${redirect}`);
      return;
    }

    try {
      const res = await API.post(`/invitations/accept/${token}`);
      showAlert({
        message: res.data?.message || "Joined team successfully.",
        variant: "success",
        onClose: () => navigate("/student/dashboard"),
      });
    } catch (err) {
      console.log(err.response?.data);
      showAlert({
        message: err.response?.data?.message || "Failed to accept invitation.",
        variant: "error",
      });
    }
  };

  // ================= REJECT =================
  const handleReject = async () => {
    try {
      await API.post(`/invitations/reject/${token}`);
      showAlert({
        title: "Invitation rejected",
        message: "Invite rejected.",
        variant: "info",
        onClose: () => navigate("/"),
      });
    } catch (err) {
      console.log(err.response?.data);
      showAlert({
        message: err.response?.data?.message || "Failed to reject invitation.",
        variant: "error",
      });
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <>
        <div className="mt-20 px-4 text-center text-gray-500">
          Loading invitation...
        </div>
        <AlertModal {...alertState} onClose={closeAlert} />
      </>
    );
  }

  // ================= INVALID =================
  if (!invite) {
    return (
      <>
        <div className="mt-20 px-4 text-center text-red-500">
          Invite not found ❌
        </div>
        <AlertModal {...alertState} onClose={closeAlert} />
      </>
    );
  }

  // ================= UI =================
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-green-50 px-4 py-10 sm:px-6">
        <div className="w-full max-w-sm rounded-2xl bg-white p-5 text-center shadow sm:p-6">
          <h2 className="mb-2 text-lg font-bold sm:text-xl">
            Team Invitation
          </h2>

          <p className="text-gray-500 mb-2">
            You are invited to join:
          </p>

          <p className="text-green-600 font-semibold text-lg mb-2">
            {invite.team?.teamName}
          </p>

          <p className="text-xs text-gray-400 mb-4">
            Contest: {invite.contest?.title || "N/A"}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={handleAccept}
              className="w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:w-auto"
            >
              Accept
            </button>

            <button
              onClick={handleReject}
              className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 sm:w-auto"
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      <AlertModal {...alertState} onClose={closeAlert} />
    </>
  );
};

export default InviteConfirmPage;
