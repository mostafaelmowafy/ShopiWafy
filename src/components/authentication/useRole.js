import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUsers";
import useUser from "./useUser";

function useRole() {
  const { isAuthenticated } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getUser,
    enabled: isAuthenticated, // ← مهم جدًا
  });

  return {
    profile: data ?? null,
    isGetUser: isLoading,
  };
}

export default useRole;
