import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

import API from "@/services/axios";

const INVITATIONS_UPDATED_EVENT = "team-invitations-updated";

const NotificationBell = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async ({ silent = false } = {}) => {
    try {
      if (!silent) {
        setLoading(true);
      }

      const res = await API.get("/team/my-invitations");
      setNotifications(res.data.invitations || []);
      setHasLoaded(true);
    } catch {
      if (!silent) {
        setNotifications([]);
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleRefresh = (event) => {
      const nextInvitations = event.detail?.invitations;

      if (Array.isArray(nextInvitations)) {
        setNotifications(nextInvitations);
        setHasLoaded(true);
        return;
      }

      if (hasLoaded) {
        fetchNotifications({ silent: true });
      }
    };

    window.addEventListener(INVITATIONS_UPDATED_EVENT, handleRefresh);

    return () => {
      window.removeEventListener(INVITATIONS_UPDATED_EVENT, handleRefresh);
    };
  }, [hasLoaded]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (nextOpen) {
      await fetchNotifications({ silent: hasLoaded });
    }
  };

  const handleViewInvitations = () => {
    setOpen(false);
    navigate("/student/my-invitations");
  };

  const handleOpenInvitation = (invite) => {
    const invitationReference = invite?.acceptToken || invite?.token || invite?._id;

    setOpen(false);

    if (invitationReference) {
      navigate(`/invite/confirm/${invitationReference}`);
      return;
    }

    navigate("/student/my-invitations");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleOpen}
        className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        aria-label="Open invitations"
      >
        <FaBell className="text-base sm:text-lg" />
        {notifications.length > 0 && (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-[#82C600] px-1.5 py-0.5 text-center text-[10px] font-semibold text-white">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">Invitations</p>
              <p className="text-xs text-gray-400">
                Pending team invites in your account
              </p>
            </div>

            <button
              type="button"
              onClick={handleViewInvitations}
              className="text-xs font-medium text-[#82C600] hover:text-[#6ea900]"
            >
              View all
            </button>
          </div>

          {loading ? (
            <p className="py-3 text-sm text-gray-400">Loading invitations...</p>
          ) : notifications.length === 0 ? (
            <p className="py-3 text-sm text-gray-400">No pending invitations</p>
          ) : (
            <div className="space-y-2">
              {notifications.slice(0, 4).map((invite) => (
                <button
                  key={invite._id || invite.token}
                  type="button"
                  onClick={() => handleOpenInvitation(invite)}
                  className="block w-full rounded-xl border border-gray-100 px-3 py-2 text-left transition hover:bg-gray-50"
                >
                  <p className="text-sm font-medium text-gray-800">
                    {invite.team?.teamName || "Team invitation"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Contest: {invite.team?.contest?.title || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Invited by: {invite.invitedBy?.name || "Unknown"}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
