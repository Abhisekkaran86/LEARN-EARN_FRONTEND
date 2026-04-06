// import Sidebar from "../components/ui/Sidebar";
// import AdminHeader from "../modules/admin/view/AdminHeader";
// import { Outlet, useLocation } from "react-router-dom";

// const AdminLayout = ({ sidebar = [] }) => {
//   const location = useLocation();

//   return (
//     <div className="bg-[#f5f7fb] min-h-screen">

//       {/* ✅ FIXED SIDEBAR */}
//       <div className="fixed top-0 left-0 w-64 h-screen bg-[#eef2f7] border-r z-50">
//         <Sidebar menu={sidebar} title="Admin Panel" role="admin" />
//       </div>

//       {/* ✅ MAIN CONTENT */}
//       <div className="ml-64">

//         {/* HEADER */}
//         <div className="sticky top-0 z-40 bg-[#f5f7fb] px-6 pt-4 mb-6">
//           <AdminHeader/>
//         </div>

//         {/* 🔥 PAGE CONTENT */}
//         <div className="px-6 pb-6">
//           <Outlet />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import Sidebar from "../components/ui/Sidebar";
import AdminHeader from "../modules/admin/view/AdminHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AdminLayout = ({ sidebar = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;

  // ❌ Hide on dashboard
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
    <div className="bg-[#f5f7fb] min-h-screen">

      {/* ✅ FIXED SIDEBAR */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-[#eef2f7] border-r z-50">
        <Sidebar menu={sidebar} title="Admin Panel" role="admin" />
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="ml-64">

        {/* HEADER */}
        <div className="sticky top-0 z-40 bg-[#f5f7fb] px-6 pt-4">
          <AdminHeader />
        </div>

        {/* 🔥 GLOBAL BACK BUTTON */}
        {!hideBack && (
          <div className="px-6 mt-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl 
              bg-white shadow-sm border border-gray-200
              hover:bg-[#82C600] hover:text-white 
              transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        )}

        {/* 🔥 PAGE CONTENT */}
        <div className="px-6 pb-6 mt-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;