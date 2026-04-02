// import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
// import { Home, Users, Book, Settings } from "lucide-react";


// const AdminDashboardContainer = () => {
//   // 🔥 Raw Data
//   const dashboardData = {
//     stats: {
//       totalUsers: 1250,
//       totalStudents: 980,
//       totalAdmins: 5,
//       totalCourses: 45,
//       totalRevenue: 75600,
//     },

//     recentUsers: [
//       { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", role: "student" },
//       { id: 2, name: "Priya Singh", email: "priya@gmail.com", role: "student" },
//       { id: 3, name: "Admin User", email: "admin@gmail.com", role: "admin" },
//     ],

//     chartData: [
//       { name: "Jan", users: 200 },
//       { name: "Feb", users: 300 },
//       { name: "Mar", users: 500 },
//       { name: "Apr", users: 400 },
//       { name: "May", users: 700 },
//     ],
//   };

//   // ✅ Convert stats object → array (IMPORTANT)
//   const statsArray = [
//     { title: "Total Users", value: dashboardData.stats.totalUsers },
//     { title: "Students", value: dashboardData.stats.totalStudents },
//     { title: "Admins", value: dashboardData.stats.totalAdmins },
//     { title: "Courses", value: dashboardData.stats.totalCourses },
//     { title: "Revenue", value: dashboardData.stats.totalRevenue },
//   ];

//   const tableConfig = {
//   title: "Recent Users",
//   columns: [
//     { label: "Name", key: "name" },
//     { label: "Email", key: "email" },
//     { label: "Role", key: "role" },
//   ],
// };
//   // ✅ Sidebar menu
//   const sidebar = [
//     { title: "Dashboard" },
//     { title: "Users" },
//     { title: "Courses" },
//   ];

//   // ✅ Actions
//   const actions = [
//     { label: "Add User", onClick: () => alert("Add User") },
//     { label: "Add Course", onClick: () => alert("Add Course") },
//   ];
//   const sidebarMenu = [
//   {
//     key: "dashboard",
//     label: "Dashboard",
//     icon: <Home size={18} />,
//   },
//   {
//     key: "users",
//     label: "Users",
//     icon: <Users size={18} />,
//     children: [
//       { key: "all-users", label: "All Users" },
//       { key: "admins", label: "Admins" },
//     ],
//   },
//   {
//     key: "courses",
//     label: "Courses",
//     icon: <Book size={18} />,
//   },
//   {
//     key: "settings",
//     label: "Settings",
//     icon: <Settings size={18} />,
//   },
// ];



//   const loading = false;
//   const error = null;

//   return (
//     <AdminDashboardView
//       stats={statsArray}
//       tableData={dashboardData.recentUsers}
//       chartData={dashboardData.chartData}
//       sidebar={sidebarMenu}
//       tableConfig={tableConfig}
//       actions={actions}
//     />
//   );
// };

// export default AdminDashboardContainer;

import AdminDashboardView from "../modules/admin/view/AdminDashboardView";
import { Home, FileText, ClipboardCheck } from "lucide-react";
import { PlusCircle, Eye, FileDown, } from "lucide-react";


const AdminDashboardContainer = () => {
  const dashboardData = {
  

    

    chartData: [
      { name: "Jan", users: 200, revenue: 1000, contests: 5 },
      { name: "Feb", users: 300, revenue: 1500, contests: 7 },
      { name: "Mar", users: 500, revenue: 2000, contests: 10 },
      { name: "Apr", users: 400, revenue: 1800, contests: 8 },
      { name: "May", users: 700, revenue: 2500, contests: 12 },
      { name: "Jun", users: 650, revenue: 2400, contests: 11 },
      { name: "Jul", users: 800, revenue: 3000, contests: 14 },
      { name: "Aug", users: 750, revenue: 2800, contests: 13 },
      { name: "Sep", users: 900, revenue: 3500, contests: 16 },
      { name: "Oct", users: 1000, revenue: 4000, contests: 18 },
      { name: "Nov", users: 1100, revenue: 4500, contests: 20 },
      { name: "Dec", users: 1200, revenue: 5000, contests: 22 },
    ]
  };

  const statsArray = [
    {
      title: "ACTIVE CONTESTS",
      value: 24,
      highlight: "+12%",
      icon: "users",
    },
    {
      title: "TOTAL SUBMISSIONS",
      value: "1,842",
      highlight: "+8%",
      icon: "submissions",
    },
    {
      title: "PENDING TASKS",
      value: 156,
      type: "warning",
      icon: "pending",
    },
    {
      title: "TOTAL REWARDS",
      value: "45.2k",
      icon: " revenue",
    },
  ];
  
 
  
  const contestData = [
  {
    title: "MERN Stack Hackathon",
    subtitle: "Full Stack Development Challenge",
    date: "Apr 10 - May 10",
    remaining: "15 days remaining",
    participants: 950,
    status: "active",
    icon: "💻",
  },
  {
    title: "UI/UX Design Sprint",
    subtitle: "Mobile App Experience",
    date: "Apr 15 - Apr 25",
    remaining: "10 days remaining",
    participants: 620,
    status: "active",
    icon: "🎨",
  },
  {
    title: "Digital Marketing Mastery",
    subtitle: "SEO & Ads Campaign",
    date: "May 01 - May 20",
    remaining: "Starts in 5 days",
    participants: 780,
    status: "draft",
    icon: "📢",
  },
  {
    title: "React Frontend Challenge",
    subtitle: "Component Architecture",
    date: "Apr 05 - Apr 18",
    remaining: "5 days remaining",
    participants: 1100,
    status: "active",
    icon: "⚛️",
  },
  {
    title: "Node.js Backend Battle",
    subtitle: "API & Authentication",
    date: "May 10 - May 25",
    remaining: "Starts in 2 weeks",
    participants: 540,
    status: "draft",
    icon: "🟢",
  },
  {
    title: "E-commerce UI Challenge",
    subtitle: "User-Centered Design",
    date: "Mar 20 - Apr 10",
    remaining: "Closed for evaluation",
    participants: 1300,
    status: "evaluating",
    icon: "🛒",
  },
  {
    title: "Full Stack Project Build",
    subtitle: "MERN Real-world App",
    date: "Apr 01 - May 01",
    remaining: "12 days remaining",
    participants: 870,
    status: "active",
    icon: "🚀",
  },
  {
    title: "Social Media Campaign",
    subtitle: "Instagram Growth Strategy",
    date: "Apr 18 - Apr 28",
    remaining: "Starts in 3 days",
    participants: 410,
    status: "draft",
    icon: "📱",
  },
  {
    title: "Dashboard UI Challenge",
    subtitle: "Admin Panel Design",
    date: "Apr 07 - Apr 20",
    remaining: "8 days remaining",
    participants: 690,
    status: "active",
    icon: "📊",
  },
  {
    title: "MongoDB Data Modeling",
    subtitle: "Database Optimization",
    date: "May 05 - May 15",
    remaining: "Starts in 1 week",
    participants: 300,
    status: "draft",
    icon: "🍃",
  },
];
  const actions = [
    {
      label: "Create New Contest",
      description: "Start a new competition",
      icon: <PlusCircle size={18} />,
    },
    {
      label: "View All Submissions",
      description: "Check user entries",
      icon: <Eye size={18} />,
    },
    {
      label: "Export Detailed Report",
      description: "Download analytics",
      icon: <FileDown size={18} />,
    },
  ];

  return (
    <AdminDashboardView
      stats={statsArray}
      tableData={dashboardData.recentUsers}
      chartData={dashboardData.chartData}
     
      data={contestData}
      actions={actions}
    />
  );
};

export default AdminDashboardContainer;