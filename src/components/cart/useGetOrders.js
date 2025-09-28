import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrder";

function useGetOrders(userId) {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrders(userId),
    enabled: Boolean(userId),
  });
  return { orders, isLoading };
}

export default useGetOrders;
