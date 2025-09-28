import useUser from "../authentication/useUser";
import useGetCartItems from "./useGetCartItems";
import useRemoveFromCart from "./useRemoveFromCart";
import useUpdateCart from "./useUpdateCart";
import CartItem from "../../ui/CartItem";
import OrderSummary from "../../ui/OrderSummary";
import Spinner from "../../ui/Spinner";

export default function CartItems() {
  const { user } = useUser();
  const { id: userId } = user ?? {};

  const { cartItems, isLoading } = useGetCartItems(userId);

  const total =
    cartItems?.reduce(
      (sum, item) => sum + item.product_variants.price * item.quantity,
      0
    ) ?? 0;

  if (isLoading) return <Spinner />;
  return (
    <section className=" py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl text-center lg:text-left font-semibold text-blue-400 dark:text-purple-300 sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="space-y-6">
            {cartItems?.length === 0 ? (
              <p>Empty cart</p>
            ) : (
              cartItems?.map((item, index) => (
                <CartItem key={index} product={item} />
              ))
            )}
          </div>
          <OrderSummary totalPrice={total} cartItems={cartItems} />
        </div>
      </div>
    </section>
  );
}
