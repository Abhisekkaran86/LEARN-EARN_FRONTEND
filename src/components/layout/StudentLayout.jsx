import Sidebar from "@/components/ui/Sidebar";
import StudentPanelHeader from "@/features/student/components/StudentPanelHeader";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const StudentLayout = ({ sidebar = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const hideBack =
    path === "/student" || path === "/student/dashboard";

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="dashboard-shell flex min-h-screen w-full overflow-x-hidden bg-[#f8fafc] dark:bg-gray-950 lg:h-screen lg:overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar menu={sidebar} title="Student Panel" role="student" />

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 overflow-y-auto pt-16 lg:pt-0">

        {/* HEADER */}
        <div className="sticky top-0 z-40 bg-[#f8fafc] dark:bg-gray-900 px-4 md:px-6 pt-4">
          <StudentPanelHeader />
        </div>

        {/* BACK BUTTON */}
        {!hideBack && (
          <div className="px-4 md:px-6 mt-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl 
              bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700
              hover:bg-[#82C600] hover:text-slate-950 
              transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        )}

        {/* CONTENT */}
        <div className="px-4 md:px-6 pb-6 mt-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default StudentLayout;
