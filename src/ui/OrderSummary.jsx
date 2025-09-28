import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import { applyDiscount } from "../services/apiOrder";
import Spinner from "./Spinner";
import useValidateCoupon from "../components/cart/useValidateCoupon";
import useUser from "../components/authentication/useUser";
import useCreateOrder from "../components/cart/useCreateOrder";
import toast from "react-hot-toast";

function OrderSummary({ totalPrice, cartItems }) {
  const { user } = useUser();
  const { id: userId } = user;

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState("");

  const { validate, isLoading } = useValidateCoupon();

  const { createOrder, isLoading: isLoading2 } = useCreateOrder();
  const navigate = useNavigate();

  const handleApplyCoupon = async (e) => {
    e.preventDefault();

    try {
      const result = await validate({ couponCode, userId });
      console.log(result);

      if (!result) {
        setCoupon(null); // لو الكود غلط، امسح الخصم
        setError("Invalid or expired coupon");
      } else {
        setCoupon(result); // لو الكود صح، خزّنه
        setError("");
      }
    } catch {
      setCoupon(null);
      setError("Something went wrong");
    }
  };

  if (isLoading && isLoading2) return null;
  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          Order summary
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Original price
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                {totalPrice}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Savings
              </dt>
              <dd className="text-base font-medium text-green-600">
                -${(totalPrice - applyDiscount(totalPrice, coupon)).toFixed(2)}
              </dd>
            </dl>
          </div>
          <dl className="flex items-center justify-between gap-4 border-t pt-2">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Total Price
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              ${applyDiscount(totalPrice, coupon).toFixed(2)}
            </dd>
          </dl>
        </div>

        <button
          onClick={async () => {
            if (cartItems?.length > 0) {
              try {
                const order = await createOrder({
                  userId,
                  items: cartItems,
                  coupon,
                });
                navigate(`/order-confirmation/${order.id}`);
              } catch (err) {
                console.error(err);
              }
            } else {
              toast.error("Add Item To Cart");
            }
          }}
          disabled={isLoading}
          className={Button.small + Button.primary}
        >
          {isLoading ? "Processing..." : "Proceed to Checkout"}
        </button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {" "}
            or{" "}
          </span>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
          >
            Continue Shopping &rarr;
          </Link>
        </div>
      </div>
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="voucher"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              {" "}
              Do you have a voucher or gift card?{" "}
            </label>
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              type="text"
              id="voucher"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              placeholder=""
              required
            />
          </div>
          <button
            onClick={(e) => handleApplyCoupon(e)}
            className={Button.small + Button.primary}
          >
            Apply Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderSummary;
