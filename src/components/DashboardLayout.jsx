import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex md:flex-row flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
