import useGetOrders from "../cart/useGetOrders";
import Spinner from "../../ui/Spinner";
import { MdDone } from "react-icons/md";
import { CiCircleMore, CiNoWaitingSign } from "react-icons/ci";
import { CgClose } from "react-icons/cg";
import { FaAngleDown, FaClock } from "react-icons/fa";
import { SiVexxhost } from "react-icons/si";
import { useState } from "react";
import useRole from "../authentication/useRole";
import { FcInTransit } from "react-icons/fc";
import useChangeOrderStatus from "./useChangeOrderStatus";
function Orders() {
  const { orders, isLoading: isLoading2 } = useGetOrders("all") ?? {};
  const [actionIsOpen, setActionIsOpen] = useState(false);
  const [selectOrderId, setSelectOrderId] = useState(null);
  const { profile, isGetUser } = useRole() || {};
  const isAdmin = profile?.role === "admin";
  const { changeOrderStatus, isLoading: isCancelled } = useChangeOrderStatus();

  const handleClickAction = (e, id) => {
    e.preventDefault();
    setSelectOrderId(id);
    setActionIsOpen(!actionIsOpen);
  };

  if (isLoading2 && isGetUser) return <Spinner />;
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
      <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Latest orders
      </h3>
      {orders?.map((o, i) => (
        <div className="flex flex-wrap justify-between gap-5 items-center gap-y-4 border-b border-gray-200 pb-4 dark:border-gray-700 md:pb-5">
          <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Order ID:
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
              <a href="#" className="hover:underline">
                {o.id}
              </a>
            </dd>
          </dl>

          <dl className=" w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Date:
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
              {new Date(o.updated_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </dd>
          </dl>

          <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Price:
            </dt>
            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
              ${o.total.toFixed(2)}
            </dd>
          </dl>
          <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Status:
            </dt>
            {o.status == "completed" ? (
              <dd className="mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                <MdDone className=" mr-2" />
                Completed
              </dd>
            ) : o.status == "cancelled" ? (
              <dd className="mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                <CgClose className=" mr-2" />
                Cancelled
              </dd>
            ) : o.status == "prepare" ? (
              <dd className="mt-1.5 inline-flex items-center rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-medium text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300">
                <FaClock className=" mr-2" />
                prepare
              </dd>
            ) : o.status === "transit" ? (
              <dd className="mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                <FcInTransit className=" mr-2" />
                transit
              </dd>
            ) : (
              <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                <CiNoWaitingSign className=" mr-2" />
                pending
              </dd>
            )}
          </dl>
          {isAdmin && (
            <div className=" relative w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
              <button
                onClick={(e) => handleClickAction(e, o.id)}
                className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
              >
                Actions
                <FaAngleDown className="ml-1" />
              </button>
              {actionIsOpen && o.id == selectOrderId && (
                <div className=" absolute top-12 z-10 w-40 rounded-lg bg-white shadow dark:bg-gray-700">
                  <ul
                    className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                    aria-labelledby="actionsMenuDropdown12"
                  >
                    {o.status !== "cancelled" && o.status !== "pending" && (
                      <>
                        <li>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              cancelOrder(o.id);
                            }}
                            disabled={isCancelled}
                            className=" mt-1.5 inline-flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-red-100  font-medium text-red-800 hover:dark:bg-red-900 dark:text-red-300 "
                          >
                            <SiVexxhost className="mr-2" />
                            <span>Cancelled</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              changeOrderStatus({
                                orderId: o.id,
                                status: "completed",
                              });
                            }}
                            disabled={isCancelled}
                            className=" mt-1.5 inline-flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-green-100  font-medium text-green-800 hover:dark:bg-green-900 dark:text-green-300 "
                          >
                            <MdDone className="mr-2" />
                            <span>Completed</span>
                          </button>
                        </li>
                      </>
                    )}
                    {o.status !== "transit" &&
                      o.status !== "cancelled" &&
                      o.status !== "pending" && (
                        <li>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              changeOrderStatus({
                                orderId: o.id,
                                status: "transit",
                              });
                            }}
                            disabled={isCancelled}
                            className=" mt-1.5 inline-flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-blue-100  font-medium text-blue-800 hover:dark:bg-blue-900 dark:text-blue-300 "
                          >
                            <FcInTransit className="mr-2" />
                            <span>transit</span>
                          </button>
                        </li>
                      )}
                    {o.status !== "cancelled" &&
                      o.status !== "pending" &&
                      o.status !== "prepare" && (
                        <li>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              changeOrderStatus({
                                orderId: o.id,
                                status: "prepare",
                              });
                            }}
                            disabled={isCancelled}
                            className=" mt-1.5 inline-flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-cyan-100  font-medium text-cyan-800 hover:dark:bg-cyan-900 dark:text-cyan-300 "
                          >
                            <FaClock className=" mr-2" />
                            <span>Prepare</span>
                          </button>
                        </li>
                      )}
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <CiCircleMore className="mr-2" />
                        Order details
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;
