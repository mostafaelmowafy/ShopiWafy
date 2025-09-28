import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";
import toast from "react-hot-toast";

function useGetUsers() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    onSuccess: () => toast.success("Users fetched successfully"),
    onError: (error) => toast.error(error.message),
  });
  return { users: data ?? [], isLoading };
}

export default useGetUsers;
