import { useEffect, useRef, useState } from "react";
import Logout from "../components/authentication/Logout";
import DarkmodeToggle from "./DarkmodeToggle";
import { NavLink } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import UserAvatar from "../components/authentication/UserAvatar";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineProduct } from "react-icons/ai";
import { RiContactsFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";

function Dropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`p-2 hover:scale-110 hover:text-blue-700 dark:hover:text-purple-300 rounded focus:outline-none duration-200 pb-6 ${
          open && "text-blue-700 dark:text-purple-300 scale-110"
        }`}
      >
        {/* أيقونة ثلاث نقاط */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-1 ">
            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex   ${
                  isActive
                    ? "bg-blue-100 dark:bg-purple-100 text-gray-800"
                    : "hover:bg-blue-100 dark:hover:bg-purple-100 hover:text-gray-800"
                }`
              }
              to="profile"
            >
              <div className="py-1 border-b border-gray-200">
                <span className="block px-4 py-2 text-sm text-gray-600">
                  Signed in as
                </span>
                <span className="block px-4 pb-2 w-full text-sm ">
                  <UserAvatar />
                </span>
              </div>
            </NavLink>
            <div className="md:hidden">
              <NavLink
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 text-sm  ${
                    isActive
                      ? "bg-blue-100 dark:bg-purple-100 text-gray-800"
                      : "hover:bg-blue-100 dark:hover:bg-purple-100 hover:text-gray-800"
                  }`
                }
                to="home"
              >
                <HiOutlineHome />
                <span>Home</span>
              </NavLink>

              <NavLink
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 text-sm  ${
                    isActive
                      ? "bg-blue-100 dark:bg-purple-100 text-gray-800"
                      : "hover:bg-blue-100 dark:hover:bg-purple-100 hover:text-gray-800"
                  }`
                }
                to="/products"
              >
                <AiOutlineProduct />
                <span>Products</span>
              </NavLink>

              <NavLink
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 text-sm  ${
                    isActive
                      ? "bg-blue-100 dark:bg-purple-100 text-gray-800"
                      : "hover:bg-blue-100 dark:hover:bg-purple-100 hover:text-gray-800"
                  }`
                }
                to="/contact"
              >
                <RiContactsFill />
                <span>Contact</span>
              </NavLink>
            </div>

            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 text-sm  ${
                  isActive
                    ? "bg-blue-100 dark:bg-purple-100 text-gray-800"
                    : "hover:bg-blue-100 dark:hover:bg-purple-100 hover:text-gray-800"
                }`
              }
              to="/cart"
            >
              <HiOutlineShoppingCart /> Cart
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 text-sm  ${
                  isActive
                    ? "bg-blue-100 dark:bg-purple-100 text-gray-800"
                    : "hover:bg-blue-100 dark:hover:bg-purple-100 hover:text-gray-800"
                }`
              }
              to="/favorites"
            >
              <MdFavorite /> Favorites
            </NavLink>
          </div>
          <div className="py-1 border-t border-gray-200">
            <DarkmodeToggle />

            <Logout />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
