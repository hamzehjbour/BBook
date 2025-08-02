import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { updateServiceApi } from "../../services/apiServices";

export function useUpdateService() {
  const [user] = useLocalStorageState({}, "user");
  const queryClient = useQueryClient();

  const { mutate: updateService, isPending } = useMutation({
    mutationFn: ({ id, data }) => {
      console.log(data);
      updateServiceApi(user.token, id, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
      toast.success("Service updated successfully");
    },

    onError: (err) => {
      console.log("DELEET Service Error", err);
      toast.error("There was a problem updating service");
    },
  });

  return { updateService, isPending };
}
