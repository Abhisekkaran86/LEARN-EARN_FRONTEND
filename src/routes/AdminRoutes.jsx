import { Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import ContestAdminPage from "@/features/admin/pages/ContestAdminPage";
import CreateContestView from "@/features/admin/pages/CreateContestPage";
import SubmissionAdminPage from "@/features/admin/pages/SubmissionAdminPage";
import UsersPage from "@/features/admin/pages/UsersPage";
import WinnerAdminPage from "@/features/admin/pages/WinnerAdminPage";

import { LayoutDashboard, Trophy, ClipboardCheck, Users, BarChart3Icon } from "lucide-react";
import { FiAward, FiBarChart2 } from "react-icons/fi";
import EvaluationDashboard from "../features/admin/components/AdminEvaluationDashboard";
import WinnerDetailPage from "../features/admin/pages/WinnerDetailPage";

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
    key: "/admin/all-contests",
    label: "All Contests",
    icon: <BarChart3Icon size={18} />, 
  },
  {
    key: "/admin/submission",
    label: "Submission",
    icon: <ClipboardCheck size={18} />,
  },
  {
    label: "Users",
    key: "/admin/users",
    icon: <Users size={18} />,
  },
  {
    key: "/admin/evaluation",
    icon: <FiBarChart2 />,
    label: "Evaluation",
  },

  {
  key: "/admin/winners",
  icon: <FiAward />,
  label: "Winners",
}
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
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="create-contest" element={<CreateContestView />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="evaluation" element={<EvaluationDashboard />} />
      <Route path="/admin/submission" element={<SubmissionAdminPage />} />
      <Route path="all-contests" element={<ContestAdminPage />} />
      <Route path="winners" element={<WinnerAdminPage />} />
      <Route path="/admin/winner/:id" element={<WinnerDetailPage />} />
    </Route>
  );
};


export default AdminRoutes;
