// import Sidebar from "../../../components/ui/Sidebar";
// import Header from "../../../components/ui/Header";
// import StatCard from "../../../components/ui/StatCard";
// import Chart from "../../../components/ui/Chart";
// import Table from "../../../components/ui/Table";
// import ActionPanel from "../../../components/ui/ActionPanel";

// const AdminDashboardView = ({
//   stats,
//   tableData,
//   chartData,
//   sidebar,
//   tableConfig,
//   actions,
// }) => {

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       <Sidebar
//         menu={sidebar}
//         active="dashboard"
//         onMenuClick={(item) => console.log(item)}
//       />/

//       <div className="flex-1 p-6">
//         {/* <Header /> */}

//         {/* Cards */}
//         <div className="grid grid-cols-4 gap-4 mb-6">
//           {stats.map((item, i) => (
//             <StatCard key={i} {...item} />
//           ))}
//         </div>

//         {/* Chart + Actions */}
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <Chart data={chartData} />
//           <ActionPanel actions={actions} />
//         </div>

//         {/* Table */}
//         <Table data={tableData} config={tableConfig} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardView;

import StatCard from "../../../components/ui/StatCard";
import Chart from "../../../components/ui/Chart";
import ActionPanel from "../../../components/ui/ActionPanel";
import ActiveContestPipeline from "./ActiveContestUI";
import ActiveContestUI from "./ActiveContestUI";

const AdminDashboardView = ({
  stats = [],
  chartData = [],
  children,
  actions = [],
}) => {
  return (
    <div className="space-y-6">

      {/* ✅ STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <StatCard key={item.id || i} {...item} />
        ))}
      </div>

      {/* ✅ CHART + ACTION PANEL */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        
        {/* Chart */}
        <div className="xl:col-span-2">
          <Chart data={chartData} />
        </div>

        {/* Action Panel */}
        <div>
          <ActionPanel actions={actions} />
        </div>

      </div>

      {/* ✅ ACTIVE CONTEST TABLE */}
      <ActiveContestUI />
  
    </div>
  );
};

export default AdminDashboardView;