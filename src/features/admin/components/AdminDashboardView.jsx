

import StatCard from "@/components/ui/StatCard";
import Chart from "@/components/ui/Chart";
import ActionPanel from "@/components/ui/ActionPanel";
import ActiveContestContainer from "@/features/admin/pages/ActiveContestPage";

const AdminDashboardView = ({
  stats = [],
  chartData = [],
  actions = [],
  onCardClick,
  dashboardData = {},
}) => {
  const cards = [
    { title: "ACTIVE CONTESTS", key: "activeContestList", icon: "users" },
    { title: "TOTAL USERS", key: "users", icon: "users" },
    { title: "TOTAL SUBMISSIONS", key: "submissions", icon: "submissions" },
    { title: "PENDING APPROVALS", key: "pendingList", icon: "pending" },
  ];

  return (
    <div className="space-y-6">

      {/* ✅ STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => onCardClick(card.title)}
            className="cursor-pointer"
          >
            <StatCard
              title={card.title}
              value={dashboardData[card.key]?.count || 0}
              icon={card.icon}
            />
          </div>
        ))}
      </div>

      {/* ✅ CHART + ACTION PANEL */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* ✅ CHART */}
        <div className="theme-surface xl:col-span-3 rounded-2xl p-4 sm:p-6">
          
         
            <Chart data={chartData} dataKey="value" />
          

        </div>

        {/* ✅ ACTION PANEL */}
        <div className="xl:col-span-2">
          <ActionPanel actions={actions} />
        </div>

      </div>

      {/* ✅ ACTIVE CONTESTS */}
      <div className="overflow-x-auto">
        <ActiveContestContainer />
      </div>

    </div>
  );
};

export default AdminDashboardView;
