import { useMutation } from "@tanstack/react-query";
import { addToFavorites as addToFavoritesApi } from "../../services/apiFavorites";
import toast from "react-hot-toast";

function useAddtoFavorites() {
  const { mutate: addToFavorites, isLoading } = useMutation({
    mutationFn: addToFavoritesApi,
    onSuccess: (data) => {
      if (!data) return;
      toast.success("Added Successfully");
    },
    onError: () => toast.error("Wrong! Please try again"),
  });
  return { addToFavorites, isLoading };
}

export default useAddtoFavorites;
