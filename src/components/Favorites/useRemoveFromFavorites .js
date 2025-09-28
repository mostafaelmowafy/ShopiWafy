import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromFavorites as removeFromFavoritesApi } from "../../services/apiFavorites";
import toast from "react-hot-toast";

function useRemoveFromFavorites(userId) {
  const queryClient = useQueryClient();

  const { mutate: removeFromFavorites, isLoading } = useMutation({
    mutationFn: removeFromFavoritesApi,
    onSuccess: () => {
      toast.success("Removed Successfully");
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
    onError: () => toast.error("Wrong! Please try again"),
  });
  return { removeFromFavorites, isLoading };
}

export default useRemoveFromFavorites;
