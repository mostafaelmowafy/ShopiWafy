import { useQuery } from "@tanstack/react-query";
import { getDailySalesForMonth } from "../../services/apiOrder";

export function useDailySales(month, year) {
  const { data, isLoading } = useQuery({
    queryKey: ["dailySales", month, year],
    queryFn: () => getDailySalesForMonth(month, year),
  });
  return { data, isLoading };
}
