import { useEffect, useState } from "react";
import API from "../../../services/axios"; // ✅ use API

import { Users, Search, Trash2 } from "lucide-react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("token");

  // 🔥 FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/auth/users", { // ✅ FIXED
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data =
          res?.data?.data ||
          res?.data?.users ||
          res?.data ||
          [];

        setUsers(data);
      } catch (err) {
        console.error("USER FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔥 DELETE USER
  const handleDelete = async (userId) => {
    try {
      setDeletingId(userId);

      await API.delete(`/auth/delete/user/${userId}`, { // ✅ FIXED
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prev) => prev.filter((user) => user._id !== userId));

    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }

    } finally {
      setDeletingId(null);
    }
  };

  // 🔍 SEARCH
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Users className="text-[#82C600]" />
          <h1 className="text-2xl font-bold text-gray-800">
            Users Management
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="grid grid-cols-5 bg-gray-50 p-4 text-sm font-semibold text-gray-600 border-b">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No users found
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-5 items-center p-4 border-b hover:bg-gray-50 transition"
            >
              <div className="font-medium text-gray-800">
                {user.name}
              </div>

              <div className="text-gray-500 text-sm">
                {user.email}
              </div>

              <div>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                  {user.role}
                </span>
              </div>

              <div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                  Active
                </span>
              </div>

              <div>
                {user.role === "student" && (
                  <button
                    onClick={() => handleDelete(user._id)}
                    disabled={deletingId === user._id}
                    className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <Trash2 size={14} />
                    {deletingId === user._id ? "Deleting..." : "Delete"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersPage;