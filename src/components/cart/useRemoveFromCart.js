import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart as removeFromCartApi } from "../../services/apiCart";
import toast from "react-hot-toast";

function useRemoveFromCart(userId) {
  const queryClient = useQueryClient();

  const { mutate: removeFromCart, isLoading } = useMutation({
    mutationFn: removeFromCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems", userId] });
      toast.success("Removed Successfully");
    },
    onError: () => toast.error("Error removing item"),
  });
  return { removeFromCart, isLoading };
}

export default useRemoveFromCart;
