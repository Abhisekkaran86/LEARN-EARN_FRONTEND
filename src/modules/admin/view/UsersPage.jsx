// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Users, Search, Trash2 } from "lucide-react";

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [deletingId, setDeletingId] = useState(null);

//   const token = Cookies.get("token");

//   // 🔥 FETCH USERS
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/auth/users",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data =
//           res?.data?.data ||
//           res?.data?.users ||
//           res?.data ||
//           [];

//         setUsers(data);
//       } catch (err) {
//         console.error("USER FETCH ERROR:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // 🔥 DELETE USER
//   const handleDelete = async (userId) => {
//     try {
//       setDeletingId(userId);

//       await axios.delete(
//         `https://learn-earn-contest-2.onrender.com/api/v1/auth/users/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ✅ remove from UI instantly
//       setUsers((prev) => prev.filter((user) => user._id !== userId));

//     } catch (err) {
//       console.error("DELETE ERROR:", err.response?.data || err.message);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // 🔍 SEARCH
//   const filteredUsers = users.filter((user) =>
//     user.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-2">
//           <Users className="text-[#82C600]" />
//           <h1 className="text-2xl font-bold text-gray-800">
//             Users Management
//           </h1>
//         </div>

//         {/* SEARCH */}
//         <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow">
//           <Search size={16} className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search users..."
//             className="outline-none text-sm"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">

//         {/* HEADER */}
//         <div className="grid grid-cols-5 bg-gray-50 p-4 text-sm font-semibold text-gray-600 border-b">
//           <div>Name</div>
//           <div>Email</div>
//           <div>Role</div>
//           <div>Status</div>
//           <div>Action</div>
//         </div>

//         {/* CONTENT */}
//         {loading ? (
//           <div className="text-center py-10 text-gray-500">
//             Loading users...
//           </div>
//         ) : filteredUsers.length === 0 ? (
//           <div className="text-center py-10 text-gray-400">
//             No users found
//           </div>
//         ) : (
//           filteredUsers.map((user) => (
//             <div
//               key={user._id}
//               className="grid grid-cols-5 items-center p-4 border-b hover:bg-gray-50 transition"
//             >
//               {/* NAME */}
//               <div className="font-medium text-gray-800">
//                 {user.name}
//               </div>

//               {/* EMAIL */}
//               <div className="text-gray-500 text-sm">
//                 {user.email}
//               </div>

//               {/* ROLE */}
//               <div>
//                 <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
//                   {user.role}
//                 </span>
//               </div>

//               {/* STATUS */}
//               <div>
//                 <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
//                   Active
//                 </span>
//               </div>

//               {/* DELETE BUTTON (ONLY STUDENT) */}
//               <div>
//                 {user.role === "student" && (
//                   <button
//                     onClick={() => handleDelete(user._id)}
//                     disabled={deletingId === user._id}
//                     className="flex items-center gap-1 px-3 py-1 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
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
//     </div>
//   );
// };

// export default UsersPage;

import { useEffect, useState } from "react";
import axios from "axios";
// ❌ removed Cookies
import { Users, Search, Trash2 } from "lucide-react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // ✅ get token from localStorage
  const token = localStorage.getItem("token");

  // 🔥 FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://learn-earn-contest-2.onrender.com/api/v1/auth/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

      await axios.delete(
        `https://learn-earn-contest-2.onrender.com/api/v1/auth/delete/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ remove from UI instantly
      setUsers((prev) => prev.filter((user) => user._id !== userId));

    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        console.error("Unauthorized! Please login again.");
        localStorage.removeItem("token"); // ✅ cleanup
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

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Users className="text-[#82C600]" />
          <h1 className="text-2xl font-bold text-gray-800">
            Users Management
          </h1>
        </div>

        {/* SEARCH */}
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

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-5 bg-gray-50 p-4 text-sm font-semibold text-gray-600 border-b">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* CONTENT */}
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
              {/* NAME */}
              <div className="font-medium text-gray-800">
                {user.name}
              </div>

              {/* EMAIL */}
              <div className="text-gray-500 text-sm">
                {user.email}
              </div>

              {/* ROLE */}
              <div>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                  {user.role}
                </span>
              </div>

              {/* STATUS */}
              <div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                  Active
                </span>
              </div>

              {/* DELETE BUTTON */}
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