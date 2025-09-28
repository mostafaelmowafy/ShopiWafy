import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile as updateProfileApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { mutateAsync: updateProfile, isLoading } = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });
  return { updateProfile, isLoading };
}

export default useUpdateProfile;
