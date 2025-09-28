import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";
import { useSearchParams } from "react-router-dom";

export function useProducts() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: getProducts,
  });

  // console.log(data?.stock);
  return {
    productsWithStock: data,
    isLoading,
    error,
  };
}
