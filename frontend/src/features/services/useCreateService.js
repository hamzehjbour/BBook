import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { createServiceApi } from "../../services/apiServices";

export function useCreateService() {
  const [user] = useLocalStorageState({}, "user");
  const queryClient = useQueryClient();

  const { mutate: createService, isPending } = useMutation({
    mutationFn: (data) => createServiceApi(user.token, data),

    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      toast.success("Service Created successfully");
    },

    onError: (err) => {
      console.log("DELEET Service Error", err);
      toast.error("There was a problem created Service");
    },
  });

  return { createService, isPending };
}
