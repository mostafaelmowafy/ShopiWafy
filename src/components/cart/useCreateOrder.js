import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../services/apiOrder";
import toast from "react-hot-toast";

function useCreateOrder() {
  const queryClient = useQueryClient();

  const { mutateAsync: createOrder, isLoading } = useMutation({
    mutationFn: createOrderApi,
    onError: () => toast.error("Failed, please try again"),
    onSuccess: (order) => {
      toast.success("Order created successfully");

      queryClient.invalidateQueries({ queryKey: ["orders", order.user_id] });
    },
  });

  return { createOrder, isLoading };
}

export default useCreateOrder;
