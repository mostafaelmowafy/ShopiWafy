import useUser from "../authentication/useUser";
import useGetOrders from "../cart/useGetOrders";
import Spinner from "../../ui/Spinner";
import { MdDone } from "react-icons/md";
import { CiNoWaitingSign } from "react-icons/ci";
import { CgClose } from "react-icons/cg";
import { FaClock } from "react-icons/fa";
import { useState } from "react";
import useRole from "../authentication/useRole";
import useChangeOrderStatus from "../dashboard/useChangeOrderStatus";
import { FcInTransit } from "react-icons/fc";
import useCancelOrder from "../cart/useCancelOrder";

function ProfileOrderSummary() {
  const { user } = useUser();
  const userId = user?.id;
  const { orders, isLoading: isLoading2 } = useGetOrders(userId) ?? {};

  const { changeOrderStatus, isLoading: isChanged } = useChangeOrderStatus();
  const { cancelOrder, isLoading: isCancelled } = useCancelOrder();

  if (isLoading2) return <Spinner />;
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
          <div class=" relative w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
            <button
              className={` ${
                o.status == "completed" ||
                o.status == "cancelled" ||
                o.status == "transit"
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-100 hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white"
              } flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900  focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:focus:ring-gray-700 md:w-auto`}
              onClick={(e) => {
                e.preventDefault();
                o.status == "prepars"
                  ? changeOrderStatus({
                      orderId: o.id,
                      status: "cancelled",
                    })
                  : cancelOrder(o.id);
              }}
              disabled={
                o.status == "completed" ||
                o.status == "cancelled" ||
                o.status == "transit" ||
                isChanged
              }
            >
              Cancelled
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileOrderSummary;
