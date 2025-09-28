import { addToCart as addToCartApi } from "../../services/apiCart";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useAddToCart() {
  const queryClient = useQueryClient();

  const { mutate: addToCart, isLoading } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: (_, variables) => {
      toast.success("Added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cartItems", variables.userId],
      });
    },
    onError: () => toast.error("Wrong! Please try again"),
  });

  return { addToCart, isLoading };
}
export default useAddToCart;
