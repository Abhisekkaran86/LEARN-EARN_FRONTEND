// import axios from "axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "@/features/admin/components/AdminDashboardView";
// import DashboardModal from "@/features/admin/components/DashboardModal";
// import { useSelector } from "react-redux";

// const AdminDashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const [modalType, setModalType] = useState("");
//   const [chartData, setChartData] = useState([]);
//   const [loadingModal, setLoadingModal] = useState(false);
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

//   // DASHBOARD FETCH
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           "https://learn-earn-contest-3.onrender.com/api/v1/dashboard"
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
//             count: api.submissions?.total || 0,
//             list: [],
//           },
//           pendingList: {
//             count: api.submissions?.pending || 0,
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

//   // HANDLE CARD CLICK
//   const handleCardClick = async (type) => {
//     setModalType(type);
//     setModalOpen(true);
//     setSelectedContest(null);

//     const token = reduxToken || localStorage.getItem("token");

//     if (!token) {
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
//             "https://learn-earn-contest-3.onrender.com/api/v1/auth/users",
//             config
//           );
//           finalData = extractData(res);
//           break;

//         case "TOTAL SUBMISSIONS":
//           res = await axios.get(
//             "https://learn-earn-contest-3.onrender.com/api/v1/submission/submitted-contests-count",
//             config
//           );
//           finalData = extractData(res);
//           break;

//         case "ACTIVE CONTESTS":
//           res = await axios.get(
//             "https://learn-earn-contest-3.onrender.com/api/v1/contest/active",
//             config
//           );
//           const allData = extractData(res);
//           finalData = allData.filter(
//             (item) => item.status?.toLowerCase() === "active"
//           );
//           break;

//         case "PENDING APPROVALS":
//           res = await axios.get(
//             "https://learn-earn-contest-3.onrender.com/api/v1/pending",
//             config
//           );
//           finalData = extractData(res);
//           break;

//         default:
//           finalData = [];
//       }

//       setModalData(Array.isArray(finalData) ? finalData : []);
//     } catch (err) {
//       console.error("MODAL FETCH ERROR:", err.response?.data || err.message);
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//       }
//       setModalData([]);
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

// export default AdminDashboardPage;


// import API from "../../../services/axios"; // ✅ FIXED (was axios)
// import { useEffect, useState } from "react";
// import AdminDashboardView from "@/features/admin/components/AdminDashboardView";
// import DashboardModal from "@/features/admin/components/DashboardModal";
// import { useSelector } from "react-redux";

// const AdminDashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const [modalType, setModalType] = useState("");
//   const [chartData, setChartData] = useState([]);
//   const [loadingModal, setLoadingModal] = useState(false);
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

//   // DASHBOARD FETCH
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await API.get("/dashboard"); // ✅ FIXED

//         const api = res?.data?.data || {};

//         const formattedData = {
//           activeContestList: api.activeContests || [],
//           completedContestList: api.completedContests || [],
//           users: {
//             count: api.totalUsers || 0,
//             list: [],
//           },
//           submissions: {
//             count: api.submissions?.total || 0,
//             list: [],
//           },
//           pendingList: {
//             count: api.submissions?.pending || 0,
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

//   // HANDLE CARD CLICK
//   const handleCardClick = async (type) => {
//     setModalType(type);
//     setModalOpen(true);
//     setSelectedContest(null);

//     const token = reduxToken || localStorage.getItem("token");

//     if (!token) {
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
//           res = await API.get("/auth/users", config); // ✅ FIXED
//           finalData = extractData(res);
//           break;

//         case "TOTAL SUBMISSIONS":
//           res = await API.get(
//             "/submission/submitted-contests-count",
//             config
//           ); // ✅ FIXED
//           finalData = extractData(res);
//           break;

//         case "ACTIVE CONTESTS":
//           res = await API.get("/contest/active", config); // ✅ FIXED
//           const allData = extractData(res);
//           finalData = allData.filter(
//             (item) => item.status?.toLowerCase() === "active"
//           );
//           break;

//         case "PENDING APPROVALS":
//           res = await API.get("/pending", config); // ✅ FIXED
//           finalData = extractData(res);
//           break;

//         default:
//           finalData = [];
//       }

//       setModalData(Array.isArray(finalData) ? finalData : []);
//     } catch (err) {
//       console.error("MODAL FETCH ERROR:", err.response?.data || err.message);
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//       }
//       setModalData([]);
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

// export default AdminDashboardPage;



// import API from "../../../services/axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "@/features/admin/components/AdminDashboardView";
// import DashboardModal from "@/features/admin/components/DashboardModal";
// import { useSelector } from "react-redux";

// const AdminDashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const [modalType, setModalType] = useState("");
//   const [chartData, setChartData] = useState([]);
//   const [loadingModal, setLoadingModal] = useState(false);
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

//   // DASHBOARD FETCH
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await API.get("/dashboard");

//         const api = res?.data?.data || {};

//         const formattedData = {
//           activeContestList: api.activeContests || [],
//           completedContestList: api.completedContests || [],
//           users: {
//             count: api.totalUsers || 0,
//             list: [],
//           },
//           submissions: {
//             count: api.submissions?.total || 0,
//             list: [],
//           },
//           pendingList: {
//             count: api.submissions?.pending || 0,
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

//   // HANDLE CARD CLICK
//   const handleCardClick = async (type) => {
//     setModalType(type);
//     setModalOpen(true);
//     setSelectedContest(null);

//     const token = reduxToken || localStorage.getItem("token");

//     if (!token) {
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
//           res = await API.get("/auth/users", config);
//           finalData = extractData(res);
//           break;

//         case "TOTAL SUBMISSIONS":
//           res = await API.get(
//             "/submission/submitted-contests-count",
//             config
//           );
//           finalData = extractData(res);
//           break;

//         case "ACTIVE CONTESTS":
//           res = await API.get("/contest/active", config);
//           const allData = extractData(res);
//           finalData = allData.filter(
//             (item) => item.status?.toLowerCase() === "active"
//           );
//           break;

//         case "PENDING APPROVALS":
//           res = await API.get("/pending", config);
//           finalData = extractData(res);
//           break;

//         // 🔥 ✅ EVALUATION (NO BACKEND CHANGE)
//         case "EVALUATION":
//           res = await API.get(
//             "/submission/submitted-contests-count",
//             config
//           );

//           const contests = extractData(res);

//           // 🔥 FLATTEN ALL SUBMISSIONS
//           finalData = contests.flatMap((contest) =>
//             (contest.submissionDetails || []).map((sub) => ({
//               ...sub,
//               contest: {
//                 _id: contest._id,
//                 title: contest.title,
//               },
//             }))
//           );

//           break;

//         default:
//           finalData = [];
//       }

//       setModalData(Array.isArray(finalData) ? finalData : []);
//     } catch (err) {
//       console.error("MODAL FETCH ERROR:", err.response?.data || err.message);
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//       }
//       setModalData([]);
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

// export default AdminDashboardPage;


// import API from "../../../services/axios";
// import { useEffect, useState } from "react";
// import AdminDashboardView from "@/features/admin/components/AdminDashboardView";
// import DashboardModal from "@/features/admin/components/DashboardModal";
// import { useSelector } from "react-redux";

// const AdminDashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState(null); // ✅ FIX (was [])
//   const [modalType, setModalType] = useState("");
//   const [chartData, setChartData] = useState([]);
//   const [loadingModal, setLoadingModal] = useState(false);
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

//   // ================= DASHBOARD FETCH =================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await API.get("/dashboard");
//         const api = res?.data?.data || {};

//         const formattedData = {
//           activeContestList: api.activeContests || [],
//           completedContestList: api.completedContests || [],
//           users: {
//             count: api.totalUsers || 0,
//             list: [],
//           },
//           submissions: {
//             count: api.submissions?.total || 0,
//             list: [],
//           },
//           pendingList: {
//             count: api.submissions?.pending || 0,
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

//   // ================= HANDLE CARD CLICK =================
//   const handleCardClick = async (type) => {
//     setModalType(type);
//     setModalOpen(true);
//     setSelectedContest(null);

//     const token = reduxToken || localStorage.getItem("token");

//     if (!token) {
//       setModalData(null);
//       return;
//     }

//     setLoadingModal(true);

//     try {
//       let res;
//       let finalData = null;

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       switch (type) {
//         // ================= TOTAL USERS =================
//         case "TOTAL USERS":
//           res = await API.get("/auth/users", config);
//           const users = extractData(res);

//           finalData = {
//             totalUsers: users.length,
//             usersList: users, // optional if you want list also
//           };
//           break;

//         // ================= ACTIVE CONTESTS =================
//         case "ACTIVE CONTESTS":
//           res = await API.get("/contest/active", config);
//           const contests = extractData(res);

//           const active = contests.filter(
//             (item) => item.status?.toLowerCase() === "active"
//           );

//           finalData = {
//             totalActiveContests: active.length,
//             contestList: active,
//           };
//           break;

//         // ================= TOTAL SUBMISSIONS =================
//         case "TOTAL SUBMISSIONS":
//           res = await API.get(
//             "/submission/submitted-contests-count",
//             config
//           );
//           finalData = extractData(res); // keep array (modal supports this)
//           break;

//         // ================= PENDING =================
//         case "PENDING APPROVALS":
//           res = await API.get("/pending", config);
//           finalData = extractData(res);
//           break;

//         // ================= EVALUATION =================
//         case "EVALUATION":
//           res = await API.get(
//             "/submission/submitted-contests-count",
//             config
//           );

//           const contestsEval = extractData(res);

//           finalData = contestsEval.flatMap((contest) =>
//             (contest.submissionDetails || []).map((sub) => ({
//               ...sub,
//               contest: {
//                 _id: contest._id,
//                 title: contest.title,
//               },
//             }))
//           );

//           break;

//         // ================= DASHBOARD STATS (OPTIONAL PRO) =================
//         case "DASHBOARD STATS":
//           const usersRes = await API.get("/auth/users", config);
//           const contestRes = await API.get("/contest/active", config);

//           const usersData = extractData(usersRes);
//           const contestData = extractData(contestRes);

//           finalData = {
//             totalUsers: usersData.length,
//             totalActiveContests: contestData.filter(
//               (c) => c.status?.toLowerCase() === "active"
//             ).length,
//           };
//           break;

//         default:
//           finalData = null;
//       }

//       // ✅ FIX (IMPORTANT)
//       setModalData(finalData);

//     } catch (err) {
//       console.error("MODAL FETCH ERROR:", err.response?.data || err.message);
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//       }
//       setModalData(null);
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
//         data={modalData} // ✅ now supports object + array
//         title={modalType}
//         loading={loadingModal}
//         selectedContest={selectedContest}
//         onContestClick={handleContestClick}
//         setSelectedContest={setSelectedContest}
//       />
//     </>
//   );
// };

// export default AdminDashboardPage;


import API from "../../../services/axios";
import { useEffect, useState } from "react";
import AdminDashboardView from "@/features/admin/components/AdminDashboardView";
import DashboardModal from "@/features/admin/components/DashboardModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ ADDED

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);

  const reduxToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate(); // ✅ ADDED

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

  // ================= DASHBOARD FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/dashboard");
        const api = res?.data?.data || {};

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

  // ================= HANDLE CARD CLICK =================
  const handleCardClick = async (type) => {

    // ✅ ONLY CHANGE: USERS → NAVIGATE PAGE
    if (type === "TOTAL USERS") {
      navigate("/admin/users");
      return;
    }

    setModalType(type);
    setModalOpen(true);
    setSelectedContest(null);

    const token = reduxToken || localStorage.getItem("token");

    if (!token) {
      setModalData(null);
      return;
    }

    setLoadingModal(true);

    try {
      let res;
      let finalData = null;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      switch (type) {

        // ❌ USERS CASE REMOVED (NOW NAVIGATES)

        case "ACTIVE CONTESTS":
          res = await API.get("/contest/active", config);
          const contests = extractData(res);

          const active = contests.filter(
            (item) => item.status?.toLowerCase() === "active"
          );

          finalData = {
            totalActiveContests: active.length,
            contestList: active,
          };
          break;

        case "TOTAL SUBMISSIONS":
          res = await API.get(
            "/submission/submitted-contests-count",
            config
          );
          finalData = extractData(res);
          break;

        case "PENDING APPROVALS":
          res = await API.get("/pending", config);
          finalData = extractData(res);
          break;

        case "EVALUATION":
          res = await API.get(
            "/submission/submitted-contests-count",
            config
          );

          const contestsEval = extractData(res);

          finalData = contestsEval.flatMap((contest) =>
            (contest.submissionDetails || []).map((sub) => ({
              ...sub,
              contest: {
                _id: contest._id,
                title: contest.title,
              },
            }))
          );

          break;

        case "DASHBOARD STATS":
          const usersRes = await API.get("/auth/users", config);
          const contestRes = await API.get("/contest/active", config);

          const usersData = extractData(usersRes);
          const contestData = extractData(contestRes);

          finalData = {
            totalUsers: usersData.length,
            totalActiveContests: contestData.filter(
              (c) => c.status?.toLowerCase() === "active"
            ).length,
          };
          break;

        default:
          finalData = null;
      }

      setModalData(finalData);

    } catch (err) {
      console.error("MODAL FETCH ERROR:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
      setModalData(null);
    } finally {
      setLoadingModal(false);
    }
  };

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

export default AdminDashboardPage;