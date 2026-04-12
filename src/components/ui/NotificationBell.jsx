import { useEffect, useState } from "react";
import socket from "@/socket";
import { FaBell } from "react-icons/fa";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("team_invite", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    socket.on("team_approved", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    socket.on("team_ready", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div className="relative">

      <FaBell
        onClick={() => setOpen(!open)}
        className="text-xl cursor-pointer text-gray-700 dark:text-white"
      />

      {/* BADGE */}
      {notifications.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
          {notifications.length}
        </span>
      )}

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-3">

          {notifications.length === 0 ? (
            <p className="text-sm text-gray-400">
              No notifications
            </p>
          ) : (
            notifications.map((n, i) => (
              <div
                key={i}
                className="text-sm border-b py-2 last:border-none"
              >
                {n.message}
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
};

export default NotificationBell;