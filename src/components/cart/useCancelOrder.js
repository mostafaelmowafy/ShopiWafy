import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelOrder as cancelOrderApi } from "../../services/apiOrder";
import { useNavigate } from "react-router-dom";
import { clearCartItems } from "../../services/apiCart";

function useCancelOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: cancelOrder, isLoading } = useMutation({
    mutationFn: cancelOrderApi,
    onSuccess: async (order) => {
      try {
        await clearCartItems(order.user_id);
        toast.success("Cancelled Successfully, And card is empty");

        queryClient.setQueryData(["cartItems", order.user_id], []);

        // 🧹 امسح الكاش أو أعد تحميله
        queryClient.invalidateQueries({ queryKey: ["order", order.id] });
        queryClient.invalidateQueries({
          queryKey: ["orders", { userId: order.user_id }],
        });
        queryClient.invalidateQueries({
          queryKey: ["cartItems", order.user_id],
        });

        navigate("/home");
      } catch (error) {
        toast.error("Cancelled Successfully, But error emptying card");
      }
    },
    onError: () => toast.error("Error cancelling order, Please try again"),
  });
  return { cancelOrder, isLoading };
}

export default useCancelOrder;
