import { AiOutlineProduct } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { RiContactsFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import useRole from "../components/authentication/useRole";
import SideBar from "./SideBar";

function MainNav() {
  const { profile, isGetUser } = useRole() || {};
  const isAdmin = profile?.role === "admin";

  if (isGetUser) return null;

  return (
    <>
      {isAdmin && <SideBar />}
      <ul className="hidden md:flex items-center justify-center gap-5 lg:gap-8 text-xl font-bold text-gray-600">
        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-1 pb-6 h-full border-blue-500 dark:border-purple-300 ${
                isActive
                  ? "border-b text-blue-500 dark:text-purple-300"
                  : " hover:border-b hover:text-blue-500 dark:hover:text-purple-300 transition-all duration-200"
              }`
            }
            to="home"
          >
            <HiOutlineHome />
            <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-1 pb-6 h-full border-blue-500 dark:border-purple-300 ${
                isActive
                  ? "border-b text-blue-500 dark:text-purple-300"
                  : " hover:border-b hover:text-blue-500 dark:hover:text-purple-300 transition-all duration-200"
              }`
            }
            to="products"
          >
            <AiOutlineProduct />
            <span>Products</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-1 pb-6 h-full border-blue-500 dark:border-purple-300 ${
                isActive
                  ? "border-b text-blue-500 dark:text-purple-300"
                  : " hover:border-b hover:text-blue-500 dark:hover:text-purple-300 transition-all duration-200"
              }`
            }
            to="contact"
          >
            <RiContactsFill />
            <span>Contact</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default MainNav;
