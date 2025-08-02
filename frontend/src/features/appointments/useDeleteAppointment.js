import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import toast from "react-hot-toast";
import { deleteAppointmentApi } from "../../services/apiAppointments";

export function useDeleteAppointment() {
  const [user] = useLocalStorageState({}, "user");
  const queryClient = useQueryClient();

  const { mutate: deleteAppointment, isPending } = useMutation({
    mutationFn: (id) => deleteAppointmentApi({ token: user.token, id }),

    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      toast.success("Appointment removed successfully");
    },

    onError: (err) => {
      console.log("DELEET Appointment Error", err);
      toast.error("There was a problem removing appointment");
    },
  });

  return { deleteAppointment, isPending };
}
