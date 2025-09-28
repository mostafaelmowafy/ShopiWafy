import {
  FaLongArrowAltUp,
  FaOpencart,
  FaRegHeart,
  FaRegStar,
} from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import {
  IoIosArrowForward,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { MdOutlineBorderColor } from "react-icons/md";
import { Link } from "react-router-dom";
import useUser from "../authentication/useUser";
import useGetOrders from "../cart/useGetOrders";
import useGetCartItems from "../cart/useGetCartItems";
import { useProducts } from "../useProducts";
import useGetFavorites from "../Favorites/useGetFavorites";
import Spinner from "../../ui/Spinner";

function ProfileStatistics() {
  const { user } = useUser();
  const userId = user?.id;
  const { orders, isLoading: isLoading2 } = useGetOrders(userId);
  const { cartItems: cart, isLoading: isLoading3 } = useGetCartItems(userId);
  const { data: favorites, isLoading: isLoading4 } = useGetFavorites(userId);

  const orderDone = orders?.filter((o) => o.status == "completed");

  const { productsWithStock, isLoading } = useProducts();

  if (isLoading && isLoading2 && isLoading3 && isLoading4) return <Spinner />;
  return (
    <>
      <nav className="mb-4 flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to="/home"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
            >
              <HiOutlineHome />
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <IoIosArrowForward />
              <span
                to="/home"
                className="ms-1 text-sm font-medium text-gray-700 dark:text-gray-400 md:ms-2"
              >
                My Profile
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">
        General overview
      </h2>
      <div className="grid grid-cols-2 gap-6 border-b border-t border-gray-200 py-4 dark:border-gray-700 md:py-8 lg:grid-cols-4 xl:gap-16">
        <div>
          <MdOutlineBorderColor />
          <h3 className="mb-2 text-gray-500 dark:text-gray-400">Orders made</h3>
          <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
            {orderDone?.length}
            <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
              <FaLongArrowAltUp />
              {((orderDone?.length / orders?.length) * 100).toFixed(2)}%
            </span>
          </span>
        </div>
        <div>
          <FaOpencart />
          <h3 className="mb-2 text-gray-500 dark:text-gray-400">
            Cart products added
          </h3>
          <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
            {cart?.length}
            <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
              <FaLongArrowAltUp />
              {((cart?.length / productsWithStock?.length) * 100).toFixed(2)}%
            </span>
          </span>
        </div>
        <div>
          <FaRegHeart />
          <h3 className="mb-2 text-gray-500 dark:text-gray-400">
            Favorite products added
          </h3>
          <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
            {favorites?.length}
            <span className="ms-2 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
              <FaLongArrowAltUp />
              {((favorites?.length / productsWithStock?.length) * 100).toFixed(
                2
              )}
              %
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default ProfileStatistics;
