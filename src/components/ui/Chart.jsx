// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";

// const Chart = ({ data }) => {
//   return (
//     <div className="col-span-2 bg-white p-5 rounded-2xl shadow-sm">
//       <h2 className="font-semibold mb-4">Submission Velocity</h2>

//       <ResponsiveContainer width="100%" height={250}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />

//           <XAxis dataKey="name" />

//           <Tooltip />

//           {/* Primary color */}
//           <Bar dataKey="value" fill="#82C600" radius={[6, 6, 0, 0]} />
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
      <h3 className="mb-4 font-semibold">User Growth</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          {/* MUST MATCH "users" */}
          <Bar dataKey="users" fill="#82C600" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;