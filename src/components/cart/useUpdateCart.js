import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart as updateCartApi } from "../../services/apiCart";
import toast from "react-hot-toast";

function useUpdateCart(userId) {
  const queryClient = useQueryClient();

  const { mutate: updateCart, isLoading } = useMutation({
    mutationFn: updateCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems", userId] });
      toast.success("Updated Successfully");
    },
    onError: () => toast.error("Error updating item"),
  });
  return { updateCart, isLoading };
}

export default useUpdateCart;
