import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { deleteUserApi } from "../../services/apiUsers";

export function useDeleteUser() {
  const [user] = useLocalStorageState({}, "user");
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: (id) => deleteUserApi({ token: user.token, id }),

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User removed successfully");
    },

    onError: (err) => {
      console.log("DELEET Service Error", err);
      toast.error("There was a problem removing user");
    },
  });

  return { deleteUser, isPending };
}
