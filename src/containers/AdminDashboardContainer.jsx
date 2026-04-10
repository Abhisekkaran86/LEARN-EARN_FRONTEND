

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

// import axios from "axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
// import DashboardModal from "../containers/DashboardModal";

// const AdminDashboardContainer = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const [modalType, setModalType] = useState("");

//   // ✅ NEW: chart state
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/dashboard"
//         );

//         console.log("API DATA:", res.data);

//         const api = res.data.data;

//         // ✅ your existing logic (UNCHANGED)
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

//         setDashboardData(formattedData);

//         // ✅ NEW: chart data (ADDED ONLY)
//         const chartFormatted = [
//           { name: "Active", value: api.activeContests?.count || 0 },
//           { name: "Completed", value: api.completedContests?.count || 0 },
//           { name: "Users", value: api.totalUsers || 0 },
//           { name: "Submissions", value: api.totalSubmissions || 0 },
//           { name: "Pending", value: api.pendingApprovals || 0 },
//         ];

//         console.log("CHART DATA:", chartFormatted);

//         setChartData(chartFormatted);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ click handler (UNCHANGED)
//   const handleCardClick = async (type) => {
//     setModalType(type);
//     setModalOpen(true);

//     try {
//       let res;
//       let finalData = [];

//       switch (type) {
//         case "TOTAL USERS":
//           res = await axios.get(
//             "https://learn-earn-contest-2.onrender.com/api/v1/users"
//           );
//           finalData = res.data.data || [];
//           break;

//         case "TOTAL SUBMISSIONS":
//           res = await axios.get(
//             "https://learn-earn-contest-2.onrender.com/api/v1/submissions"
//           );
//           finalData = res.data.data || [];
//           break;

//         case "ACTIVE CONTESTS":
//           res = await axios.get(
//             "https://learn-earn-contest-2.onrender.com/api/v1/contests?status=active"
//           );
//           finalData = res.data.data || [];
//           break;

//         case "PENDING APPROVALS":
//           res = await axios.get(
//             "https://learn-earn-contest-2.onrender.com/api/v1/pending"
//           );
//           finalData = res.data.data || [];
//           break;

//         default:
//           finalData = [];
//       }

//       console.log("MODAL DATA:", finalData);
//       setModalData(finalData);

//     } catch (err) {
//       console.error("MODAL FETCH ERROR:", err);
//       setModalData([]);
//     }
//   };
//   return (
//     <>
//       <AdminDashboardView
//         dashboardData={dashboardData}
//         chartData={chartData}
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

// import axios from "axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
// import DashboardModal from "../containers/DashboardModal";
// import { useSelector } from "react-redux";
// import Cookies from "js-cookie";


// const AdminDashboardContainer = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const [modalType, setModalType] = useState("");
//   const [chartData, setChartData] = useState([]);
//   const [loadingModal, setLoadingModal] = useState(false);
//   const token = useSelector((state) => state.auth.token);
//   // ✅ UNIVERSAL DATA EXTRACTOR (🔥 MAIN FIX)
//   const extractData = (res) => {
//     console.log("FULL API RESPONSE:", res.data);

//     return (
//       res?.data?.data ||
//       res?.data?.users ||
//       res?.data?.contests ||
//       res?.data?.submissions ||
//       res?.data ||
//       []
//     );
//   };

//   // ✅ DASHBOARD FETCH
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/dashboard"
//         );

//         const api = res?.data?.data || {};

//         const formattedData = {
//           activeContestList: api.activeContests || [],
//           completedContestList: api.completedContests || [],

//           users: {
//             count: api.totalUsers || 0,
//             list: [],
//           },

//           submissions: {
//             count: api.totalSubmissions || 0,
//             list: [],
//           },

//           pendingList: {
//             count: api.pendingApprovals || 0,
//             list: [],
//           },
//         };

//         setDashboardData(formattedData);

//         const chartFormatted = [
//           { name: "Active", value: api.activeContests?.count || 0 },
//           { name: "Completed", value: api.completedContests?.count || 0 },
//           { name: "Users", value: api.totalUsers || 0 },
//           { name: "Submissions", value: api.totalSubmissions || 0 },
//           { name: "Pending", value: api.pendingApprovals || 0 },
//         ];

//         setChartData(chartFormatted);
//       } catch (err) {
//         console.error("DASHBOARD FETCH ERROR:", err);
//       }
//     };

//     fetchData();
//   }, []);


// const handleCardClick = async (type) => {
//   setModalType(type);
//   setModalOpen(true);

//   // ✅ GET TOKEN FROM COOKIE
//   const cookieToken = Cookies.get("token");

//   if (!cookieToken) {
//     console.error("No token found in cookies. Please login.");
//     setModalData([]);
//     return;
//   }

//   setLoadingModal(true);

//   try {
//     let res;
//     let finalData = [];

//     const config = {
//       headers: {
//         Authorization: `Bearer ${cookieToken}`,
//       },
//     };

//     switch (type) {
//       case "TOTAL USERS":
//         res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/auth/users",
//           config
//         );
//         finalData = extractData(res);
//         break;

//       case "TOTAL SUBMISSIONS":
//         res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/submission",
//           config
//         );
//         finalData = extractData(res);
//         break;

//       case "ACTIVE CONTESTS":
//         res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/contest/active",
//           config
//         );

//         const allData = extractData(res);

//         finalData = allData.filter(
//           (item) => item.status?.toLowerCase() === "active"
//         );
//         break;

//       case "PENDING APPROVALS":
//         res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/pending",
//           config
//         );
//         finalData = extractData(res);
//         break;

//       default:
//         finalData = [];
//     }

//     console.log("FINAL MODAL DATA:", finalData);
//     setModalData(Array.isArray(finalData) ? finalData : []);

//   } catch (err) {
//     console.error("MODAL FETCH ERROR:", err.response?.data || err.message);

//     if (err.response?.status === 401) {
//       console.error("Unauthorized! Please login again.");
//       Cookies.remove("token"); // 🔥 remove cookie
//     }

//     setModalData([]);
//   } finally {
//     setLoadingModal(false);
//   }
// };
//   return (
//     <>
//       <AdminDashboardView
//         dashboardData={dashboardData}
//         chartData={chartData}
//         onCardClick={handleCardClick}
//       />

//       <DashboardModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         data={modalData}
//         title={modalType}
//         loading={loadingModal}
//       />
//     </>
//   );
// };

// export default AdminDashboardContainer;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
// import DashboardModal from "../containers/DashboardModal";
// import { useSelector } from "react-redux";
// // ❌ removed Cookies

// const AdminDashboardContainer = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const [modalType, setModalType] = useState("");
//   const [chartData, setChartData] = useState([]);
//   const [loadingModal, setLoadingModal] = useState(false);

//   // ✅ get token from redux OR fallback localStorage
//   const reduxToken = useSelector((state) => state.auth.token);

//   // ✅ UNIVERSAL DATA EXTRACTOR
//   const extractData = (res) => {
//     console.log("FULL API RESPONSE:", res.data);

//     return (
//       res?.data?.data ||
//       res?.data?.users ||
//       res?.data?.contests ||
//       res?.data?.submissions ||
//       res?.data ||
//       []
//     );
//   };

//   // ✅ DASHBOARD FETCH
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/dashboard"
//         );

//         const api = res?.data?.data || {};

//         const formattedData = {
//           activeContestList: api.activeContests || [],
//           completedContestList: api.completedContests || [],

//           users: {
//             count: api.totalUsers || 0,
//             list: [],
//           },

//           submissions: {
//             count: api.totalSubmissions || 0,
//             list: [],
//           },

//           pendingList: {
//             count: api.pendingApprovals || 0,
//             list: [],
//           },
//         };

//         setDashboardData(formattedData);

//         const chartFormatted = [
//           { name: "Active", value: api.activeContests?.count || 0 },
//           { name: "Completed", value: api.completedContests?.count || 0 },
//           { name: "Users", value: api.totalUsers || 0 },
//           { name: "Submissions", value: api.totalSubmissions || 0 },
//           { name: "Pending", value: api.pendingApprovals || 0 },
//         ];

//         setChartData(chartFormatted);
//       } catch (err) {
//         console.error("DASHBOARD FETCH ERROR:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ HANDLE CARD CLICK
//   const handleCardClick = async (type) => {
//     setModalType(type);
//     setModalOpen(true);

//     // ✅ get token from redux OR localStorage
//     const token = reduxToken || localStorage.getItem("token");

//     if (!token) {
//       console.error("No token found. Please login.");
//       setModalData([]);
//       return;
//     }

//     setLoadingModal(true);

//     try {
//       let res;
//       let finalData = [];

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       switch (type) {
//         case "TOTAL USERS":
//           res = await axios.get(
//             "https://learn-earn-contest-2.onrender.com/api/v1/auth/users",
//             config
//           );
//           finalData = extractData(res);
//           break;

//         case "TOTAL SUBMISSIONS":
//           res = await axios.get(
//             "https://learn-earn-contest-2.onrender.com/api/v1/submission/submitted-contests-count",
//             config
//           );
//           finalData = extractData(res);
//           break;

//         case "ACTIVE CONTESTS":
//           res = await axios.get(
//             "https://learn-earn-contest-2.onrender.com/api/v1/contest/active",
//             config
//           );

//           const allData = extractData(res);

//           finalData = allData.filter(
//             (item) => item.status?.toLowerCase() === "active"
//           );
//           break;

//         case "PENDING APPROVALS":
//           res = await axios.get(
//             "https://learn-earn-contest-2.onrender.com/api/v1/pending",
//             config
//           );
//           finalData = extractData(res);
//           break;

//         default:
//           finalData = [];
//       }

//       console.log("FINAL MODAL DATA:", finalData);
//       setModalData(Array.isArray(finalData) ? finalData : []);

//     } catch (err) {
//       console.error("MODAL FETCH ERROR:", err.response?.data || err.message);

//       if (err.response?.status === 401) {
//         console.error("Unauthorized! Please login again.");
//         localStorage.removeItem("token"); // ✅ removed cookie logic
//       }

//       setModalData([]);
//     } finally {
//       setLoadingModal(false);
//     }
//   };

//   return (
//     <>
//       <AdminDashboardView
//         dashboardData={dashboardData}
//         chartData={chartData}
//         onCardClick={handleCardClick}
//       />

//       <DashboardModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         data={modalData}
//         title={modalType}
//         loading={loadingModal}
//       />
//     </>
//   );
// };

// export default AdminDashboardContainer;

import axios from "axios";
import { useEffect, useState } from "react";
import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
import DashboardModal from "../containers/DashboardModal";
import { useSelector } from "react-redux";

const AdminDashboardContainer = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalType, setModalType] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);

  // ✅ NEW (drill-down)
  const [selectedContest, setSelectedContest] = useState(null);

  const reduxToken = useSelector((state) => state.auth.token);

  const extractData = (res) => {
    return (
      res?.data?.data ||
      res?.data?.users ||
      res?.data?.contests ||
      res?.data?.submissions ||
      res?.data ||
      []
    );
  };

  // ✅ DASHBOARD FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://learn-earn-contest-3.onrender.com/api/v1/dashboard"
        );

        const api = res?.data?.data || {};
        console.log("dasbor data", res)


        const formattedData = {
          activeContestList: api.activeContests || [],
          completedContestList: api.completedContests || [],

          users: {
            count: api.totalUsers || 0,
            list: [],
          },

          submissions: {
            count: api.submissions?.total || 0,
            list: [],
          },

          pendingList: {
            count: api.submissions?.pending || 0,
            list: [],
          },
        };

        setDashboardData(formattedData);

        const chartFormatted = [
          { name: "Active", value: api.activeContests?.count || 0 },
          { name: "Completed", value: api.completedContests?.count || 0 },
          { name: "Users", value: api.totalUsers || 0 },
          { name: "Submissions", value: api.totalSubmissions || 0 },
          { name: "Pending", value: api.pendingApprovals || 0 },
        ];

        setChartData(chartFormatted);
      } catch (err) {
        console.error("DASHBOARD FETCH ERROR:", err);
      }
    };

    fetchData();
  }, []);

  // ✅ HANDLE CARD CLICK
  const handleCardClick = async (type) => {
    setModalType(type);
    setModalOpen(true);

    // ✅ reset drill-down
    setSelectedContest(null);

    const token = reduxToken || localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please login.");
      setModalData([]);
      return;
    }

    setLoadingModal(true);

    try {
      let res;
      let finalData = [];

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      switch (type) {
        case "TOTAL USERS":
          res = await axios.get(
            "https://learn-earn-contest-3.onrender.com/api/v1/auth/users",
            config
          );
          finalData = extractData(res);
          break;

        case "TOTAL SUBMISSIONS":
          res = await axios.get(
            "https://learn-earn-contest-3.onrender.com/api/v1/submission/submitted-contests-count",
            config
          );
          finalData = extractData(res);
          break;

        case "ACTIVE CONTESTS":
          res = await axios.get(
            "https://learn-earn-contest-3.onrender.com/api/v1/contest/active",
            config
          );

          const allData = extractData(res);

          finalData = allData.filter(
            (item) => item.status?.toLowerCase() === "active"
          );
          break;

        case "PENDING APPROVALS":
          res = await axios.get(
            "https://learn-earn-contest-3.onrender.com/api/v1/pending",
            config
          );
          finalData = extractData(res);
          break;

        default:
          finalData = [];
      }

      setModalData(Array.isArray(finalData) ? finalData : []);
    } catch (err) {
      console.error("MODAL FETCH ERROR:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }

      setModalData([]);
    } finally {
      setLoadingModal(false);
    }
  };

  // ✅ NEW: contest click
  const handleContestClick = (contest) => {
    setSelectedContest(contest);
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
        onClose={() => {
          setModalOpen(false);
          setSelectedContest(null);
        }}
        data={modalData}
        title={modalType}
        loading={loadingModal}
        selectedContest={selectedContest}
        onContestClick={handleContestClick}
        setSelectedContest={setSelectedContest}
      />
    </>
  );
};

export default AdminDashboardContainer;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
// import DashboardModal from "../containers/DashboardModal";
// import { useSelector } from "react-redux";

// const AdminDashboardContainer = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const [modalType, setModalType] = useState("");
//   const [chartData, setChartData] = useState([]);
//   const [loadingModal, setLoadingModal] = useState(false);

//   // ✅ drill-down
//   const [selectedContest, setSelectedContest] = useState(null);

//   const reduxToken = useSelector((state) => state.auth.token);

//   const extractData = (res) => {
//     return (
//       res?.data?.data ||
//       res?.data?.users ||
//       res?.data?.contests ||
//       res?.data?.submissions ||
//       res?.data ||
//       []
//     );
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/dashboard"
//         );

//         const api = res?.data?.data || {};

//         setDashboardData({
//           activeContestList: api.activeContests || [],
//           completedContestList: api.completedContests || [],
//           users: { count: api.totalUsers || 0, list: [] },
//           submissions: { count: api.totalSubmissions || 0, list: [] },
//           pendingList: { count: api.pendingApprovals || 0, list: [] },
//         });

//         setChartData([
//           { name: "Active", value: api.activeContests?.count || 0 },
//           { name: "Completed", value: api.completedContests?.count || 0 },
//           { name: "Users", value: api.totalUsers || 0 },
//           { name: "Submissions", value: api.totalSubmissions || 0 },
//           { name: "Pending", value: api.pendingApprovals || 0 },
//         ]);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCardClick = async (type) => {
//     setModalType(type);
//     setModalOpen(true);
//     setSelectedContest(null);

//     const token = reduxToken || localStorage.getItem("token");

//     try {
//       let res;
//       let finalData = [];

//       const config = {
//         headers: { Authorization: `Bearer ${token}` },
//       };

//       if (type === "TOTAL SUBMISSIONS") {
//         res = await axios.get(
//           "https://learn-earn-contest-2.onrender.com/api/v1/submission/submitted-contests-count",
//           config
//         );
//         finalData = extractData(res);
//       }

//       setModalData(finalData);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingModal(false);
//     }
//   };

//   const handleContestClick = (contest) => {
//     setSelectedContest(contest);
//   };

//   return (
//     <>
//       <AdminDashboardView
//         dashboardData={dashboardData}
//         chartData={chartData}
//         onCardClick={handleCardClick}
//       />

//       <DashboardModal
//         isOpen={modalOpen}
//         onClose={() => {
//           setModalOpen(false);
//           setSelectedContest(null);
//         }}
//         data={modalData}
//         title={modalType}
//         loading={loadingModal}
//         selectedContest={selectedContest}
//         onContestClick={handleContestClick}
//         setSelectedContest={setSelectedContest}
//       />
//     </>
//   );
// };

// export default AdminDashboardContainer;