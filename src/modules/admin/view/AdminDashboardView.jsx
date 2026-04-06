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

// import StatCard from "../../../components/ui/StatCard";
// import Chart from "../../../components/ui/Chart";
// import ActionPanel from "../../../components/ui/ActionPanel";

// import ActiveContestContainer from "./ActiveContestContainer";

// const AdminDashboardView = ({
//   stats = [],
//   chartData = [],
//   children,
//   actions = [],
// }) => {
//   return (
//     <div className="space-y-6">

//       {/* ✅ STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//         {stats.map((item, i) => (
//           <StatCard key={item.id || i} {...item} />
//         ))}
//       </div>

//       {/* ✅ CHART + ACTION PANEL */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

//         {/* Chart */}
//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <Chart data={chartData} />
//         </div>

//         {/* Action Panel */}
//         <div>
//           <ActionPanel actions={actions} />
//         </div>

//       </div>

//       {/* Active Contests */}
//       <ActiveContestContainer />

//     </div>
//   );
// };

// export default AdminDashboardView;


import StatCard from "../../../components/ui/StatCard";
import Chart from "../../../components/ui/Chart";
import ActionPanel from "../../../components/ui/ActionPanel";
import ActiveContestContainer from "./ActiveContestContainer";

const AdminDashboardView = ({
  stats = [],
  chartData = [],
  actions = [],
  onCardClick,
}) => {
  return (
    <div className="space-y-6">

      {/* ✅ STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((item, i) => (
          <div key={i} onClick={() => onCardClick(item.title)} className="cursor-pointer">
            <StatCard {...item} />
          </div>
        ))}
      </div>

      {/* ✅ CHART + ACTION PANEL */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* ✅ CHART (Bigger Section) */}
        <div className="xl:col-span-3 bg-white p-6 rounded-2xl shadow-sm h-[420px] flex flex-col">



          <Chart data={chartData} />

        </div>

        {/* ✅ ACTION PANEL */}
        <div className="xl:col-span-2">
          <ActionPanel actions={actions} />
        </div>

      </div>

      {/* ✅ ACTIVE CONTESTS */}
      <ActiveContestContainer />

    </div>
  );
};

export default AdminDashboardView;