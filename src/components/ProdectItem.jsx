import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import useAddToCart from "./cart/useAddToCart";
import useUser from "./authentication/useUser";
import ProductSizes from "../ui/ProductSizes";
import { useState } from "react";
import toast from "react-hot-toast";

function ProdectItem({ productsWithStock }) {
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [priceSelectedSize, setPriceSelectedSize] = useState(0);

  const { addToCart } = useAddToCart();
  const navigate = useNavigate();
  const {
    id: productId,
    name,
    price,
    image_url,
    product_variants: productVariants,
    totalStock,
  } = productsWithStock ?? {};

  // console.log(productVariants);
  const { user } = useUser();
  const { id: userId } = user ?? {};

  async function handleAddToCart() {
    if (!selectedVariantId) {
      return toast.error("Please choose size");
    }

    const payload = {
      userId,
      productId,
      variantId: selectedVariantId,
      quantity: 1,
    };

    // لو عايز تنتظر وتلقط الأخطاء بالكونسول
    addToCart(payload);
    setSelectedVariantId(null);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col justify-between h-full text-slate-700 dark:text-slate-300">
      <img
        className="w-full"
        src={image_url}
        alt="Sunset in the mountains"
        onClick={() => navigate(`/products/${productId}`)}
      />
      <div className=" flex flex-col justify-between h-full bg-blue-400 dark:bg-purple-300 bg-opacity-10 dark:bg-opacity-10">
        <div className="px-6 py-4 space-y-4 text-center">
          <div
            onClick={() => navigate(`/products/${productId}`)}
            className="text-xl font-bold hover:text-slate-950 dark:hover:text-purple-200 cursor-pointer"
          >
            {name}
          </div>
        </div>
        <ProductSizes
          productVariants={productVariants}
          selectedVariantId={selectedVariantId}
          setSelectedVariantId={setSelectedVariantId}
          setPriceSelectedSize={setPriceSelectedSize}
        />
        <div className="px-6 pb-2">
          <p className=" font-semibold flex justify-between mt-4">
            <span>In Stock: {totalStock} Piece</span>
            <span>
              $
              {priceSelectedSize == 0 && !priceSelectedSize
                ? price
                : priceSelectedSize}
            </span>
          </p>
          <div className="flex mt-2">
            <button
              className={`${Button.small}  ${Button.primary}`}
              onClick={() => handleAddToCart()}
            >
              🛒 Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdectItem;
