// import Sidebar from "../components/ui/Sidebar";
// import { Outlet } from "react-router-dom";

// const StudentLayout = ({ sidebar }) => {
//   return (
//     <div className="flex min-h-screen bg-[#f8fafc]">

//       {/* Sidebar */}
//       <Sidebar menu={sidebar} title="Student Panel" role="student" />

//       {/* Main Content */}
//       <div className="flex-1 p-4 md:p-6">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default StudentLayout;

import Sidebar from "../components/ui/Sidebar";
import StudentHeader from "../modules/student/StudentHeader";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const StudentLayout = ({ sidebar }) => {
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
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">

      {/* 🔥 FIXED SIDEBAR */}
      <div className="w-[260px] md:w-[280px] lg:w-[300px] fixed left-0 top-0 h-full z-40">
        <Sidebar menu={sidebar} title="Student Panel" role="student" />
      </div>

      {/* 🔥 MAIN CONTENT (SHIFTED RIGHT) */}
      <div className="flex-1 flex flex-col ml-[260px] md:ml-[280px] lg:ml-[300px]">

        {/* 🔥 FIXED HEADER */}
        <div className="sticky top-0 z-30 bg-[#f8fafc] px-4 md:px-6 pt-4 pb-2">
          <StudentHeader />
        </div>

        {/* 🔥 SCROLLABLE CONTENT ONLY */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">

          {/* BACK BUTTON */}
          {!hideBack && (
            <div className="mb-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 rounded-xl 
                bg-white shadow-sm border border-gray-200
                hover:bg-[#82C600] hover:text-white 
                hover:shadow-md transition-all duration-300"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            </div>
          )}

          {/* CONTENT CARD */}
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm min-h-[600px]">
            <div className="max-w-[1400px] mx-auto">
              <Outlet />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentLayout;