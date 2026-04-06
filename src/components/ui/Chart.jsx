

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const Chart = ({ data = [] }) => {
//   return (
//     <div className="bg-white p-5 rounded-2xl shadow-sm col-span-2">
//       <h3 className="mb-4 font-semibold">User Growth</h3>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />

//           {/* MUST MATCH "users" */}
//           <Bar dataKey="users" fill="#82C600" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Chart;

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
    <div className="bg-white p-5 rounded-2xl shadow-sm col-span-2">
      <h3 className="mb-4 font-semibold">Dashboard Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          {/* ✅ FIXED */}
          <Bar dataKey="value" fill="#82C600" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

