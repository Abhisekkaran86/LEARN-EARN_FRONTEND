// import Sidebar from "@/components/ui/Sidebar";
// import AdminHeader from "@/features/admin/components/AdminHeader";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const AdminLayout = ({ sidebar = [] }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const path = location.pathname;

//   const hideBack =
//     path === "/admin" || path === "/admin/dashboard";

//   const handleBack = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate("/admin/dashboard");
//     }
//   };

//   return (
//     <div className="flex h-screen w-full bg-[#f5f7fb] dark:bg-gray-950 overflow-hidden">

//       {/* SIDEBAR */}
//       <Sidebar menu={sidebar} title="Admin Panel" role="admin" />

//       {/* MAIN CONTENT */}
//       <div className="flex-1 overflow-y-auto">

//         {/* HEADER */}
//         <div className="sticky top-0 z-40 bg-[#f5f7fb] dark:bg-gray-900 px-6 pt-4">
//           <AdminHeader />
//         </div>

//         {/* BACK BUTTON */}
//         {!hideBack && (
//           <div className="px-6 mt-3">
//             <button
//               onClick={handleBack}
//               className="flex items-center gap-2 px-3 py-1.5 rounded-xl 
//               bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700
//               hover:bg-[#82C600] hover:text-white 
//               transition-all duration-300"
//             >
//               <ArrowLeft size={18} />
//               Back
//             </button>
//           </div>
//         )}

//         {/* CONTENT */}
//         <div className="px-6 pb-6 mt-4">
//           <Outlet />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import Sidebar from "@/components/ui/Sidebar";
import AdminHeaderBar from "@/features/admin/components/AdminHeaderBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const AdminLayout = ({ sidebar = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const path = location.pathname;

  const hideBack =
    path === "/admin" || path === "/admin/dashboard";

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="dashboard-shell flex min-h-screen w-full overflow-x-hidden bg-[#f5f7fb] dark:bg-gray-950 lg:h-screen lg:overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar menu={sidebar} title="Admin Panel" role="admin" />

      {/* MAIN */}
      <div className="flex-1 min-w-0 overflow-y-auto pt-16 lg:pt-0">

        {/* HEADER */}
        <div className="sticky top-0 z-40 bg-[#f5f7fb] px-4 pt-4 dark:bg-gray-900 md:px-6">
          <AdminHeaderBar onSearch={setSearch} />
        </div>

        {/* BACK BUTTON */}
        {!hideBack && (
          <div className="mt-3 px-4 md:px-6">
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
        <div className="mt-4 px-4 pb-6 md:px-6">
          <Outlet context={{ search }} />
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;
