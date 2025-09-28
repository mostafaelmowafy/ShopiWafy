import Logo from "./Logo";
import MainNav from "./MainNav";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiGift } from "react-icons/fi";
import { RiCoupon2Line } from "react-icons/ri";
import toast from "react-hot-toast";
import useRole from "../components/authentication/useRole";

function Header() {
  const [pannerIsOpen, setPannerIsOpen] = useState(true);
  const { profile, isGetUser } = useRole() || {};
  const isAdmin = profile?.role === "admin";

  const coupon = "Mowafy20";

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
      toast.success("Coupon Number Copied");
    } catch (err) {
      console.error("Copy [Failed", err);
    }
  };

  return (
    <>
      <div className=" flex justify-between items-center p-6 pb-0 border-b-2 border-gray-500 ">
        <Logo />
        <MainNav />
        <div className="flex gap-2 text-xl">
          <Dropdown />
        </div>
      </div>
      {pannerIsOpen && !isAdmin && (
        <div
          id="banner"
          tabIndex="-1"
          className=" flex text-left sm:text-center w-full items-start justify-between gap-8 border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:items-center lg:py-4"
        >
          <div className="mx-auto text-base text-gray-500 dark:text-gray-400 space-y-1">
            <span className="font-medium text-gray-900 dark:text-white flex items-center sm:justify-center gap-1">
              <FiGift className="text-md" /> Limited-time offer!
            </span>
            Use this discount coupon before it’s gone!{" "}
            <Link
              to="./products"
              className="font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >
              to shop!
            </Link>
            <p className="flex items-center sm:justify-center gap-1">
              <RiCoupon2Line className="inline-block" />
              <span
                onClick={copyPhone}
                className="underline text-blue-300 dark:text-purple-300 hover:text-blue-400 hover:dark:text-purple-400 font-bold cursor-pointer"
              >
                {coupon}
              </span>
            </p>
          </div>
          <button
            onClick={() => setPannerIsOpen(false)}
            className="flex text-left rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IoClose className=" text-xl" />
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
