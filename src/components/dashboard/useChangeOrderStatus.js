import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeOrderStatus as changeOrderStatusApi } from "../../services/apiOrder";

function useChangeOrderStatus() {
  const queryClient = useQueryClient();

  const { mutate: changeOrderStatus, isLoading } = useMutation({
    mutationFn: changeOrderStatusApi,
    onSuccess: async (order) => {
      toast.success("Status Changed Successfully");

      queryClient.invalidateQueries({
        queryKey: ["orders", "all"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders", { userId: order.user_id }],
      });
    },
    onError: () => toast.error("Error change status, Please try again"),
  });
  return { changeOrderStatus, isLoading };
}

export default useChangeOrderStatus;
