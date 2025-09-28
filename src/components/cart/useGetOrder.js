import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/apiOrder";

export function useOrder(orderId) {
  const { data, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
  });
  return { data, isLoading };
}
