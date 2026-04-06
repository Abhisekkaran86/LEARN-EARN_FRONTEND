import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import StudentLayout from "../layouts/StudentLayout";
import StudentDashboardContainer from "../containers/StudentDashboardContainer";

import { LayoutDashboard, BookOpen, ClipboardList, Trophy } from "lucide-react";
import ContestParticipatePage from "../modules/student/ContestParticipatePage";

// ✅ Sidebar menu (dynamic)
const sidebarMenu = [
  {
    key: "/student/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    key: "/student/courses",
    label: "Courses",
    icon: <BookOpen size={18} />,
  },
  {
    key: "/student/assignments",
    label: "Assignments",
    icon: <ClipboardList size={18} />,
  },
  {
    key: "/student/leaderboard",
    label: "Leaderboard",
    icon: <Trophy size={18} />,
  },
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
      <Route path="dashboard" element={<StudentDashboardContainer />} />

      {/* Future routes */}
      <Route path="contest/:id" element={<ContestParticipatePage />} />


      <Route path="courses" element={<div>Courses Page</div>} />
      <Route path="assignments" element={<div>Assignments Page</div>} />
      <Route path="leaderboard" element={<div>Leaderboard Page</div>} />
    </Route>
  );
};

export default StudentRoutes;