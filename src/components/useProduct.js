import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/apiProduct";
import { useParams } from "react-router-dom";

export function useProduct() {
  const { productId } = useParams();
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    retry: false,
  });
  return { product, isLoading, error };
}
