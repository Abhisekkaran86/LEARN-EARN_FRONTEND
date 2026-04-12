import useStudentDashboard from "@/features/student/hooks/useStudentDashboard";
import StudentDashboardView from "@/features/student/components/StudentDashboardView";

const StudentDashboardPage = () => {
  const state = useStudentDashboard();
  return <StudentDashboardView {...state} />;
};

export default StudentDashboardPage;

