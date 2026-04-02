import useStudentDashboard from "../modules/student/useStudentDashboard";
import StudentDashboardView from "../modules/student/StudentDashboardView";

const StudentDashboardContainer = () => {
  const state = useStudentDashboard();

  return <StudentDashboardView {...state} />;
};

export default StudentDashboardContainer;