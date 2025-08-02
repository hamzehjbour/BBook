import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { deleteServiceApi } from "../../services/apiServices";

export function useDeleteService() {
  const [user] = useLocalStorageState({}, "user");
  const queryClient = useQueryClient();

  const { mutate: deleteService, isPending } = useMutation({
    mutationFn: (id) => deleteServiceApi({ token: user.token, id }),

    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
      toast.success("Service removed successfully");
    },

    onError: (err) => {
      console.log("DELEET Service Error", err);
      toast.error("There was a problem removing service");
    },
  });

  return { deleteService, isPending };
}
