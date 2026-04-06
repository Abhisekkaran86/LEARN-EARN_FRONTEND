

// import axios from "axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
// import DashboardModal from "../containers/DashboardModal";

// const AdminDashboardContainer = () => {
//   const [statsArray, setStatsArray] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [chartData, setChartData] = useState([]);

//   // ✅ Modal states
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [modalData, setModalData] = useState([]);

//   // ✅ Store full API data
//   const [dashboardData, setDashboardData] = useState({});

//   const fetchDashboard = async () => {
//     try {
//       const res = await axios.get(
//         "https://learn-earn-contest-2.onrender.com/api/v1/dashboard"
//       );

//       const data = res.data.data;

//       setDashboardData(data);

//       // ✅ Stats
//       const formattedStats = [
//         { title: "ACTIVE CONTESTS", value: data.activeContests, icon: "contest" },
//         { title: "TOTAL USERS", value: data.totalUsers, icon: "users" },
//         { title: "TOTAL SUBMISSIONS", value: data.totalSubmissions, icon: "submissions" },
//         {
//           title: "PENDING APPROVALS",
//           value: data.pendingApprovals,
//           type: "warning",
//           icon: "pending",
//         },
//         { title: "COMPLETED CONTESTS", value: data.completedContests, icon: "completed" },
//       ];

//       setStatsArray(formattedStats);

//       // ✅ Chart
//       const chart = [
//         { name: "Users", value: data.totalUsers },
//         { name: "Submissions", value: data.totalSubmissions },
//         { name: "Active", value: data.activeContests },
//         { name: "Completed", value: data.completedContests },
//       ];

//       setChartData(chart);

//     } catch (err) {
//       console.error("Error fetching dashboard:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   // ✅ Card Click Handler
//   const handleCardClick = (type) => {
//   setModalType(type);

//   if (type === "ACTIVE CONTESTS") {
//     setModalData(dashboardData.activeContestList?.list || []);
//   } 
//   else if (type === "TOTAL USERS") {
//     setModalData(dashboardData.users?.list || []);
//   } 
//   else if (type === "TOTAL SUBMISSIONS") {
//     setModalData(dashboardData.submissions?.list || []);
//   } 
//   else if (type === "PENDING APPROVALS") {
//     setModalData(dashboardData.pendingList?.list || []);
//   } 
//   else {
//     setModalData([]);
//   }

//   setModalOpen(true);
// };
//   if (loading) {
//     return <div className="p-6">Loading dashboard...</div>;
//   }

//   return (
//     <>
//       <AdminDashboardView
//         stats={statsArray}
//         chartData={chartData}
//         onCardClick={handleCardClick}
//       />

//       {/* ✅ Modal */}
//       <DashboardModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalType}
//         data={modalData}
//       />
//     </>
//   );
// };

// export default AdminDashboardContainer;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
// import DashboardModal from "../containers/DashboardModal";

// const AdminDashboardContainer = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const [modalType, setModalType] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/dashboard"
//         );

//         console.log("API DATA:", res.data);

//         const api = res.data.data; // ✅ FIX

//         // ✅ TRANSFORM DATA (IMPORTANT)
//         const formattedData = {
//           activeContestList: api.activeContests,
//           completedContestList: api.completedContests,

//           users: {
//             count: api.totalUsers,
//             list: [],
//           },

//           submissions: {
//             count: api.totalSubmissions,
//             list: [],
//           },

//           pendingList: {
//             count: api.pendingApprovals,
//             list: [],
//           },
//         };

//         setDashboardData(formattedData); // ✅ FIX
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ SAME CLICK HANDLER (no change)
//   const keyMap = {
//     "ACTIVE CONTESTS": "activeContestList",
//     "TOTAL USERS": "users",
//     "TOTAL SUBMISSIONS": "submissions",
//     "PENDING APPROVALS": "pendingList",
//   };

//   const handleCardClick = (type) => {
//   setModalType(type);

//   const keyMap = {
//     "ACTIVE CONTESTS": "activeContestList",
//     "TOTAL USERS": "users",
//     "TOTAL SUBMISSIONS": "submissions",
//     "PENDING APPROVALS": "pendingList",
//   };

//   const key = keyMap[type];
//   const data = dashboardData[key];

//   let finalData = [];

//   // ✅ CASE 1: object with list
//   if (data && typeof data === "object" && Array.isArray(data.list)) {
//     finalData = data.list;
//   }
//   // ✅ CASE 2: number (users, submissions, pending)
//   else if (typeof data === "number") {
//     finalData = [{ value: data }];
//   }

//   console.log("Clicked:", type);
//   console.log("Final Data:", finalData);

//   setModalData(finalData);
//   setModalOpen(true);
// };

//   return (
//     <>
//       <AdminDashboardView
//         dashboardData={dashboardData}
//         onCardClick={handleCardClick}
//       />

//       <DashboardModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         data={modalData}
//         title={modalType}
//       />
//     </>
//   );
// };

// export default AdminDashboardContainer;

import axios from "axios";
import { useEffect, useState } from "react";
import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
import DashboardModal from "../containers/DashboardModal";

const AdminDashboardContainer = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalType, setModalType] = useState("");

  // ✅ NEW: chart state
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://learn-earn-contest-2.onrender.com/api/v1/dashboard"
        );

        console.log("API DATA:", res.data);

        const api = res.data.data;

        // ✅ your existing logic (UNCHANGED)
        const formattedData = {
          activeContestList: api.activeContests,
          completedContestList: api.completedContests,

          users: {
            count: api.totalUsers,
            list: [],
          },

          submissions: {
            count: api.totalSubmissions,
            list: [],
          },

          pendingList: {
            count: api.pendingApprovals,
            list: [],
          },
        };

        setDashboardData(formattedData);

        // ✅ NEW: chart data (ADDED ONLY)
        const chartFormatted = [
          { name: "Active", value: api.activeContests?.count || 0 },
          { name: "Completed", value: api.completedContests?.count || 0 },
          { name: "Users", value: api.totalUsers || 0 },
          { name: "Submissions", value: api.totalSubmissions || 0 },
          { name: "Pending", value: api.pendingApprovals || 0 },
        ];

        console.log("CHART DATA:", chartFormatted);

        setChartData(chartFormatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // ✅ click handler (UNCHANGED)
  const handleCardClick = (type) => {
    setModalType(type);

    const keyMap = {
      "ACTIVE CONTESTS": "activeContestList",
      "TOTAL USERS": "users",
      "TOTAL SUBMISSIONS": "submissions",
      "PENDING APPROVALS": "pendingList",
    };

    const key = keyMap[type];
    const data = dashboardData[key];

    let finalData = [];

    if (data && typeof data === "object" && Array.isArray(data.list)) {
      finalData = data.list;
    } else if (typeof data === "number") {
      finalData = [{ value: data }];
    }

    setModalData(finalData);
    setModalOpen(true);
  };

  return (
    <>
      <AdminDashboardView
        dashboardData={dashboardData}
        chartData={chartData}   
        onCardClick={handleCardClick}
      />

      <DashboardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalData}
        title={modalType}
      />
    </>
  );
};

export default AdminDashboardContainer;