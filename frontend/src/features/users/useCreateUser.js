import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { createUserApi } from "../../services/apiUsers";

export function useCreateUser() {
  const [user] = useLocalStorageState({}, "user");
  const queryClient = useQueryClient();

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: (data) => createUserApi(user.token, data),

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User Created successfully");
    },

    onError: (err) => {
      console.log("DELEET Service Error", err);
      toast.error("There was a problem creating User");
    },
  });

  return { createUser, isPending };
}
