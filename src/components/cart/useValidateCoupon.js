import { useMutation } from "@tanstack/react-query";
import { validateCoupon } from "../../services/apiOrder";
import toast from "react-hot-toast";

function useValidateCoupon() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ couponCode, userId }) => validateCoupon(couponCode, userId),
    onSuccess: (data) =>
      toast.success(
        `You get discount ${data?.discount_value} ${
          data?.discount_type === "percentage" ? "%" : "$"
        }`
      ),
    onError: () => toast.error("Failed, or invalid coupon"),
  });

  return { validate: mutateAsync, isLoading: isPending };
}
export default useValidateCoupon;
