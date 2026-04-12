import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/services/axios";
import Cookies from "js-cookie";

const InviteConfirmPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH INVITE =================
  useEffect(() => {
    if (!token) return;

    const fetchInvite = async () => {
      try {
        const res = await API.get(`/invitations/${token}`);
        setInvite(res.data?.invite);
      } catch (err) {
        console.log(err.response?.data);
        alert("Invalid or expired invite ❌");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [token, navigate]);

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
      alert(res.data?.message || "Joined team 🎉");

      navigate("/student/dashboard"); // ✅ better redirect
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed ❌");
    }
  };

  // ================= REJECT =================
  const handleReject = async () => {
    try {
      await API.post(`/invitations/reject/${token}`);
      alert("Invite rejected ❌");
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed ❌");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading invitation...
      </div>
    );
  }

  // ================= INVALID =================
  if (!invite) {
    return (
      <div className="text-center mt-20 text-red-500">
        Invite not found ❌
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-green-50">

      <div className="bg-white p-6 rounded-2xl shadow w-[350px] text-center">

        <h2 className="text-lg font-bold mb-2">
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

        <div className="flex gap-3 justify-center">

          <button
            onClick={handleAccept}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Accept
          </button>

          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reject
          </button>

        </div>

      </div>
    </div>
  );
};

export default InviteConfirmPage;