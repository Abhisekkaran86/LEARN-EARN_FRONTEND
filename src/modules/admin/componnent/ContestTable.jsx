// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
// } from "@tanstack/react-table";

// import { useMemo } from "react";
// import { MoreVertical, Pencil, Trash2 } from "lucide-react";

// const ContestTable = ({ data = [], onDelete, onEdit }) => {

//   const formatDate = (date) => {
//     if (!date) return "N/A";

//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // 🎨 STATUS STYLE
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-600";
//       case "upcoming":
//         return "bg-blue-100 text-blue-600";
//       case "complete":
//         return "bg-gray-200 text-gray-600";
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
//           <div>
//             <p className="font-semibold text-gray-800">
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
//         accessorKey: "date",
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

//       // 🔥 FIXED ACTION COLUMN (IMPORTANT)
//       {
//         id: "actions", // ✅ REQUIRED FIX
//         header: "",

//         cell: ({ row }) => (
//           <div className="flex justify-end">
//             <div className="relative group">

//               <MoreVertical className="cursor-pointer text-gray-400 hover:text-black transition" />

//               <div className="absolute right-0 mt-2 w-36 bg-white border rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition z-10 overflow-hidden">

//                 {/* EDIT */}
//                 <button
//                   onClick={() => onEdit(row.original)}
//                   className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
//                 >
//                   <Pencil size={14} />
//                   Edit
//                 </button>

//                 {/* DELETE */}
//                 <button
//                   onClick={() => onDelete(row.original.id)}
//                   className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
//                 >
//                   <Trash2 size={14} />
//                   Delete
//                 </button>

//               </div>

//             </div>
//           </div>
//         ),
//       },
//     ],
//     [onDelete, onEdit]
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div className="bg-white rounded-3xl shadow-lg p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">
//           🎯 Contest Dashboard
//         </h2>
//         <span className="text-sm text-gray-400">
//           {data.length} contests
//         </span>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">

//           {/* HEADER */}
//           <thead className="text-gray-400 text-xs uppercase">
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

//           {/* BODY */}
//           <tbody>

//             {table.getRowModel().rows.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="text-center py-10 text-gray-400">
//                   🚫 No contests available
//                 </td>
//               </tr>
//             ) : (
//               table.getRowModel().rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   className="border-b hover:bg-gray-50 transition"
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

//     </div>
//   );
// };

// export default ContestTable;

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const ContestTable = ({ data = [], onDelete, onEdit }) => {
  // ✅ FIX: remove null/undefined rows
  const safeData = useMemo(() => data.filter(Boolean), [data]);

  console.log("TABLE DATA:", safeData); // 🔍 DEBUG

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-600";
      case "upcoming":
        return "bg-blue-100 text-blue-600";
      case "complete":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Contest",
        accessorKey: "title",
        cell: ({ getValue }) => (
          <div>
            <p className="font-semibold text-gray-800">
              {getValue()}
            </p>
            <p className="text-xs text-gray-400">
              Academic Challenge
            </p>
          </div>
        ),
      },
      {
        header: "Start Date",
        accessorKey: "startDate",
        cell: ({ getValue }) => formatDate(getValue()),
      },
      {
        header: "Deadline",
        accessorKey: "date",
        cell: ({ getValue }) => formatDate(getValue()),
      },
      {
        header: "Participants",
        accessorKey: "participants",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                value
              )}`}
            >
              {value?.charAt(0).toUpperCase() + value?.slice(1)}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex justify-end">
            <div className="relative group">
              <MoreVertical className="cursor-pointer text-gray-400 hover:text-black transition" />

              <div className="absolute right-0 mt-2 w-36 bg-white border rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition z-10 overflow-hidden">
                <button
                  onClick={() => onEdit(row.original)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  onClick={() => onDelete(row.original.id)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [onDelete, onEdit]
  );

  // ✅ Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3, // 👈 change this if needed
  });

  const table = useReactTable({
    data: safeData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          🎯 Contest Dashboard
        </h2>
        <span className="text-sm text-gray-400">
          {safeData.length} contests
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400 text-xs uppercase">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left py-3 px-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  🚫 No contests available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 px-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContestTable;