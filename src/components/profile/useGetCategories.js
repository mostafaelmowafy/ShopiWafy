import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiProducts";

function useGetCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return { data, isLoading };
}

export default useGetCategories;
