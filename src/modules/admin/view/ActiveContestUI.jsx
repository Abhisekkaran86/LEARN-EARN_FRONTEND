// import { useState, useMemo } from "react";
// import { MoreVertical, Search } from "lucide-react";

// const StatusBadge = ({ status }) => {
//   const styles = {
//     active: "bg-[#82C600]/20 text-[#82C600]",
//     draft: "bg-gray-200 text-gray-600",
//     evaluating: "bg-blue-100 text-blue-600",
//   };

//   return (
//     <span
//       className={`text-xs px-3 py-1 rounded-full font-medium ${
//         styles[status] || "bg-gray-100 text-gray-600"
//       }`}
//     >
//       {status.toUpperCase()}
//     </span>
//   );
// };

// const ITEMS_PER_PAGE = 3;

// const ActiveContestPipeline = ({
//   data = [],
//   total = 0,
//   onRowClick = () => {},
// }) => {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [page, setPage] = useState(1);

//   // 🔍 Search + Filter Logic
//   const filteredData = useMemo(() => {
//     let result = [...data];

//     // Search
//     if (search) {
//       result = result.filter((item) =>
//         item.title.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // Filter
//     if (filter !== "all") {
//       result = result.filter((item) => item.status === filter);
//     }

//     return result;
//   }, [data, search, filter]);

//   // 📄 Pagination Logic
//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

//   const paginatedData = useMemo(() => {
//     const start = (page - 1) * ITEMS_PER_PAGE;
//     return filteredData.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredData, page]);

//   return (
//     <div className="bg-[#f8fafc] p-5 rounded-2xl shadow-sm">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h2 className="font-semibold text-gray-800 text-lg">
//             Active Contest Pipeline
//           </h2>
//           <p className="text-sm text-gray-400">
//             Real-time status of current academic challenges
//           </p>
//         </div>

//         {/* Search + Filter */}
//         <div className="flex gap-2">
//           {/* Search */}
//           <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200">
//             <Search size={16} className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search contests..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//               className="outline-none text-sm"
//             />
//           </div>

//           {/* Filter */}
//           <select
//             value={filter}
//             onChange={(e) => {
//               setFilter(e.target.value);
//               setPage(1);
//             }}
//             className="px-3 py-2 bg-white border rounded-lg text-sm"
//           >
//             <option value="all">All</option>
//             <option value="active">Active</option>
//             <option value="draft">Draft</option>
//             <option value="evaluating">Evaluating</option>
//           </select>
//         </div>
//       </div>

//       {/* Table Header */}
//       <div className="grid grid-cols-5 text-xs text-gray-400 px-3 py-2">
//         <span>CONTEST TITLE</span>
//         <span>DATE WINDOW</span>
//         <span>PARTICIPANTS</span>
//         <span>STATUS</span>
//         <span className="text-right">ACTIONS</span>
//       </div>

//       {/* Rows */}
//       <div className="space-y-2">
//         {paginatedData.length === 0 ? (
//           <p className="text-center text-gray-400 py-6">
//             No contests found
//           </p>
//         ) : (
//           paginatedData.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => onRowClick(item)}
//               className="grid grid-cols-5 items-center bg-white p-3 rounded-xl border border-gray-100 hover:shadow-md hover:bg-[#82C600]/5 transition cursor-pointer"
//             >
//               {/* Title */}
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg bg-[#82C600]/10 text-[#82C600] flex items-center justify-center">
//                   {item.icon || "📘"}
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">
//                     {item.title}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     {item.subtitle}
//                   </p>
//                 </div>
//               </div>

//               {/* Date */}
//               <div>
//                 <p className="text-sm text-gray-700">{item.date}</p>
//                 <p className="text-xs text-gray-400">{item.remaining}</p>
//               </div>

//               {/* Participants */}
//               <div className="text-sm text-gray-700 font-medium">
//                 {item.participants}
//               </div>

//               {/* Status */}
//               <div>
//                 <StatusBadge status={item.status} />
//               </div>

//               {/* Actions */}
//               <div className="flex justify-end">
//                 <MoreVertical className="text-gray-400" />
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Footer */}
//       <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
//         <p>
//           Showing {paginatedData.length} of {filteredData.length} (Total: {total})
//         </p>

//         {/* Pagination */}
//         <div className="flex gap-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`w-8 h-8 rounded ${
//                 page === i + 1
//                   ? "bg-[#82C600] text-white"
//                   : "bg-gray-100"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActiveContestPipeline;


// import { useState, useMemo } from "react";
// import { MoreVertical, Search } from "lucide-react";

// const StatusBadge = ({ status }) => {
//   const styles = {
//     active: "bg-[#82C600]/20 text-[#82C600]",
//     draft: "bg-gray-200 text-gray-600",
//     evaluating: "bg-blue-100 text-blue-600",
//   };

//   return (
//     <span
//       className={`text-xs px-3 py-1 rounded-full font-medium ${
//         styles[status] || "bg-gray-100 text-gray-600"
//       }`}
//     >
//       {status.toUpperCase()}
//     </span>
//   );
// };

// const ITEMS_PER_PAGE = 3;

// const ActiveContestPipeline = ({
//   data = [],
//   total = 0,
//   onRowClick = () => {},
// }) => {

//   // ✅ LOCAL STATE (IMPORTANT)
//   const [tableData, setTableData] = useState(data);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [page, setPage] = useState(1);

//   // ✅ DELETE
//   const handleDelete = (id) => {
//     const updated = tableData.filter((item) => item.id !== id);
//     setTableData(updated);

//     console.log("🗑️ Deleted Contest ID:", id);
//   };

//   // ✅ EDIT
//   const handleEdit = (item) => {
//     const newTitle = prompt("Edit Title", item.title);
//     if (!newTitle) return;

//     const updated = tableData.map((el) =>
//       el.id === item.id ? { ...el, title: newTitle } : el
//     );

//     setTableData(updated);

//     console.log("✏️ Updated Contest:", item.id);
//   };

//   // 🔍 SEARCH + FILTER
//   const filteredData = useMemo(() => {
//     let result = [...tableData];

//     if (search) {
//       result = result.filter((item) =>
//         item.title.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (filter !== "all") {
//       result = result.filter((item) => item.status === filter);
//     }

//     return result;
//   }, [tableData, search, filter]);

//   // 📄 PAGINATION
//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

//   const paginatedData = useMemo(() => {
//     const start = (page - 1) * ITEMS_PER_PAGE;
//     return filteredData.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredData, page]);

//   return (
//     <div className="bg-[#f8fafc] p-5 rounded-2xl shadow-sm">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h2 className="font-semibold text-gray-800 text-lg">
//             Active Contest Pipeline
//           </h2>
//           <p className="text-sm text-gray-400">
//             Real-time status of current academic challenges
//           </p>
//         </div>

//         {/* SEARCH + FILTER */}
//         <div className="flex gap-2">
//           <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200">
//             <Search size={16} className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search contests..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//               className="outline-none text-sm"
//             />
//           </div>

//           <select
//             value={filter}
//             onChange={(e) => {
//               setFilter(e.target.value);
//               setPage(1);
//             }}
//             className="px-3 py-2 bg-white border rounded-lg text-sm"
//           >
//             <option value="all">All</option>
//             <option value="active">Active</option>
//             <option value="draft">Draft</option>
//             <option value="evaluating">Evaluating</option>
//           </select>
//         </div>
//       </div>

//       {/* TABLE HEADER */}
//       <div className="grid grid-cols-5 text-xs text-gray-400 px-3 py-2">
//         <span>CONTEST TITLE</span>
//         <span>DATE WINDOW</span>
//         <span>PARTICIPANTS</span>
//         <span>STATUS</span>
//         <span className="text-right">ACTIONS</span>
//       </div>

//       {/* ROWS */}
//       <div className="space-y-2">
//         {paginatedData.length === 0 ? (
//           <p className="text-center text-gray-400 py-6">
//             No contests found
//           </p>
//         ) : (
//           paginatedData.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => onRowClick(item)}
//               className="grid grid-cols-5 items-center bg-white p-3 rounded-xl border border-gray-100 hover:shadow-md hover:bg-[#82C600]/5 transition cursor-pointer"
//             >

//               {/* TITLE */}
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg bg-[#82C600]/10 text-[#82C600] flex items-center justify-center">
//                   {item.icon || "📘"}
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">
//                     {item.title}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     {item.subtitle}
//                   </p>
//                 </div>
//               </div>

//               {/* DATE */}
//               <div>
//                 <p className="text-sm text-gray-700">{item.date}</p>
//                 <p className="text-xs text-gray-400">{item.remaining}</p>
//               </div>

//               {/* PARTICIPANTS */}
//               <div className="text-sm text-gray-700 font-medium">
//                 {item.participants}
//               </div>

//               {/* STATUS */}
//               <div>
//                 <StatusBadge status={item.status} />
//               </div>

//               {/* ACTIONS */}
//               <div
//                 className="flex justify-end"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="relative group">
//                   <MoreVertical className="text-gray-400 cursor-pointer" />

//                   {/* DROPDOWN */}
//                   <div className="absolute right-0 mt-2 w-24 bg-white border rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition z-10">

//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
//                     >
//                       Delete
//                     </button>

//                   </div>
//                 </div>
//               </div>

//             </div>
//           ))
//         )}
//       </div>

//       {/* FOOTER */}
//       <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
//         <p>
//           Showing {paginatedData.length} of {filteredData.length} (Total: {total})
//         </p>

//         {/* PAGINATION */}
//         <div className="flex gap-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`w-8 h-8 rounded ${
//                 page === i + 1
//                   ? "bg-[#82C600] text-white"
//                   : "bg-gray-100"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActiveContestPipeline;

import { MoreVertical, Search } from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-[#82C600]/20 text-[#82C600]",
    draft: "bg-gray-200 text-gray-600",
    evaluating: "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status?.toUpperCase()}
    </span>
  );
};

const ActiveContestUI = ({
  data = [],
  loading,
  search,
  setSearch,
  filter,
  setFilter,
  page,
  setPage,
  totalPages,
  onEdit,
  onDelete,
  isEditOpen,
  setIsEditOpen,
  selectedItem,
  setSelectedItem,
  onSave,
}) => {

  // ✅ FIX: SAFE FILTER (NO CRASH)
  const filteredData = data
    ?.filter((item) =>
      (item?.title || "")
        .toLowerCase()
        .includes((search || "").toLowerCase())
    )
    ?.filter((item) =>
      filter === "all" ? true : item?.status === filter
    );

  // ✅ KEEP YOUR UI SAME (only safe)
  const ITEMS_PER_PAGE = 5;
  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPageCount = Math.ceil(
    filteredData.length / ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-400">
        Loading contests...
      </p>
    );
  }

  return (
    <div className="bg-[#f8fafc] p-5 rounded-2xl shadow-sm">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-4">

        <div>
          <h2 className="font-semibold text-gray-800 text-lg">
            Active Contest Pipeline
          </h2>
          <p className="text-sm text-gray-400">
            Real-time status of current academic challenges
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex gap-2">

          <div className="flex items-center bg-white px-3 py-2 rounded-lg border">
            <Search size={16} className="text-gray-400 mr-2" />

            <input
              type="text"
              placeholder="Search contests..."
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm"
            />
          </div>

          <select
            value={filter || "all"}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-white border rounded-lg text-sm"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="evaluating">Evaluating</option>
          </select>

        </div>
      </div>

      {/* 🔥 TABLE HEADER */}
      <div className="grid grid-cols-5 text-xs text-gray-400 px-3 py-2">
        <span>CONTEST TITLE</span>
        <span>DATE WINDOW</span>
        <span>PARTICIPANTS</span>
        <span>STATUS</span>
        <span className="text-right">ACTIONS</span>
      </div>

      {/* 🔥 ROWS */}
      <div className="space-y-2">

        {paginatedData.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            No contests found
          </p>
        ) : (
          paginatedData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 items-center bg-white p-3 rounded-xl border hover:shadow-md hover:bg-[#82C600]/5 transition"
            >

              {/* TITLE */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#82C600]/10 flex items-center justify-center">
                  {item.icon || "📘"}
                </div>

                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-400">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* DATE */}
              <div>
                <p className="text-sm">{item.date}</p>
                <p className="text-xs text-gray-400">
                  {item.remaining}
                </p>
              </div>

              {/* PARTICIPANTS */}
              <div className="text-sm font-medium">
                {item.participants}
              </div>

              {/* STATUS */}
              <div>
                <StatusBadge status={item.status} />
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end">
                <div className="relative group">
                  <MoreVertical className="cursor-pointer" />

                  <div className="absolute right-0 mt-2 w-24 bg-white border rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition z-10">

                    <button
                      onClick={() => onEdit?.(item)}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete?.(item.id)}
                      className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              </div>

            </div>
          ))
        )}

      </div>

      {/* 🔥 PAGINATION */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">

        <p>Page {page}</p>

        <div className="flex gap-2">
          {Array.from({ length: totalPageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded ${
                page === i + 1
                  ? "bg-[#82C600] text-white"
                  : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>

      {/* 🔥 MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl w-[350px]">

            <h2 className="text-lg font-semibold mb-4">
              Edit Contest
            </h2>

            <input
              className="w-full border p-2 mb-3 rounded"
              value={selectedItem?.title || ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  title: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setIsEditOpen(false)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={onSave}
                className="px-3 py-1 bg-[#82C600] text-white rounded"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ActiveContestUI;