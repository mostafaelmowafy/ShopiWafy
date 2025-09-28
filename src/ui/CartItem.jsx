import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useUpdateCart from "../components/cart/useUpdateCart";
import useUser from "../components/authentication/useUser";
import useAddtoFavorites from "../components/Favorites/useAddtoFavorites";
import useRemoveFromCart from "../components/cart/useRemoveFromCart";

function CartItem({ product }) {
  const { id: idProduct, name, image_url } = product.products ?? {};

  const { user } = useUser();
  const { id: userId } = user ?? {};

  const { updateCart } = useUpdateCart(userId);
  const { removeFromCart } = useRemoveFromCart(userId);
  const { addToFavorites } = useAddtoFavorites();

  const {
    price: productSizePrice,
    sizes,
    stock: quantitySizeStock,
  } = product.product_variants ?? {};
  const { id: idItemCart, quantity } = product;
  const total = quantity * productSizePrice;

  function handleDecreasItem(idItemCart, quantity) {
    if (quantity == 1) {
      removeFromCart(idItemCart);
    } else
      updateCart({
        cartItemId: idItemCart,
        newValue: quantity - 1,
      });
  }

  function handleIncreasItem(idItemCart, quantity) {
    if (quantity == quantitySizeStock) {
      toast.error(
        `There are only ${quantitySizeStock} pieces of ${sizes.name} size.`
      );
    } else
      updateCart({
        cartItemId: idItemCart,
        newValue: quantity + 1,
      });
  }

  function handleAddToFav() {
    console.log("Trying to add to fav:", { userId, productId: idProduct });
    addToFavorites({ userId, productId: idProduct });
  }

  return (
    <div
      key={idItemCart}
      className=" rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="space-y-4 flex flex-col md:flex-row items-center justify-between md:gap-6 md:space-y-0">
        <div className=" rounded-l-lg md:h-40 md:w-[12vw] w-full h-[40vw] overflow-hidden">
          <Link to={`/products/${idProduct}`} className="shrink-0 md:order-1 ">
            <img
              className="h-full w-full hover:scale-105 object-contain md:object-cover hover:shadow-lg hover:shadow-stone-950 transition-all duration-300 ease-in-out"
              src={image_url}
              alt="product image"
            />
          </Link>
        </div>
        <div className=" w-full text-center md:text-left flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:p-6 p-4">
          <div className="flex gap-2 items-center justify-between md:order-3 md:justify-end">
            <div className="flex items-center ">
              <button
                onClick={() => handleDecreasItem(idItemCart, quantity)}
                type="button"
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <span className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => handleIncreasItem(idItemCart, quantity)}
                type="button"
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-bold text-gray-900 dark:text-white">
                {total.toFixed(2)} $
              </p>
            </div>
          </div>

          <div className="w-full min-w-0  space-y-4 md:order-2 md:max-w-md ">
            <Link
              to={`/products/${idProduct}`}
              className="text-base font-medium text-gray-900 hover:underline dark:text-white"
            >
              {name}
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleAddToFav({ userId, productId: idProduct })}
                type="button"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="me-1.5 h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Add to Favorites
              </button>

              <button
                onClick={() => removeFromCart(idItemCart)}
                type="button"
                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
              >
                <svg
                  className="me-1.5 h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
                Remove
              </button>
              <span className="flex justify-center items-center gap-2">
                <span className=" text-black font-semibold flex justify-center items-center h-7 w-7 text-sm rounded-full bg-blue-300 dark:bg-purple-300">
                  {sizes.name}
                </span>
                <span>&rarr; ${productSizePrice.toFixed(2)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
