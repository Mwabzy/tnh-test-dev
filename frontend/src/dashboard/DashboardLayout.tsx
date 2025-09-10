import { FC } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const DashboardLayout: FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
