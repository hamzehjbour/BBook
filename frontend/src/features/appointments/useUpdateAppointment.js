import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { updateAppointmentApi } from "../../services/apiAppointments";

export function useUpdateAppointment() {
  const [user] = useLocalStorageState({}, "user");
  const queryClient = useQueryClient();

  const { mutate: updateAppointment, isPending } = useMutation({
    mutationFn: (data) => updateAppointmentApi(user.token, data),

    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      toast.success("Appointment updated successfully");
    },

    onError: (err) => {
      console.log("DELEET Appointment Error", err);
      toast.error("There was a problem updating appointment");
    },
  });

  return { updateAppointment, isPending };
}
