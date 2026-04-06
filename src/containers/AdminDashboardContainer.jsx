

// import axios from "axios";
// import AdminDashboardView from "../modules/admin/view/AdminDashboardView";


// const AdminDashboardContainer = () => {
// const API = axios.create({
//   baseURL: "https://learn-earn-contest-2.onrender.com/api/v1/dashboard",
// });



//   const dashboardData = {




//     chartData: [
//       { name: "Jan", users: 200, revenue: 1000, contests: 5 },
//       { name: "Feb", users: 300, revenue: 1500, contests: 7 },
//       { name: "Mar", users: 500, revenue: 2000, contests: 10 },
//       { name: "Apr", users: 400, revenue: 1800, contests: 8 },
//       { name: "May", users: 700, revenue: 2500, contests: 12 },
//       { name: "Jun", users: 650, revenue: 2400, contests: 11 },
//       { name: "Jul", users: 800, revenue: 3000, contests: 14 },
//       { name: "Aug", users: 750, revenue: 2800, contests: 13 },
//       { name: "Sep", users: 900, revenue: 3500, contests: 16 },
//       { name: "Oct", users: 1000, revenue: 4000, contests: 18 },
//       { name: "Nov", users: 1100, revenue: 4500, contests: 20 },
//       { name: "Dec", users: 1200, revenue: 5000, contests: 22 },
//     ]
//   };

//   const statsArray = [
//   {
//     title: "ACTIVE CONTESTS",
//     value: 18,
//     highlight: "+3 this week",
//     icon: "contest",
//   },
//   {
//     title: "TOTAL USERS",
//     value: "12,540",
//     highlight: "+5.4%",
//     icon: "users",
//   },
//   {
//     title: "TOTAL SUBMISSIONS",
//     value: "3,842",
//     highlight: "+12%",
//     icon: "submissions",
//   },
//   {
//     title: "PENDING APPROVALS",
//     value: 96,
//     type: "warning",
//     highlight: "Needs review",
//     icon: "pending",
//   },

//   {
//     title: "COMPLETED CONTESTS",
//     value: 42,
//     highlight: "Last 30 days",
//     icon: "completed",
//   },
// ];






//   return (
//     <AdminDashboardView
//       stats={statsArray}

//       chartData={dashboardData.chartData}



//     />
//   );
// };

// export default AdminDashboardContainer;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "../modules/admin/view/AdminDashboardView";

// const AdminDashboardContainer = () => {
//   const [statsArray, setStatsArray] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchDashboard = async () => {
//     try {
//       const res = await axios.get(
//         "https://learn-earn-contest-2.onrender.com/api/v1/dashboard"
//       );

//       const data = res.data.data; // 🔥 FIX HERE

//       console.log("Admin data", data);

//       const formattedStats = [
//         {
//           title: "ACTIVE CONTESTS",
//           value: data.activeContests,
//           icon: "contest",
//         },
//         {
//           title: "TOTAL USERS",
//           value: data.totalUsers,
//           icon: "users",
//         },
//         {
//           title: "TOTAL SUBMISSIONS",
//           value: data.totalSubmissions,
//           icon: "submissions",
//         },
//         {
//           title: "PENDING APPROVALS",
//           value: data.pendingApprovals,
//           type: "warning",
//           icon: "pending",
//         },
//         {
//           title: "COMPLETED CONTESTS",
//           value: data.completedContests,
//           icon: "completed",
//         },
//       ];

//       setStatsArray(formattedStats);
//     } catch (err) {
//       console.error("Error fetching dashboard:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const chartData = [
//   { name: "Users", value: data.totalUsers },
//   { name: "Submissions", value: data.totalSubmissions },
//   { name: "Active", value: data.activeContests },
//   { name: "Completed", value: data.completedContests },
// ];

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   // ⏳ Loading state
//   if (loading) {
//     return <div className="p-6">Loading dashboard...</div>;
//   }

//   return <AdminDashboardView stats={statsArray} />;
// };

// export default AdminDashboardContainer;


// import axios from "axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "../modules/admin/view/AdminDashboardView";

// const AdminDashboardContainer = () => {
//   const [statsArray, setStatsArray] = useState([]);
//  // ✅ ADD THIS
//   const [loading, setLoading] = useState(true);
//   const [chartData, setChartData] = useState([]);
// const [selectedType, setSelectedType] = useState("all");

//   const fetchDashboard = async () => {
//     try {
//       const res = await axios.get(
//         "https://learn-earn-contest-2.onrender.com/api/v1/dashboard"
//       );

//       const data = res.data.data;

//       console.log("Admin data", data);

//       // ✅ Stats
//       const formattedStats = [
//         {
//           title: "ACTIVE CONTESTS",
//           value: data.activeContests,
//           icon: "contest",
//         },
//         {
//           title: "TOTAL USERS",
//           value: data.totalUsers,
//           icon: "users",
//         },
//         {
//           title: "TOTAL SUBMISSIONS",
//           value: data.totalSubmissions,
//           icon: "submissions",
//         },
//         {
//           title: "PENDING APPROVALS",
//           value: data.pendingApprovals,
//           type: "warning",
//           icon: "pending",
//         },
//         {
//           title: "COMPLETED CONTESTS",
//           value: data.completedContests,
//           icon: "completed",
//         },
//       ];

//       setStatsArray(formattedStats);

//       // 🔥 Chart Data (FIX HERE)
//       const chart = [
//         { name: "Users", value: data.totalUsers },
//         { name: "Submissions", value: data.totalSubmissions },
//         { name: "Active", value: data.activeContests },
//         { name: "Completed", value: data.completedContests },
//       ];

//       setChartData(chart); // ✅ IMPORTANT

//     } catch (err) {
//       console.error("Error fetching dashboard:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   if (loading) {
//     return <div className="p-6">Loading dashboard...</div>;
//   }

//   return (
//     <AdminDashboardView
//       stats={statsArray}
//       chartData={chartData} // ✅ PASS TO VIEW
//     />
//   );
// };

// export default AdminDashboardContainer;

import axios from "axios";
import { useEffect, useState } from "react";
import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
import DashboardModal from "../containers/DashboardModal";

const AdminDashboardContainer = () => {
  const [statsArray, setStatsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  // ✅ Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState([]);

  // ✅ Store full API data
  const [dashboardData, setDashboardData] = useState({});

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "https://learn-earn-contest-2.onrender.com/api/v1/dashboard"
      );

      const data = res.data.data;

      setDashboardData(data);

      // ✅ Stats
      const formattedStats = [
        { title: "ACTIVE CONTESTS", value: data.activeContests, icon: "contest" },
        { title: "TOTAL USERS", value: data.totalUsers, icon: "users" },
        { title: "TOTAL SUBMISSIONS", value: data.totalSubmissions, icon: "submissions" },
        {
          title: "PENDING APPROVALS",
          value: data.pendingApprovals,
          type: "warning",
          icon: "pending",
        },
        { title: "COMPLETED CONTESTS", value: data.completedContests, icon: "completed" },
      ];

      setStatsArray(formattedStats);

      // ✅ Chart
      const chart = [
        { name: "Users", value: data.totalUsers },
        { name: "Submissions", value: data.totalSubmissions },
        { name: "Active", value: data.activeContests },
        { name: "Completed", value: data.completedContests },
      ];

      setChartData(chart);

    } catch (err) {
      console.error("Error fetching dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ✅ Card Click Handler
  const handleCardClick = (type) => {
    setModalType(type);

    if (type === "ACTIVE CONTESTS") {
      setModalData(dashboardData.activeContestList || []);
    } else if (type === "TOTAL USERS") {
      setModalData(dashboardData.users || []);
    } else if (type === "TOTAL SUBMISSIONS") {
      setModalData(dashboardData.submissions || []);
    } else if (type === "PENDING APPROVALS") {
      setModalData(dashboardData.pendingList || []);
    } else {
      setModalData([]);
    }

    setModalOpen(true);
  };

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <>
      <AdminDashboardView
        stats={statsArray}
        chartData={chartData}
        onCardClick={handleCardClick}
      />

      {/* ✅ Modal */}
      <DashboardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalType}
        data={modalData}
      />
    </>
  );
};

export default AdminDashboardContainer;