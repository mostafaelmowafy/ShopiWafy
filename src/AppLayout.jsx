import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import "./styles/style.css";

function AppLayout() {
  return (
    <div className=" bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-950 dark:text-slate-300 min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
