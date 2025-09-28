import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../services/apiProducts";
import { useSearchParams } from "react-router-dom";

export function useGetProductsByCat() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { isLoading, error } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => getProductsByCategory(categoryId),
  });

  // console.log(data?.stock);
  return {
    isLoading,
    error,
  };
}
