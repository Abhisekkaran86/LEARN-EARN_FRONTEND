import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { useMemo } from "react";
import { MoreVertical } from "lucide-react";

const ContestTable = ({ data = [], onDelete }) => {

  const columns = useMemo(
    () => [
      {
        header: "TITLE",
        accessorKey: "title",
      },
      {
        header: "DATE",
        accessorKey: "date",
      },
      {
        header: "PARTICIPANTS",
        accessorKey: "participants",
      },
      {
        header: "STATUS",
        accessorKey: "status",
        cell: ({ getValue }) => (
          <span className="px-2 py-1 text-xs rounded bg-[#82C600]/20 text-[#82C600]">
            {getValue()}
          </span>
        ),
      },
      {
        header: "ACTIONS",
        cell: ({ row }) => (
          <div className="flex justify-end">
            <div className="relative group">
              <MoreVertical />

              <div className="absolute right-0 hidden group-hover:block bg-white border rounded shadow z-10">
                <button
                  onClick={() => onDelete(row.original.id)}
                  className="block px-3 py-2 text-red-500 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm overflow-x-auto">

      <h2 className="font-semibold mb-4">Contest List</h2>

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="text-gray-400 border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* BODY */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-gray-50 transition"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-3">
                  {flexRender(
                    cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ContestTable;