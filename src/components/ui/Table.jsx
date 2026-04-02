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

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data = [] }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md col-span-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          User Growth Overview
        </h3>
        <span className="text-sm text-gray-500">Monthly</span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          {/* Gradient */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#82C600" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#82C600" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />

          {/* Axes */}
          <XAxis
            dataKey="name"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            cursor={{ fill: "#f9fafb" }}
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
            labelStyle={{ color: "#6b7280" }}
          />

          {/* Bar */}
          <Bar
            dataKey="users"
            fill="url(#barGradient)"
            radius={[10, 10, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;