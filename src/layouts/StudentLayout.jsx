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

// import Sidebar from "../components/ui/Sidebar";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const StudentLayout = ({ sidebar }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const path = location.pathname;

//   // ❌ Hide on dashboard
//   const hideBack =
//     path === "/student" || path === "/student/dashboard";

//   const handleBack = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate("/student/dashboard");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#f8fafc]">

//       {/* Sidebar */}
//       <Sidebar menu={sidebar} title="Student Panel" role="student" />

//       {/* Main Content */}
//       <div className="flex-1 p-4 md:p-6">

//         {/* 🔥 GLOBAL BACK BUTTON */}
//         {!hideBack && (
//           <div className="mb-4">
//             <button
//               onClick={handleBack}
//               className="flex items-center gap-2 px-3 py-1.5 rounded-xl 
//               bg-white shadow-sm border border-gray-200
//               hover:bg-[#82C600] hover:text-white 
//               hover:shadow-md hover:translate-x-[-2px]
//               transition-all duration-300"
//             >
//               <ArrowLeft size={18} />
//               Back
//             </button>
//           </div>
//         )}

//         {/* Page Content */}
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default StudentLayout;
import Sidebar from "../components/ui/Sidebar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const StudentLayout = ({ sidebar, isModalOpen = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  // ✅ FIXED
  const hideBack =
    path === "/student" ||
    path === "/student/dashboard" ||
    isModalOpen;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {/* Sidebar */}
      <Sidebar menu={sidebar} title="Student Panel" role="student" />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {!hideBack && (
          <div className="mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl 
              bg-white shadow-sm border border-gray-200
              hover:bg-[#82C600] hover:text-white 
              hover:shadow-md hover:translate-x-[-2px]
              transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;