import { Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import CreateContestView from "@/features/admin/pages/CreateContestPage";
import AdminSubmissions from "@/features/admin/pages/AdminSubmissionPage";
import UsersPage from "@/features/admin/pages/UsersPage";

import { LayoutDashboard, Trophy, ClipboardCheck, Users, BarChart3Icon } from "lucide-react";
import { FiAward, FiBarChart2 } from "react-icons/fi";
import ContestsPage from "../features/contest/pages/ContestsPage";
import WinnersPage from "../features/admin/pages/WinnerPage";
import EvaluationDashboard from "../features/admin/components/EvaluationDashboard";
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
      <Route path="/admin/submission" element={<AdminSubmissions />} />
      <Route path="all-contests" element={<ContestsPage />} />
      <Route path="winners" element={<WinnersPage />} />
      <Route path="/admin/winner/:id" element={<WinnerDetailPage />} />
    </Route>
  );
};


export default AdminRoutes;
