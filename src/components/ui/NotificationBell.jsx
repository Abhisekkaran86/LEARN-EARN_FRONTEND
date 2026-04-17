import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

import {
  INVITATIONS_UPDATED_EVENT,
  fetchMyInvitations,
  getInvitationReference,
  normalizeInvitations,
} from "@/features/student/invitationAPI";

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

      const nextInvitations = await fetchMyInvitations();
      setNotifications(nextInvitations);
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
        setNotifications(normalizeInvitations(nextInvitations));
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
    const invitationReference = getInvitationReference(invite);

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
        // className="theme-icon-button relative rounded-full p-2"
        aria-label="Open invitations"
      >
        <FaBell className="text-base sm:text-2xl" />
        {notifications.length > 0 && (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-[#82C600] px-1.5 py-0.5 text-center text-[10px] font-semibold text-white">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="theme-surface absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl p-3 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="theme-text text-sm font-semibold">Invitations</p>
              <p className="theme-text-muted text-xs">
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
            <p className="theme-text-muted py-3 text-sm">Loading invitations...</p>
          ) : notifications.length === 0 ? (
            <p className="theme-text-muted py-3 text-sm">No pending invitations</p>
          ) : (
            <div className="space-y-2">
              {notifications.slice(0, 4).map((invite, index) => (
                <button
                  key={
                    invite?._id ||
                    invite?.token ||
                    invite?.acceptToken ||
                    `invite-${index}`
                  }
                  type="button"
                  onClick={() => handleOpenInvitation(invite)}
                  className="theme-surface-muted theme-interactive-row block w-full rounded-xl px-3 py-2 text-left"
                >
                  <p className="theme-text text-sm font-medium">
                    {invite?.team?.teamName || "Team invitation"}
                  </p>
                  <p className="theme-text-soft text-xs">
                    Contest: {invite?.team?.contest?.title || "N/A"}
                  </p>
                  <p className="theme-text-soft text-xs">
                    Invited by: {invite?.invitedBy?.name || "Unknown"}
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
