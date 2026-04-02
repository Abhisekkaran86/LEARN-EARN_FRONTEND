// import { Route } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
// import AdminLayout from "../layouts/AdminLayout"; 
// import AdminDashboardContainer from "../containers/AdminDashboardContainer";
// import CreateContestView from "../modules/admin/view/CreateContestView";
// import { LayoutDashboard, Trophy, ClipboardCheck } from "lucide-react";

// const sidebarMenu = [
//   {
//     key: "/admin/dashboard",
//     label: "Dashboard",
//     icon: <LayoutDashboard size={18} />,
//   },
//   {
//     key: "/admin/create-contest",
//     label: "Contests",
//     icon: <Trophy size={18} />,
//   },
//   {
//     key: "/admin/submission",
//     label: "Submission",
//     icon: <ClipboardCheck size={18} />,
//   },
// ];

 
// const AdminRoutes = () => {
//   return (
//     <Route
//       path="/admin"
//       element={
//         <ProtectedRoute role="admin">
//           <AdminLayout sidebar={sidebarMenu} />
//         </ProtectedRoute>
//       }
//     >
//       <Route path="dashboard" element={<AdminDashboardContainer />} />
//       <Route path="create-contest" element={<CreateContestView />} />
//     </Route>
//   );
// };

// export default AdminRoutes;


import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboardContainer from "../containers/AdminDashboardContainer";
import CreateContestView from "../modules/admin/view/CreateContestView";
import { LayoutDashboard, Trophy, ClipboardCheck } from "lucide-react";

const sidebarMenu = [
  {
    key: "/admin/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    key: "/admin/create-contest",
    label: "Contests",
    icon: <Trophy size={18} />,
  },
  {
    key: "/admin/submission",
    label: "Submission",
    icon: <ClipboardCheck size={18} />,
  },
];

const AdminRoutes = () => {
  return (
    <Route
      path="/admin"
      element={
        <ProtectedRoute role="admin">
          <AdminLayout sidebar={sidebarMenu} />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<AdminDashboardContainer />} />
      <Route path="create-contest" element={<CreateContestView />} />
    </Route>
  );
};

export default AdminRoutes;