// const Table = ({ data, config }) => {
//   return (
//     <div className="bg-white p-5 rounded-2xl shadow-sm">
//       <h2 className="font-semibold mb-4">{config.title}</h2>

//       <table className="w-full text-sm">
//         <thead className="text-gray-500">
//           <tr>
//             {config.columns.map((col, i) => (
//               <th key={i} className="py-2 text-left">
//                 {col.label}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row, i) => (
//             <tr key={i} className="border-t">
//               {config.columns.map((col, j) => (
//                 <td key={j} className="py-3">
//                   {col.key === "status" ? (
//                     <span
//                       className={`px-2 py-1 rounded text-xs ${
//                         row[col.key] === "active"
//                           ? "bg-[#82C600]/20 text-[#82C600]"
//                           : "bg-[#FFD700]/30"
//                       }`}
//                     >
//                       {row[col.key]}
//                     </span>
//                   ) : (
//                     row[col.key]
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table

// const Table = ({ data = [], config = {} }) => {
//   const columns = config?.columns || [];

//   return (
//     <div className="bg-white p-5 rounded-2xl shadow-sm">
//       <h2 className="font-semibold mb-4">
//         {config?.title || "Table"}
//       </h2>

//       <table className="w-full text-sm">
//         <thead className="text-gray-500">
//           <tr>
//             {columns.map((col, i) => (
//               <th key={i} className="py-2 text-left">
//                 {col.label}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row, i) => (
//             <tr key={i} className="border-t">
//               {columns.map((col, j) => (
//                 <td key={j} className="py-3">
//                   {col.key === "status" ? (
//                     <span
//                       className={`px-2 py-1 rounded text-xs ${
//                         row[col.key] === "active"
//                           ? "bg-[#82C600]/20 text-[#82C600]"
//                           : "bg-[#FFD700]/30"
//                       }`}
//                     >
//                       {row[col.key] || "-"}
//                     </span>
//                   ) : (
//                     row[col.key] || "-"
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

// 