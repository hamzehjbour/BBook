import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorageState({}, "user");

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], {
        token: data.token,
        user: data.data.user,
      });
      navigate("/appointments", {
        replace: true,
      });

      setUser({
        token: data.token,
        user: data.data.user,
      });
    },

    onError: (err) => {
      console.log("LOGIN ERROR", err);
      toast.error("Please provide your email and password");
    },
  });

  return { login, isPending };
}
