import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOrder as completeOrderApi } from "../../services/apiOrder";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCompleteOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: completeOrder, isLoading } = useMutation({
    mutationFn: completeOrderApi,
    onSuccess: (order) => {
      toast.success("Order completed successfully");
      // 2) ألغِ الاستعلام عن قائمة الطلبات عشان تعيد التحميل مع الحالة الجديدة
      queryClient.invalidateQueries({ queryKey: ["orders", order.user_id] });

      queryClient.removeQueries({ queryKey: ["order", order.id] });

      // 2) امسح الكاش تبع بنود السلة
      queryClient.removeQueries({ queryKey: ["cartItems", order.user_id] });

      navigate("/home");
    },
    onError: () => {
      toast.error("Failed to complete order. Please try again.");
    },
  });
  return { completeOrder, isLoading };
}
