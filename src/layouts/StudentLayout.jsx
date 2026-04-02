import Sidebar from "../components/ui/Sidebar";
import { Outlet } from "react-router-dom";

const StudentLayout = ({ sidebar }) => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">

      {/* Sidebar */}
      <Sidebar menu={sidebar} title="Student Panel" role="student" />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;