import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { createAppointmentApi } from "../../services/apiAppointments";

export function useCreateAppointment() {
  const [user] = useLocalStorageState({}, "user");
  const queryClient = useQueryClient();

  const { mutate: createAppointment, isPending } = useMutation({
    mutationFn: (data) => {
      createAppointmentApi(user.token, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      toast.success("Appointment Created successfully");
    },

    onError: (err) => {
      console.log("DELEET Appointment Error", err);
      toast.error("There was a problem created appointment");
    },
  });

  return { createAppointment, isPending };
}
