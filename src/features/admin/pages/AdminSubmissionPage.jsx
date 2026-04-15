// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   getPaginationRowModel,
// } from "@tanstack/react-table";

// import { useMemo, useState } from "react";
// import { MoreVertical, Pencil, Trash2 } from "lucide-react";

// const ContestTable = ({ data = [], onDelete, onEdit }) => {
//   const safeData = useMemo(() => data.filter(Boolean), [data]);

//   const [openMenu, setOpenMenu] = useState(null);

//   const formatDate = (date) => {
//     if (!date) return "N/A";
//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "active":
//         return "bg-[#82C600]/10 text-[#82C600] ring-1 ring-[#82C600]/20";
//       case "upcoming":
//         return "bg-blue-50 text-blue-600 ring-1 ring-blue-200";
//       case "complete":
//         return "bg-gray-100 text-gray-600 ring-1 ring-gray-200";
//       default:
//         return "bg-gray-100 text-gray-500";
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         header: "Contest",
//         accessorKey: "title",
//         cell: ({ getValue }) => (
//           <div className="group">
//             <p className="font-semibold text-gray-800 group-hover:text-[#82C600] transition">
//               {getValue()}
//             </p>
//             <p className="text-xs text-gray-400">
//               Academic Challenge
//             </p>
//           </div>
//         ),
//       },
//       {
//         header: "Start Date",
//         accessorKey: "startDate",
//         cell: ({ getValue }) => formatDate(getValue()),
//       },
//       {
//         header: "Deadline",
//         accessorKey: "deadline", // ✅ FIXED
//         cell: ({ getValue }) => formatDate(getValue()),
//       },
//       {
//         header: "Participants",
//         accessorKey: "participants",
//       },
//       {
//         header: "Status",
//         accessorKey: "status",
//         cell: ({ getValue }) => {
//           const value = getValue();
//           return (
//             <span
//               className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
//                 value
//               )}`}
//             >
//               {value?.charAt(0).toUpperCase() + value?.slice(1)}
//             </span>
//           );
//         },
//       },
//       {
//         id: "actions",
//         header: "",
//         cell: ({ row }) => (
//           <div className="flex justify-end relative">
//             <MoreVertical
//               onClick={() =>
//                 setOpenMenu(openMenu === row.id ? null : row.id)
//               }
//               className="cursor-pointer text-gray-400 hover:text-black transition"
//             />

//             {openMenu === row.id && (
//               <div className="absolute right-0 mt-2 w-36 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-xl shadow-2xl z-10 overflow-hidden">
//                 <button
//                   onClick={() => {
//                     onEdit(row.original);
//                     setOpenMenu(null);
//                   }}
//                   className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
//                 >
//                   <Pencil size={14} />
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => {
//                     onDelete(row.original.id);
//                     setOpenMenu(null);
//                   }}
//                   className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
//                 >
//                   <Trash2 size={14} />
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ),
//       },
//     ],
//     [onDelete, onEdit, openMenu]
//   );

//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 3,
//   });

//   const table = useReactTable({
//     data: safeData,
//     columns,
//     state: { pagination },
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">
//           🎯 Contest Dashboard
//         </h2>
//         <span className="text-sm text-gray-400">
//           {safeData.length} contests
//         </span>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="text-gray-500 text-xs uppercase bg-gray-50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="text-left py-3 px-2">
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           <tbody>
//             {table.getRowModel().rows.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
//                   <p className="text-lg">🚫 No contests available</p>
//                   <p className="text-xs mt-2">Try creating a new contest</p>
//                 </td>
//               </tr>
//             ) : (
//               table.getRowModel().rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   className="border-b hover:bg-[#82C600]/5 transition-all duration-300 hover:scale-[1.01]"
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id} className="py-3 px-2">
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-between items-center mt-6">
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="px-4 py-2 bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white rounded-lg shadow hover:scale-105 transition disabled:opacity-50 disabled:shadow-none"
//         >
//           Previous
//         </button>

//         <span className="text-sm">
//           Page {table.getState().pagination.pageIndex + 1} of{" "}
//           {table.getPageCount()}
//         </span>

//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="px-4 py-2 bg-gradient-to-r from-[#82C600] to-[#a3e635] text-white rounded-lg shadow hover:scale-105 transition disabled:opacity-50 disabled:shadow-none"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ContestTable;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaUser } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const AdminSubmissionPage = () => {
//   const [data, setData] = useState([]);
//   const [selectedContest, setSelectedContest] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // ================= FETCH CONTESTS =================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const res = await axios.get(
//           "https://learn-earn-contest-3.onrender.com/api/v1/submission/submitted-contests-count",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("API:", res.data);

//         // ✅ FIX (your correct key)
//         const contests = res.data?.contests || [];

//         setData(contests);

//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="p-6">⏳ Loading...</div>;

//   return (
//     <div className="p-6">

//       <h2 className="text-2xl font-bold mb-6">
//         TOTAL SUBMISSIONS
//       </h2>

//       {/* ================= CONTEST LIST ================= */}
//       {!selectedContest &&
//         data.map((contest) => (
//           <div
//             key={contest._id}
//             onClick={() => setSelectedContest(contest)}
//             className="p-5 mb-4 border rounded-xl cursor-pointer hover:shadow"
//           >
//             <h3 className="font-semibold text-lg">
//               {contest.title}
//             </h3>

//             <p className="text-sm text-gray-500">
//               👥 {contest.totalSubmittedStudents} submissions
//             </p>
//           </div>
//         ))}

//       {/* ================= STUDENT LIST ================= */}
//       {selectedContest && (
//         <div>

//           {/* BACK */}
//           <button
//             onClick={() => setSelectedContest(null)}
//             className="mb-4 px-4 py-2 bg-gray-100 rounded"
//           >
//             ← Back
//           </button>

//           <h2 className="text-xl mb-4">
//             {selectedContest.title} Submissions
//           </h2>

//           {selectedContest.studentDetails?.length === 0 ? (
//             <p>No submissions 🚫</p>
//           ) : (
//             selectedContest.studentDetails.map((student) => (
//               <div
//                 key={student._id}
//                 className="p-4 border mb-3 rounded"
//               >
//                 <div className="flex justify-between">

//                   <div className="flex gap-3 items-center">
//                     <FaUser />

//                     <div>
//                       <p className="font-medium">
//                         {student.name}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {student.email}
//                       </p>
//                     </div>
//                   </div>

//                   <span className="text-xs text-gray-400">
//                     {student.submittedAt
//                       ? new Date(student.submittedAt).toLocaleDateString()
//                       : "N/A"}
//                   </span>
//                 </div>

//                 <div className="flex gap-3 mt-3">
//                   <a
//                     href={student.githubLink}
//                     target="_blank"
//                     className="px-3 py-1 bg-black text-white rounded"
//                   >
//                     GitHub
//                   </a>

//                   <a
//                     href={student.liveUrl}
//                     target="_blank"
//                     className="px-3 py-1 bg-green-500 text-white rounded"
//                   >
//                     Live
//                   </a>

//                   <button
//                     onClick={() =>
//                       navigate("/admin/evaluation", {
//                         state: { contest: selectedContest, student },
//                       })
//                     }
//                     className="px-3 py-1 bg-blue-500 text-white rounded"
//                   >
//                     Declare
//                   </button>
//                 </div>

//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminSubmissionPage;

import { useEffect, useState } from "react";
import API from "../../../services/axios"; // ✅ ONLY CHANGE
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminSubmissionPage = () => {
  const [data, setData] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ KEEP (not removed)

  // ================= FETCH CONTESTS =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await API.get( // ✅ axios → API
          "/submission/submitted-contests-count",
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ KEEP (no change)
            },
          }
        );

        console.log("API:", res.data);

        // ✅ FIX (your correct key)
        const contests = res.data?.contests || [];

        setData(contests);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">⏳ Loading...</div>;

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        TOTAL SUBMISSIONS
      </h2>

      {/* ================= CONTEST LIST ================= */}
      {!selectedContest &&
        data.map((contest) => (
          <div
            key={contest._id}
            onClick={() => setSelectedContest(contest)}
            className="p-5 mb-4 border rounded-xl cursor-pointer hover:shadow"
          >
            <h3 className="font-semibold text-lg">
              {contest.title}
            </h3>

            <p className="text-sm text-gray-500">
              👥 {contest.totalSubmittedStudents} submissions
            </p>
          </div>
        ))}

      {/* ================= STUDENT LIST ================= */}
      {selectedContest && (
        <div>

          {/* BACK */}
          <button
            onClick={() => setSelectedContest(null)}
            className="mb-4 px-4 py-2 bg-gray-100 rounded"
          >
            ← Back
          </button>

          <h2 className="text-xl mb-4">
            {selectedContest.title} Submissions
          </h2>

          {selectedContest.studentDetails?.length === 0 ? (
            <p>No submissions 🚫</p>
          ) : (
            selectedContest.studentDetails.map((student) => (
              <div
                key={student._id}
                className="p-4 border mb-3 rounded"
              >
                <div className="flex justify-between">

                  <div className="flex gap-3 items-center">
                    <FaUser />

                    <div>
                      <p className="font-medium">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {student.email}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-gray-400">
                    {student.submittedAt
                      ? new Date(student.submittedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex gap-3 mt-3">
                  <a
                    href={student.githubLink}
                    target="_blank"
                    className="px-3 py-1 bg-black text-white rounded"
                  >
                    GitHub
                  </a>

                  <a
                    href={student.liveUrl}
                    target="_blank"
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Live
                  </a>

                  <button
                    onClick={() =>
                      navigate("/admin/evaluation", {
                        state: { contest: selectedContest, student },
                      })
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Declare
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminSubmissionPage;