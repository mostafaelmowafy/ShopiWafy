import { useState } from "react";
import useUser from "../authentication/useUser";
import AccountInformationModal from "../profile/AccountInformationModal";
import useGetProfile from "../profile/useGetProfile";
import Spinner from "../../ui/Spinner";
import useGetCartItems from "./useGetCartItems";
import OrderItem from "./OrderItem";
import { GiCash } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "./useGetOrder";
import Button from "../../ui/Button";
import { useCompleteOrder } from "./useCompleteOrder";
import useCancelOrder from "./useCancelOrder";

function OrderItems() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { data: order, isLoading } = useOrder(orderId);

  const { cancelOrder, isLoading: isCancelled } = useCancelOrder();
  const { completeOrder, isLoading: completing } = useCompleteOrder();

  const { user } = useUser();
  const userId = user?.id;
  const { data, isLoading: isLoading2 } = useGetProfile(userId);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { email } = user.user_metadata;
  const { full_name, address, phone_number } = data ?? {};

  const { cartItems, isLoading: isLoading3 } = useGetCartItems(userId);

  const total =
    cartItems?.reduce(
      (sum, item) => sum + item.product_variants.price * item.quantity,
      0
    ) ?? 0;

  if (isLoading && isLoading2 && isLoading3 && isCancelled) return <Spinner />;
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Order summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Billing & Delivery information
              </h4>

              <dl>
                <dt className="mb-1 font-semibold text-gray-900 dark:text-white">
                  Payment Methods:
                </dt>
                <dd className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <GiCash className=" text-4xl" />
                  </div>
                  <div>
                    <div className="text-sm">
                      <p className="mb-0.5 font-medium text-gray-900 dark:text-white">
                        Cash
                      </p>
                    </div>
                  </div>
                </dd>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  <span className=" font-bold">Phone Number:</span>{" "}
                  {phone_number} <br />
                  <span className=" font-bold">Address:</span> {address}
                </dd>
              </dl>

              <button className="text-base font-medium text-primary-700 hover:underline dark:text-primary-500">
                Edit
              </button>
            </div>

            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {cartItems?.length === 0 ? (
                      <p>Empty cart</p>
                    ) : (
                      cartItems?.map((item, index) => (
                        <OrderItem key={index} product={item} />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${total?.toFixed(2)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        $
                        {order?.total == 0
                          ? "-" + (total - order?.total).toFixed(2)
                          : "0.00"}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">
                      {order?.total.toFixed(2)}
                    </dd>
                  </dl>
                </div>

                <div className=" sm:flex gap-4 sm:items-center space-y-3 sm:space-y-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      cancelOrder(orderId);
                    }}
                    disabled={isCancelled}
                    className={`${Button.small}  ${Button.delete}`}
                  >
                    {isCancelled ? "Canceling..." : "Cancel Order"}
                  </button>
                  <button
                    onClick={() => navigate(`/products`)}
                    className={Button.small + Button.secoundary}
                  >
                    Return to Shopping
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    completeOrder(orderId);
                  }}
                  disabled={completing}
                  className={Button.small + Button.primary}
                >
                  {completing ? "Finishing..." : "Finish Order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      {modalIsOpen && (
        <AccountInformationModal
          setModalIsOpen={setModalIsOpen}
          full_name={full_name}
          email={email}
          phone_number={phone_number}
          address={address}
        />
      )}
    </>
  );
}

export default OrderItems;
