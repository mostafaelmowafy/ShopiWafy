import { useState } from "react";

function ProductSizes({
  productVariants,
  selectedVariantId,
  setSelectedVariantId,
  setPriceSelectedSize,
}) {
  const [sizeName, setSizeName] = useState();

  function handleClick(s, id) {
    const priceSelectedSize = productVariants.filter((p) => p.id == id);
    setPriceSelectedSize(priceSelectedSize[0].price);
    setSizeName(s);
    setSelectedVariantId(id);
  }
  return (
    <ul className=" flex justify-center items-center dark:text-black">
      {productVariants?.map((v) => {
        const isActive = v.sizes.name === sizeName && selectedVariantId;
        return v.stock > 0 ? (
          <li
            key={v.id}
            onClick={() => handleClick(v.sizes.name, v.id)}
            className={
              "flex justify-center items-center h-7 w-7 text-sm mr-2 rounded-full cursor-pointer " +
              (isActive
                ? "bg-blue-400 dark:bg-purple-400 text-white"
                : "bg-blue-200 hover:bg-blue-300 dark:bg-purple-100 dark:hover:bg-purple-300")
            }
          >
            {v.sizes.name}
          </li>
        ) : (
          <li
            key={v.id}
            className=" flex justify-center items-center h-7 w-7 text-sm mr-2 bg-slate-400 rounded-full cursor-not-allowed line-through"
          >
            {v.sizes.name}
          </li>
        );
      })}
    </ul>
  );
}

export default ProductSizes;
