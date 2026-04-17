import Sidebar from "@/components/ui/Sidebar";
import StudentPanelHeader from "@/features/student/components/StudentPanelHeader";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const StudentLayout = ({ sidebar = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const hideBack = path === "/student" || path === "/student/dashboard";

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="dashboard-shell flex min-h-screen w-full overflow-x-hidden lg:h-screen lg:overflow-hidden">
      <Sidebar menu={sidebar} title="Student Panel" role="student" />
      <div className="flex-1 min-w-0 overflow-y-auto pt-16 lg:pt-0">
        <div className="sticky top-0 z-40 px-3 pt-3 sm:px-4 md:px-6 md:pt-4">
          <StudentPanelHeader />
        </div>
        {!hideBack && (
          <div className="mt-3 px-3 sm:px-4 md:px-6">
            <button
              onClick={handleBack}
              className="theme-back-button flex items-center gap-2 px-3 py-1.5 transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        )}
        <div className="mt-4 px-3 pb-6 sm:px-4 md:px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
