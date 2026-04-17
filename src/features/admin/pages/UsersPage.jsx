// import { useEffect, useState } from "react";
// import API from "../../../services/axios"; // ✅ use API

// import { PencilLine, Search, Trash2, Users } from "lucide-react";
// import UserAvatar from "@/components/ui/UserAvatar";
// import {
//   formatRegistrationDate,
//   normalizeUserProfileData,
// } from "@/utils/userProfile";

// const emptyForm = {
//   _id: "",
//   name: "",
//   email: "",
//   phoneNumber: "",
//   gender: "",
//   role: "",
// };

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [deletingId, setDeletingId] = useState(null);
//   const [editingUser, setEditingUser] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");

//   // 🔥 FETCH USERS
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await API.get("/auth/users", { // ✅ FIXED
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data =
//           res?.data?.data ||
//           res?.data?.users ||
//           res?.data ||
//           [];

//         setUsers(data.map((user) => normalizeUserProfileData(user)));
//       } catch (err) {
//         console.error("USER FETCH ERROR:", err);
//         setError(err.response?.data?.message || "Unable to load users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   // 🔥 DELETE USER
//   const handleDelete = async (userId) => {
//     try {
//       setDeletingId(userId);

//       await API.delete(`/auth/delete/user/${userId}`, { // ✅ FIXED
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUsers((prev) => prev.filter((user) => user._id !== userId));

//     } catch (err) {
//       console.error("DELETE ERROR:", err.response?.data || err.message);

//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//       }

//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const handleEditOpen = (user) => {
//     setEditingUser({
//       _id: user._id || "",
//       name: user.name || "",
//       email: user.email || "",
//       phoneNumber: user.phoneNumber || "",
//       gender: user.gender || "",
//       role: user.role || "student",
//     });
//   };

//   const handleEditClose = () => {
//     setEditingUser(emptyForm);
//     setSaving(false);
//   };

//   const handleEditChange = (event) => {
//     const { name, value } = event.target;
//     setEditingUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async () => {
//     if (!editingUser._id) {
//       return;
//     }

//     if (!editingUser.name.trim() || !editingUser.email.trim()) {
//       setError("Name and email are required");
//       return;
//     }

//     try {
//       setSaving(true);
//       setError("");

//       const payload = {
//         name: editingUser.name.trim(),
//         email: editingUser.email.trim(),
//         phoneNumber: editingUser.phoneNumber.trim(),
//         gender: editingUser.gender || "",
//       };

//       const res = await API.put(`/auth/user/update/${editingUser._id}`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const updatedUser = normalizeUserProfileData(
//         res?.data?.user || res?.data?.data?.user || res?.data?.data || payload
//       );

//       setUsers((prev) =>
//         prev.map((user) =>
//           user._id === editingUser._id ? { ...user, ...updatedUser } : user
//         )
//       );
//       handleEditClose();
//     } catch (err) {
//       setError(err.response?.data?.message || "Unable to update this user");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // 🔍 SEARCH
//   const filteredUsers = users.filter((user) => {
//     const query = search.toLowerCase();
//     return (
//       user.name?.toLowerCase().includes(query) ||
//       user.email?.toLowerCase().includes(query)
//     );
//   });

//   return (
//     <div className="theme-page-shell min-h-screen p-6">

//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-2">
//           <Users className="text-[#82C600]" />
//           <h1 className="theme-text text-2xl font-bold">
//             Users Management
//           </h1>
//         </div>

//         <div className="theme-surface flex items-center gap-2 rounded-2xl px-3 py-2 shadow">
//           <Search size={16} className="theme-text-muted" />
//           <input
//             type="text"
//             placeholder="Search users..."
//             className="bg-transparent text-sm outline-none"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {error ? (
//         <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
//           {error}
//         </div>
//       ) : null}

//       <div className="theme-surface overflow-hidden rounded-2xl shadow">

//         <div className="theme-surface-muted theme-border grid grid-cols-5 border-b p-4 text-sm font-semibold">
//           <div>Student</div>
//           <div>Email</div>
//           <div>Role</div>
//           <div>Registered</div>
//           <div>Action</div>
//         </div>

//         {loading ? (
//           <div className="theme-text-soft text-center py-10">
//             Loading users...
//           </div>
//         ) : filteredUsers.length === 0 ? (
//           <div className="theme-text-muted text-center py-10">
//             No users found
//           </div>
//         ) : (
//           filteredUsers.map((user) => (
//             <div
//               key={user._id}
//               className="theme-border grid grid-cols-5 items-center border-b p-4 transition hover:bg-[var(--theme-surface-hover)]"
//             >
//               <div className="flex items-center gap-3">
//                 <UserAvatar user={user} size="sm" />

//                 <div className="min-w-0">
//                   <p className="theme-text truncate font-medium">
//                     {user.name}
//                   </p>
//                   <p className="theme-text-muted text-xs">
//                     {user.profileImage ? "Photo uploaded" : "No photo"}
//                   </p>
//                 </div>
//               </div>

//               <div className="theme-text-soft text-sm">
//                 {user.email}
//               </div>

//               <div>
//                 <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
//                   {user.role}
//                 </span>
//               </div>

//               <div className="theme-text-soft text-xs">
//                 {formatRegistrationDate(user)}
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 <button
//                   type="button"
//                   onClick={() => handleEditOpen(user)}
//                   className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 transition hover:bg-blue-200 dark:bg-blue-500/15 dark:text-blue-300"
//                 >
//                   <PencilLine size={14} />
//                   Update
//                 </button>

//                 {user.role === "student" && (
//                   <button
//                     onClick={() => handleDelete(user._id)}
//                     disabled={deletingId === user._id}
//                     className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 transition hover:bg-red-200 dark:bg-red-500/15 dark:text-red-300"
//                   >
//                     <Trash2 size={14} />
//                     {deletingId === user._id ? "Deleting..." : "Delete"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {editingUser._id ? (
//         <div className="theme-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="theme-modal-panel w-full max-w-xl rounded-3xl p-6">
//             <div className="theme-border mb-6 flex items-center justify-between border-b pb-4">
//               <div>
//                 <p className="theme-text-muted text-xs uppercase tracking-[0.2em]">
//                   Update User
//                 </p>
//                 <h2 className="theme-text mt-2 text-2xl font-bold">
//                   {editingUser.name || "User"}
//                 </h2>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleEditClose}
//                 className="theme-icon-button rounded-full p-2"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="sm:col-span-2">
//                 <label className="theme-text-soft mb-2 block text-sm font-medium">
//                   Full Name
//                 </label>
//                 <input
//                   name="name"
//                   value={editingUser.name}
//                   onChange={handleEditChange}
//                   className="theme-input w-full rounded-2xl px-4 py-3 text-sm"
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="theme-text-soft mb-2 block text-sm font-medium">
//                   Email
//                 </label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={editingUser.email}
//                   onChange={handleEditChange}
//                   className="theme-input w-full rounded-2xl px-4 py-3 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="theme-text-soft mb-2 block text-sm font-medium">
//                   Phone Number
//                 </label>
//                 <input
//                   name="phoneNumber"
//                   value={editingUser.phoneNumber}
//                   onChange={handleEditChange}
//                   placeholder="Optional"
//                   className="theme-input w-full rounded-2xl px-4 py-3 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="theme-text-soft mb-2 block text-sm font-medium">
//                   Gender
//                 </label>
//                 <select
//                   name="gender"
//                   value={editingUser.gender}
//                   onChange={handleEditChange}
//                   className="theme-input w-full rounded-2xl px-4 py-3 text-sm"
//                 >
//                   <option value="">Select gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                   <option value="prefer not to say">Prefer not to say</option>
//                 </select>
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="theme-text-soft mb-2 block text-sm font-medium">
//                   Role
//                 </label>
//                 <input
//                   value={editingUser.role}
//                   disabled
//                   className="theme-input w-full rounded-2xl px-4 py-3 text-sm opacity-80"
//                 />
//               </div>
//             </div>

//             <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
//               <button
//                 type="button"
//                 onClick={handleEditClose}
//                 className="theme-outline-button rounded-2xl px-5 py-3 text-sm font-semibold"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={handleUpdate}
//                 disabled={saving}
//                 className="theme-brand-button rounded-2xl px-5 py-3 text-sm font-semibold"
//               >
//                 {saving ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default UsersPage;

import { useEffect, useState } from "react";
import API from "../../../services/axios";

import { PencilLine, Search, Trash2, Users } from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar";
import {
  formatRegistrationDate,
  normalizeUserProfileData,
} from "@/utils/userProfile";

const emptyForm = {
  _id: "",
  name: "",
  email: "",
  phoneNumber: "",
  gender: "",
  role: "",
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [editingUser, setEditingUser] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [deleteUser, setDeleteUser] = useState(null);

  const token = localStorage.getItem("token");

  // FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data =
          res?.data?.data ||
          res?.data?.users ||
          res?.data ||
          [];

        setUsers(data.map((u) => normalizeUserProfileData(u)));
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  // DELETE
  const handleDelete = async (userId) => {
    try {
      setDeletingId(userId);

      await API.delete(`/auth/delete/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } finally {
      setDeletingId(null);
    }
  };

  // EDIT OPEN
  const handleEditOpen = (user) => {
    setEditingUser({
      _id: user._id || "",
      name: user.name || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      gender: user.gender || "",
      role: user.role || "student",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editingUser._id) return;

    try {
      setSaving(true);

      const payload = {
        name: editingUser.name.trim(),
        email: editingUser.email.trim(),
        phoneNumber: editingUser.phoneNumber,
        gender: editingUser.gender,
      };

      const res = await API.put(
        `/auth/user/update/${editingUser._id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = normalizeUserProfileData(
        res?.data?.user || payload
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === editingUser._id ? { ...u, ...updatedUser } : u
        )
      );

      setEditingUser(emptyForm);
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="theme-page-shell min-h-screen p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Users className="text-[#82C600]" />
          <h1 className="text-2xl font-bold">Users</h1>
        </div>

        <div className="flex items-center gap-2 border px-3 py-2 rounded-xl">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="border rounded-2xl overflow-hidden">

        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-5 p-4 border-b items-center"
          >
            <div className="flex gap-2 items-center">
              <UserAvatar user={user} size="sm" />
              {user.name}
            </div>

            <div>{user.email}</div>
            <div>{user.role}</div>
            <div>{formatRegistrationDate(user)}</div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEditOpen(user)}
                className="px-3 py-1 bg-blue-100 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteUser(user)}
                className="px-3 py-1 bg-red-100 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 💎 PREMIUM EDIT MODAL */}
      {editingUser._id && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="bg-white dark:bg-[var(--theme-surface)] p-6 rounded-3xl w-full max-w-lg shadow-2xl">

            <h2 className="text-xl font-bold mb-4">
              Edit User
            </h2>

            <div className="space-y-3">

              <input
                name="name"
                value={editingUser.name}
                onChange={handleEditChange}
                placeholder="Name"
                className="w-full p-3 border rounded-xl"
              />

              <input
                name="email"
                value={editingUser.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="w-full p-3 border rounded-xl"
              />

              <input
                name="phoneNumber"
                value={editingUser.phoneNumber}
                onChange={handleEditChange}
                placeholder="Phone"
                className="w-full p-3 border rounded-xl"
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setEditingUser(emptyForm)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-xl"
              >
                {saving ? "Saving..." : "Save"}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* 🗑️ DELETE MODAL */}
      {deleteUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

          <div className="bg-white p-6 rounded-2xl w-full max-w-md">

            <h2 className="font-bold mb-4">
              Delete User
            </h2>

            <p className="mb-4">
              Delete {deleteUser.name} ?
            </p>

            <div className="flex justify-end gap-2">

              <button onClick={() => setDeleteUser(null)}>
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleDelete(deleteUser._id);
                  setDeleteUser(null);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UsersPage;