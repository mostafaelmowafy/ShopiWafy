import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../services/apiCart";

function useGetCartItems(userId) {
  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cartItems", userId],
    queryFn: () => getCartItems(userId),
    enabled: Boolean(userId),
  });
  return { cartItems, isLoading, error };
}

export default useGetCartItems;
