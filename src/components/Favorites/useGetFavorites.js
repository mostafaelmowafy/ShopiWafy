import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../services/apiFavorites";

function useGetFavorites(userId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getFavorites(userId),
    enabled: Boolean(userId),
    select: (data) => data ?? [],
  });
  return { data, isLoading, error };
}

export default useGetFavorites;
