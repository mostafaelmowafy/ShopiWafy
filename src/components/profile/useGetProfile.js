import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/apiUsers";

function useGetProfile(userId) {
  const { data, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: Boolean(userId),
  });
  return { data, isLoading };
}

export default useGetProfile;
