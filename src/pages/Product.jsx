import { useState } from "react";
import { useProduct } from "../components/useProduct";
import { useMoveBack } from "../hooks/useMoveBack";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import ProductSizes from "../ui/ProductSizes";
import Spinner from "../ui/Spinner";
import useUser from "../components/authentication/useUser";
import toast from "react-hot-toast";
import useAddToCart from "../components/cart/useAddToCart";

function Product() {
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [priceSelectedSize, setPriceSelectedSize] = useState(0);

  const { addToCart } = useAddToCart();

  const { product, isLoading } = useProduct();
  const {
    id: productId,
    name,
    price,
    image_url,
    description,
    product_variants: productVariants,
  } = product ?? {};

  const moveback = useMoveBack();

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
    console.log(payload);

    // لو عايز تنتظر وتلقط الأخطاء بالكونسول
    addToCart(payload);
    setSelectedVariantId(null);
  }

  if (isLoading) return <Spinner />;

  return (
    <main className="flex flex-col md:gap-y-[10vh] items-center w-screen px-10">
      <Heading size="big">Product details</Heading>
      <div
        key={userId}
        className="mb-[12vh] flex flex-col md:flex-row justify-between items-center border dark:border-slate-800 rounded-lg w-full max-w-lg md:max-w-5xl md:h-[50vh] rounded-l-3xl rounded-r-3xl"
      >
        <div className=" h-[30vh] w-full md:w-1/3 md:h-full">
          <img
            src={image_url}
            alt={name}
            className="w-full h-full md:rounded-l-3xl "
          />
        </div>

        <div className=" flex flex-col justify-between items-center gap-2 h-full p-2 text-center bg-slate-200 md:w-2/3 font-semibold dark:bg-slate-700 rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl leading-8 ">
          <Heading size="small">{name}</Heading>
          <p>{description}</p>
          <ProductSizes
            productVariants={productVariants}
            selectedVariantId={selectedVariantId}
            setSelectedVariantId={setSelectedVariantId}
            setPriceSelectedSize={setPriceSelectedSize}
          />
          <p className=" font-bold text-lg my-2">
            $
            {priceSelectedSize == 0 && !priceSelectedSize
              ? price
              : priceSelectedSize}
          </p>

          <div className=" w-full md:w-1/3">
            <div className="flex">
              <button
                className={Button.small + Button.primary}
                onClick={handleAddToCart}
              >
                🛒 Add to cart
              </button>
            </div>
            <button className={Button.small} onClick={moveback}>
              &larr; Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;
