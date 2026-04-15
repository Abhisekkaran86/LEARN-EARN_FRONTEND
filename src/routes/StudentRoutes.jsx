import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import StudentLayout from "@/components/layout/StudentLayout";
import StudentDashboardPage from "@/features/student/pages/StudentDashboardPage";
import ContestParticipatePage from "@/features/student/pages/ContestParticipatePage";
import MyContestsPage from "@/features/student/pages/MyContestsPage";
import SubmissionManagerPage from "@/features/student/pages/SubmissionManagerPage";
import ContestsPage from "@/features/contest/pages/ContestsPage";
import {
  LayoutDashboard,
  Trophy,
  ClipboardList,
  Medal,
  Mail,
} from "lucide-react";
import LeaderboardPage from "../features/student/pages/LeaderboardPage";
import MyInvitations from "../features/student/pages/MyInvitations";

const sidebarMenu = [
  { key: "/student/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { key: "/student/contests", label: "All Contests", icon: <Trophy size={18} /> },
  { key: "/student/my-contests", label: "My Contests", icon: <ClipboardList size={18} /> },
  { key: "/student/leaderboard", label: "Leaderboard", icon: <Medal size={18} /> },
  { key: "/student/my-invitations", label: "Invitations", icon: <Mail size={18} /> },
];

const StudentRoutes = () => {
  return (
    <Route
      path="/student"
      element={
        <ProtectedRoute role="student">
          <StudentLayout sidebar={sidebarMenu} />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<StudentDashboardPage />} />
      <Route path="contests" element={<ContestsPage />} />
      <Route path="my-contests" element={<MyContestsPage />} />
      <Route path="leaderboard" element={<LeaderboardPage />} />
      <Route path="my-invitations" element={<MyInvitations />} />
      <Route
        path="invites"
        element={<Navigate to="/student/my-invitations" replace />}
      />
      <Route path="submit/:id" element={<SubmissionManagerPage />} />
      <Route path="contest/:id" element={<ContestParticipatePage />} />
    </Route>
  );
};

export default StudentRoutes;
