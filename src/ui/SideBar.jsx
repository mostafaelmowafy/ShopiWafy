import { RiDashboardLine } from "react-icons/ri";
import Logo from "../ui/Logo";
import { NavLink } from "react-router-dom";
import { CiMemoPad } from "react-icons/ci";
import { LuUsersRound } from "react-icons/lu";
import { useState } from "react";
import { BiSolidArrowFromLeft, BiSolidArrowFromRight } from "react-icons/bi";

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className=" fixed top-24 left-1 z-50">
      {!isOpen && (
        <div className=" bg-gray-800 dark:bg-gray-900 p-2 pl-1 rounded-r-3xl">
          <BiSolidArrowFromLeft
            className=" text-slate-300 text-2xl hover:text-white hover:scale-110 duration-500 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      )}
      {isOpen && (
        <nav className=" dark:text-slate-100 text-center border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 shadow-md border-r h-screen fixed top-0 left-0 min-w-[250px] py-6 overflow-hidden">
          <Logo />
          <ul className="pt-2 space-y-14 w-full border-t border-slate-400 transition-all duration-300">
            <div className=" bg-gray-800 dark:bg-gray-900 p-2 pl-1 rounded-l-3xl float-end -mr-1">
              <BiSolidArrowFromRight
                className="  text-slate-300 text-2xl hover:text-white hover:scale-110 duration-500 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <li className="font-bold ">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center mt-20 ${
                    isActive
                      ? " hover:text-white dark:text-slate-900 bg-gray-800 dark:bg-gray-100 py-2 px-4 rounded"
                      : " hover:text-white dark:hover:text-slate-900 hover:bg-gray-800 dark:hover:bg-gray-100 py-2 px-4 rounded transition-all duration-200"
                  }`
                }
              >
                <p className="flex items-center">
                  <RiDashboardLine className="mr-2 text-2xl inline" />
                  <span className="text-xl">Dashboard</span>
                </p>
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive
                      ? " hover:text-white dark:text-slate-900 bg-gray-800 dark:bg-gray-100 py-2 px-4 rounded"
                      : " hover:text-white dark:hover:text-slate-900 hover:bg-gray-800 dark:hover:bg-gray-100 py-2 px-4 rounded transition-all duration-200"
                  }`
                }
              >
                <p className="flex items-center">
                  <CiMemoPad className="mr-2 text-2xl inline" />
                  <span className="text-xl">Orders</span>
                </p>
              </NavLink>
            </li>
            <li className="font-bold">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive
                      ? " hover:text-white dark:text-slate-900 bg-gray-800 dark:bg-gray-100 py-2 px-4 rounded"
                      : " hover:text-white dark:hover:text-slate-900 hover:bg-gray-800 dark:hover:bg-gray-100 py-2 px-4 rounded transition-all duration-200"
                  }`
                }
              >
                <p className="flex items-center">
                  <LuUsersRound className="mr-2 text-2xl inline" />
                  <span className="text-xl">Users</span>
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default SideBar;
