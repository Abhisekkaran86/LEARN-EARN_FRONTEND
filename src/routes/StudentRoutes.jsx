import { Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import StudentLayout from "@/components/layout/StudentLayout";
import StudentDashboardPage from "@/features/student/pages/StudentDashboardPage";
import ContestParticipatePage from "@/features/student/pages/ContestParticipatePage";
import MyContestsPage from "@/features/student/pages/MyContestsPage";
import SubmissionPage from "@/features/student/pages/SubmissionPage";
import ContestsPage from "@/features/contest/pages/ContestsPage";
import { LayoutDashboard, Trophy, ClipboardList, Medal, History } from "lucide-react";
import LeaderboardPage from "../features/student/pages/LeaderboardPage";
// import InvitePage from "../components/ui/InvitePage";
// InviteConfirmPage is now a public route in AppRoutes.jsx

const sidebarMenu = [
  { key: "/student/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { key: "/student/contests", label: "All Contests", icon: <Trophy size={18} /> },
  { key: "/student/my-contests", label: "My Contests", icon: <ClipboardList size={18} /> },
  { key: "/student/leaderboard", label: "Leaderboard", icon: <Medal size={18} /> },
  // { key: "/student/history", label: "History", icon: <History size={18} /> },
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
      <Route path="leaderboard" element={<LeaderboardPage/>} />
      {/* <Route path="history" element={<MyHistory/>} /> */}
      <Route path="submit/:id" element={<SubmissionPage />} />
      <Route path="contest/:id" element={<ContestParticipatePage />} />
      {/* <Route path="invites" element={<InvitePage />} /> */}
      {/* invite/confirm is now a public route in AppRoutes.jsx */}
    </Route>
  );
};

export default StudentRoutes;
