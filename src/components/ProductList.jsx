import { useSearchParams } from "react-router-dom";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";
import ProdectItem from "./ProdectItem";
import { useProducts } from "./useProducts";
import { IoIosArrowForward } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";
import { Fragment } from "react";

export default function ProductList() {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("categoryName") ?? "all";
  const { productsWithStock, isLoading } = useProducts();
  const categoryArray = categoryName.split(",");

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading
        size="big"
        className="text-5xl font-bold text-center my-20 text-slate-700 dark:text-slate-300"
      >
        Shop <FaAngleRight className="inline text-3xl" />{" "}
        {categoryName ? (
          <span className="flex justify-center items-center">
            {categoryArray.map((item, index) => (
              <Fragment key={item}>
                <span className="text-xl text-gray-500 h-full inline">
                  {item}
                </span>
                {index < categoryArray.length - 1 && (
                  <FaAngleRight className="mx-1 text-xl text-gray-500 inline-block" />
                )}
              </Fragment>
            ))}
          </span>
        ) : (
          <span className="text-4xl text-gray-600 ">All</span>
        )}
      </Heading>
      <div className=" grid justify-center xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-x-10 gap-y-20 py-4 px-24 shadow-md hover:shadow-lg">
        {productsWithStock?.map((p, i) => (
          <ProdectItem productsWithStock={p} key={i} />
        ))}
      </div>
    </>
  );
}
