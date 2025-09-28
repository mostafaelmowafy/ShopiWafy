import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiUsers";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account successfully created! Please verify user's email");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    },
  });

  return {
    signup,
    isLoading,
  };
}
