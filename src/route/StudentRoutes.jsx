import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import StudentLayout from "../layouts/StudentLayout";
import StudentDashboardContainer from "../containers/StudentDashboardContainer";

import { LayoutDashboard, BookOpen, ClipboardList, Trophy, Medal, History } from "lucide-react";
import ContestParticipatePage from "../modules/student/ContestParticipatePage";
import MyContestsPage from "../modules/student/MyContestsPage";
import ContestsPage from "../pages/ContestsPage";
import SubmissionPage from "../modules/student/SubmissionPage";




const sidebarMenu = [
  {
    key: "/student/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    key: "/student/contests",
    label: "All Contests",
    icon: <Trophy size={18} />,
  },
  {
    key: "/student/my-contests",
    label: "My Contests",
    icon: <ClipboardList size={18} />,
  },
  {
    key: "/student/leaderboard",
    label: "Leaderboard",
    icon: <Medal size={18} />,
  },
  {
    key: "/student/history",
    label: "History",
    icon: <History size={18} />,
  },
];

const StudentRoutes = () => {
  return (
    <Route path="/student" element={
  <ProtectedRoute role="student">
    <StudentLayout sidebar={sidebarMenu} />
  </ProtectedRoute>
}>

  <Route path="dashboard" element={<StudentDashboardContainer />} />
  <Route path="contests" element={<ContestsPage/>} />
  <Route path="my-contests" element={<MyContestsPage/>} />
  <Route path="leaderboard" element={<div>Leaderboard Page</div>} />
  <Route path="history" element={<div>History Page</div>} />
  <Route path="submit/:id" element={<SubmissionPage />} />


  {/* contest participate */}
  <Route path="contest/:id" element={<ContestParticipatePage />} />

</Route>
  );
};

export default StudentRoutes;