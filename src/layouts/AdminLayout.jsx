import Sidebar from "../components/ui/Sidebar";
import AdminHeader from "../modules/admin/view/AdminHeader";
import { Outlet, useLocation } from "react-router-dom";

const AdminLayout = ({ sidebar = [] }) => {
  const location = useLocation();

  return (
    <div className="bg-[#f5f7fb] min-h-screen">

      {/* ✅ FIXED SIDEBAR */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-[#eef2f7] border-r z-50">
        <Sidebar menu={sidebar} title="Admin Panel" role="admin" />
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="ml-64">

        {/* HEADER */}
        <div className="sticky top-0 z-40 bg-[#f5f7fb] px-6 pt-4 mb-6">
          <AdminHeader/>
        </div>

        {/* 🔥 PAGE CONTENT */}
        <div className="px-6 pb-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;