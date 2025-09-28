import { HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import useRemoveFromFavorites from "./useRemoveFromFavorites ";

function FavoritesItem({ fav }) {
  console.log(fav);
  const { id: favoriteId, products } = fav;
  const { id: idProduct, name, price, image_url } = products ?? {};
  const userId = fav.user_id;
  const { removeFromFavorites } = useRemoveFromFavorites(userId);

  return (
    <div className="mt-6 sm:mt-8 md:gap-6 md:flex md:items-start md:justify-center xl:gap-8">
      <div className="space-y-6 w-full">
        <div
          key={idProduct}
          className=" rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="  space-y-4 flex flex-col md:flex-row items-center justify-between md:gap-6 md:space-y-0">
            <div className=" bg-white dark:bg-stone-900 rounded-l-lg md:h-40 md:w-[12vw] w-full h-[40vw] overflow-hidden">
              <Link
                to={`/products/${idProduct}`}
                className="shrink-0 md:order-1 "
              >
                <img
                  className="h-full w-full hover:scale-105 object-contain md:object-fill hover:shadow-lg hover:shadow-stone-950 transition-all duration-300 ease-in-out rounded-l-lg"
                  src={image_url}
                  alt="imac image"
                />
              </Link>
            </div>
            <div className=" w-full text-center md:text-left flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:p-6 p-4">
              <div className="flex gap-2 items-center justify-between md:order-3 md:justify-end">
                <div className="text-center space-y-2 md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {price?.toFixed(2)} $
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={() => removeFromFavorites(favoriteId)}
                      type="button"
                      className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      <HiTrash />
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full min-w-0  space-y-4 md:order-2 md:max-w-md ">
                <Link
                  to={`/products/${idProduct}`}
                  className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                >
                  {name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritesItem;
