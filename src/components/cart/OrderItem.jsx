import { Link } from "react-router-dom";
import useUser from "../authentication/useUser";
import useAddtoFavorites from "../Favorites/useAddtoFavorites";
import useRemoveFromCart from "./useRemoveFromCart";
import useUpdateCart from "./useUpdateCart";

function OrderItem({ product }) {
  const { id: idProduct, name, price, image_url } = product.products ?? {};

  const { user } = useUser();
  const { id: userId } = user ?? {};

  const {
    price: productSizePrice,
    sizes,
    stock: quantitySizeStock,
  } = product.product_variants ?? {};
  const { id: idItemCart, quantity } = product;
  const total = quantity * productSizePrice;

  //   return (
  //     <div
  //       key={idItemCart}
  //       className=" rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
  //     >
  //       <div className="space-y-4 flex flex-col md:flex-row items-center justify-between md:gap-6 md:space-y-0">
  //         <div className=" rounded-l-lg md:h-40 md:w-[12vw] w-full h-[40vw] overflow-hidden">
  //           <Link to={`/products/${idProduct}`} className="shrink-0 md:order-1 ">
  //             <img
  //               className="h-full w-full hover:scale-105 object-contain md:object-cover hover:shadow-lg hover:shadow-stone-950 transition-all duration-300 ease-in-out"
  //               src={image_url}
  //               alt="product image"
  //             />
  //           </Link>
  //         </div>
  //         <div className=" w-full text-center md:text-left flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:p-6 p-4">
  //           <div className="flex gap-2 items-center justify-between md:order-3 md:justify-end">
  //             <div className="text-end md:order-4 md:w-32">
  //               <p className="text-base font-bold text-gray-900 dark:text-white">
  //                 {total.toFixed(2)} $
  //               </p>
  //             </div>
  //           </div>

  //           <div className="w-full min-w-0  space-y-4 md:order-2 md:max-w-md ">
  //             <Link
  //               to={`/products/${idProduct}`}
  //               className="text-base font-medium text-gray-900 hover:underline dark:text-white"
  //             >
  //               {name}
  //             </Link>

  //             <div className="flex flex-wrap items-center justify-center gap-4">
  //               <span className="text-sm font-medium text-gray-900 dark:text-white">
  //                 quantity: {quantity}
  //               </span>
  //               <span className="flex justify-center items-center gap-2">
  //                 <span className=" text-black font-semibold flex justify-center items-center h-7 w-7 text-sm rounded-full bg-blue-300 dark:bg-purple-300">
  //                   {sizes.name}
  //                 </span>
  //                 <span>&rarr; ${productSizePrice.toFixed(2)}</span>
  //               </span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  return (
    <tr>
      <td className="whitespace-nowrap py-4 md:w-[384px]">
        <div className="flex items-center gap-4">
          <Link
            to={`/products/${idProduct}`}
            className="flex items-center aspect-square w-10 h-10 shrink-0"
          >
            <img
              className="h-auto w-full max-h-full transition-all duration-300 ease-in-out"
              src={image_url}
              alt="product image"
            />
          </Link>
          <Link to={`/products/${idProduct}`} className="hover:underline">
            {name}
          </Link>
          <p className="p-4 text-base font-normal text-gray-900 dark:text-white">
            x{quantity} {sizes.name}
          </p>
        </div>
      </td>

      <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
        ${total.toFixed(2)}
      </td>
    </tr>
  );
}

export default OrderItem;
